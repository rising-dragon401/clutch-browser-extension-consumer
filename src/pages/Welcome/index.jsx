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
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = () => {
    navigate("/security");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: "flex",
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
            onClick={() => console.log("Button clicked!")}
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
