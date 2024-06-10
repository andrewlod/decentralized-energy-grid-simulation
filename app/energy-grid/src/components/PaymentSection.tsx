import { FC, useState } from "react";
import { SolanaPayQR } from "./SolanaPayQR";
import { Button, Grid, TextField, useTheme } from "@mui/material";

export const PaymentSection: FC = ({ }) => {
  const [isQRCodeActive, setIsQRCodeActive] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const onSubmit = () => {
    if (hours <= 0 && minutes <= 0) {
      alert("Either hours or minutes must be greater than zero!");
      return;
    }

    setIsQRCodeActive(true);
  };

  return (
    isQRCodeActive? (
      <Grid container direction="column" spacing={6} sx={{ height: "100%" }} alignItems={"center"}>
        <Grid item xs={10}>
          <SolanaPayQR activeTimeMinutes={hours * 60 + minutes} />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={() => setIsQRCodeActive(false)}>Add more time</Button>
        </Grid>
      </Grid>
    ) : (
      <Grid container sx={{ height: "100%" }} alignItems={"center"} justifyItems={"center"}>
        <Grid container spacing={2} direction={"column"} alignItems={"center"} justifyItems={"center"}>
          <Grid item xs={1}>
            <h3 style={{ textAlign: "center", color: "white" }}>
              Specify the time the device will be active for:
            </h3>
          </Grid>
          <Grid item xs={1}>
            <TextField 
              id="hour-input"
              type="number"
              label="Hours"
              value={hours}
              variant="filled"
              focused
              onChange={event => setHours(parseInt(event.target.value))}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="minute-input"
              type="number"
              label="Minutes"
              value={minutes}
              variant="filled"
              focused
              onChange={event => setMinutes(parseInt(event.target.value))}
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" onClick={() => onSubmit()}>Generate QR Code</Button>
          </Grid>
        </Grid>
      </Grid>
    )
  )
};