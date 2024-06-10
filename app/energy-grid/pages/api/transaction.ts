import { CONNECTION, ENERGY_DEVICE_PDA, MERCHANT, PROGRAM } from '@server/util/consts';
import { minutesToHoursAndMinutes } from '@server/util/util';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { BN } from 'bn.js';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next'

const {
  ICON_URL,
  ICON_LABEL,
  HOURLY_PRICE,
} = process.env;

type PostBody = {
  account: string;
}
type PostQuery = {
  activeTimeMinutes: number;
}

type GET = {
  label: string;
  icon: string;
};

type POST = {
  transaction: string;
  message: string;
};

const hourlyPrice = parseFloat(HOURLY_PRICE);

const get = async (_req: NextApiRequest, res: NextApiResponse<GET>) => {
  res.status(StatusCodes.OK).json({
    label: ICON_LABEL,
    icon: ICON_URL
  });
};

const post = async (req: NextApiRequest, res: NextApiResponse<POST>) => {
  try {
  const { account } = req.body as PostBody;
  const activeTimeMinutes = req.query.activeTimeMinutes as string;

  if (typeof account !== 'string') {
    res.status(StatusCodes.BAD_REQUEST).json({
      transaction: "",
      message: "Invalid account"
    });
    return;
  }

  const numActiveTimeMinutes = parseInt(activeTimeMinutes);
  if (typeof activeTimeMinutes !== "string" || [NaN, 0].includes(numActiveTimeMinutes)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      transaction: "",
      message: "Invalid active time"
    })
  }

  const sender = new PublicKey(account);

  // Charge user and activate energy device for a given amount of time
  const transferIx = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: MERCHANT.publicKey,
    lamports: Math.round(hourlyPrice * (numActiveTimeMinutes / 60) * LAMPORTS_PER_SOL)
  });

  const addActiveTimeIx = await PROGRAM.methods.addActiveTime(new BN(numActiveTimeMinutes * 60))
    .accounts({
      energyDevice: ENERGY_DEVICE_PDA,
      authority: MERCHANT.publicKey
    })
    .instruction();

  // Create transaction and add instructions
  const transaction = new Transaction();
  transaction.add(transferIx);
  transaction.add(addActiveTimeIx);

  const latestBlockhash = await CONNECTION.getLatestBlockhash();
  transaction.feePayer = sender;
  transaction.recentBlockhash = latestBlockhash.blockhash;

  transaction.sign(MERCHANT);

  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false
  });

  const base64Transaction = serializedTransaction.toString('base64');

  res.status(StatusCodes.OK).send({
    transaction: base64Transaction,
    message: `Use Energy Device for ${minutesToHoursAndMinutes(numActiveTimeMinutes)}`
  });
} catch (err) {
  console.log(err);
  throw err;
}
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return get(req, res);
  } else if (req.method === 'POST') {
    return post(req, res);
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed' })
  }
}