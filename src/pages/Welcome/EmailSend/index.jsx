import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import useWalletContext from "../../../context/hooks/useWalletContext";
import KeyStore from "../../../lib/keystore";
import InputBtn from "@src/components/InputBtn";
const Container = styled.div`
  padding: 16px;
`;

const keyStore = KeyStore.getInstance();

function EmailSendPage() {
  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [isSentVerify, setIsSentVerify] = useState(false);
  const { createWalletByEmail, verifyEmail, isRequesting } = useWalletContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const sendVerificationCode = async () => {
    let ret = await verifyEmail(email);
    setIsSentVerify(true);
  };

  const checkVerifyCodeAndCreate = async () => {
    let ret = await createWalletByEmail(email, verifyCode);

    if (ret.status == "Success") {
      keyStore.setJWT(ret.payload.Success.jwt);
      keyStore.setEmail(email);
      keyStore.setAddress(ret.payload.Success.contract_wallet_addr);
      navigate("/welcome/create_pass");
    } else {
      setError(ret.payload.Error.error_message);
    }
  };

  return (
    <Box>
      <Container>
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
          <Input
            placeholder={"Enter email address"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {isSentVerify == true ? (
            <InputBtn
              placeholder="Input code"
              label="Resend"
              value={verifyCode}
              onChange={(e) => {
                setVerifyCode(e.target.value);
              }}
              onClick={() => sendVerificationCode()}
            />
          ) : (
            <Button
              size="fullWidth"
              variant="primary"
              height="44px"
              label="Send verification code"
              isLoading={isRequesting}
              justifyContent="center"
              onClick={() => sendVerificationCode()}
            />
          )}
        </Box>
        {isSentVerify == true && (
          <Button
            size="fullWidth"
            variant="primary"
            height="44px"
            label="Conintue"
            isLoading={isRequesting}
            style={{ marginTop: "16px" }}
            onClick={() => checkVerifyCodeAndCreate()}
          />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    </Box>
  );
}

export default EmailSendPage;
