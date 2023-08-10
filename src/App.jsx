import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AppContainer from "./AppContainer";
import { WalletContextProvider } from "./context/WalletContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WalletContextProvider>
        <AppContainer />
      </WalletContextProvider>
    </ThemeProvider>
  );
}

export default App;
