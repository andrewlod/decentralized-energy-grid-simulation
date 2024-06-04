import { CONNECTION } from '@/util/consts';
import { PublicKey, Transaction } from '@solana/web3.js';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next'

const {
  ICON_URL,
  ICON_LABEL
} = process.env;

type GET = {
  label: string;
  icon: string;
};

type POST = {
  transaction: string;
  message: string;
};

const get = async (_req: NextApiRequest, res: NextApiResponse<GET>) => {
  res.status(StatusCodes.OK).json({
    label: ICON_LABEL,
    icon: ICON_URL
  });
};

const post = async (req: NextApiRequest, res: NextApiResponse<POST>) => {
  const { account } = req.body;
  const { instruction } = req.query;

  const sender = new PublicKey(account);

  const transaction = new Transaction();
  const latestBlockhash = await CONNECTION.getLatestBlockhash();
  transaction.feePayer = sender;
  transaction.recentBlockhash = latestBlockhash.blockhash;

  // TODO: Charge user and activate energy device for a given amount of time
  

  res.status(StatusCodes.NOT_IMPLEMENTED);
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