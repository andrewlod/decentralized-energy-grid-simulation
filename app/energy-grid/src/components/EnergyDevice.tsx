"use client";

import * as anchor from "@coral-xyz/anchor";
import { context as AnchorContext } from "@client/contexts/AnchorContext";
import { getMinimumDate } from "@client/util/consts";
import { FC, useContext, useEffect, useState } from "react";
import { PowerSettingsNew } from "@mui/icons-material";

type EnergyDevice = {
  activeUntil: anchor.BN;
};

const iconStyle = {
  width: "100%",
  height: "100%",
};

export const EnergyDevice: FC = ({ }) => {

  const [activeUntil, setActiveUntil] = useState<Date>(getMinimumDate());
  const [isActive, setIsActive] = useState(false);
  const anchorContext = useContext(AnchorContext);

  useEffect(() => {
    function updateState(accountInfo: anchor.web3.AccountInfo<Buffer>) {
      const decoded = anchorContext.program.coder.accounts.decode("energyDevice", accountInfo.data) as EnergyDevice;
      setActiveUntil(new Date(decoded.activeUntil.toNumber()*1000));
    }

    async function listenToAccount() {
      if (  process.env.NEXT_PUBLIC_MERCHANT_ADDRESS === undefined ||
            process.env.NEXT_PUBLIC_ENERGY_DEVICE_NAME === undefined) {
        return;
      }
  
      const [energyDevicePDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          (new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_MERCHANT_ADDRESS)).toBuffer(),
          Buffer.from("_"),
          Buffer.from(process.env.NEXT_PUBLIC_ENERGY_DEVICE_NAME)
        ],
        anchorContext.program.programId
      );
  
      const energyDeviceAccountInfo = await anchorContext.connection.getAccountInfo(energyDevicePDA);
      if (energyDeviceAccountInfo !== null) {
        updateState(energyDeviceAccountInfo);
      }

      anchorContext.connection.onAccountChange(energyDevicePDA, accountInfo => {
        updateState(accountInfo);
      });
      
    }

    listenToAccount();
  }, [anchorContext.program.programId, anchorContext.connection, anchorContext.program.coder.accounts]);

  useEffect(() => {
    const checkStatus = () => {
      setIsActive(activeUntil >= new Date());
    };

    const intervalId = setInterval(checkStatus, 1000);

    return () => clearInterval(intervalId);
  }, [activeUntil]);

  return (
    <div>
      {
        isActive ? (
          <div>
            <h1 style={{ textAlign: "center" }}>The device is active until {activeUntil.toLocaleString()}</h1>
            <PowerSettingsNew color="success" style={iconStyle} />
          </div>
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>The device is not active</h1>
            <PowerSettingsNew color="error" style={iconStyle} />
          </div>
        )
      }
    </div>
  );
};