import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { ReceiveIcon, SendIcon } from "../../../components/Svg";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import KeyStore from "../../../lib/keystore";
import Input from "../../../components/Input";

const keyStore = KeyStore.getInstance();

export default function CreatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const createPassword = () => {
    if (password == confirmPassword) {
      keyStore.setPassword(password);
      navigate("/");
    } else {
      setError("Confirm password does not match password");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
          gap: "16px",
          marginTop: "32px",
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: "8px" }}>
          Create password
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "-8px" }}>
          New password
        </Typography>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        <Typography variant="body1" sx={{ marginBottom: "-8px" }}>
          Confirm password
        </Typography>
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          size="fullWidth"
          variant="primary"
          height="44px"
          label="Create"
          justifyContent="center"
          onClick={() => createPassword()}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Box>
    </>
  );
}
