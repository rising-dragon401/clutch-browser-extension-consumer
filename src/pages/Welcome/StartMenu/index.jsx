import React from "react";
import Button from "../../../components/Button";
import { ReceiveIcon, SendIcon } from "../../../components/Svg";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function StartMenu() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <Button
          size="fullWidth"
          variant="primary"
          height="44px"
          label="Create Wallet"
          icon={<ReceiveIcon width="19px" height="18px" />}
          onClick={() => navigate("/welcome/create_wallet")}
        />
        <Button
          size="fullWidth"
          variant="primary"
          height="44px"
          label="Recover Wallet"
          icon={<SendIcon width="19px" height="18px" />}
          onClick={() => console.log("Button clicked!")}
        />
      </Box>
    </>
  );
}
