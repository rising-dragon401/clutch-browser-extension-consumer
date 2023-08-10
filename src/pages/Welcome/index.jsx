import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import Button from "../../components/Button";
import { ReceiveIcon, SendIcon } from "../../components/Svg";

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 16px;
`;

function WelcomePage() {
  const navigate = useNavigate();

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
          <Button
            size="fullWidth"
            variant="primary"
            height="44px"
            label="Create Wallet"
            icon={<ReceiveIcon width="19px" height="18px" />}
            onClick={() => navigate("/create_wallet")}
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
      </Container>
    </Box>
  );
}

export default WelcomePage;
