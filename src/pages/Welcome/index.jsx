import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import WelcomeLogo from "../../components/WelcomeLogo";
import StartMenu from "./StartMenu";
import EmailSendPage from "../EmailSend";

const Container = styled.div`
  padding: 16px;
`;

function WelcomePage() {
  return (
    <>
      <Box>
        <Container>
          <WelcomeLogo />
          <Routes>
            <Route path="/" element={<StartMenu />} />
            <Route path="create_wallet" element={<EmailSendPage />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default WelcomePage;
