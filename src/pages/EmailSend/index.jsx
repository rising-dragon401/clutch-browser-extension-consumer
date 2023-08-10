import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Button from "../../components/Button";
import { ReceiveIcon, SendIcon } from "../../components/Svg";

import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { createWallet } from "../../api/accounts";
import KeyStore from "./../../lib/keystore";

const Container = styled.div`
  padding: 16px;
`;

const keyStore = KeyStore.getInstance();

function EmailSendPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const createWalletOnClicked = async () => {
    let jwt = await createWallet(email);
    console.log(jwt);
    if (jwt != null) {
      keyStore.setJWT(jwt);
      navigate("/");
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
          <Button
            size="fullWidth"
            variant="primary"
            height="44px"
            label="Send Email"
            onClick={() => createWalletOnClicked()}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default EmailSendPage;
