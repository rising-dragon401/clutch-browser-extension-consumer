import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AppContainer from "./AppContainer";
import WelcomePage from "./pages/Welcome";
import KeyStore from "./lib/keystore";

const keyStore = KeyStore.getInstance();

function App() {
  let address = keyStore.getAddress();
  return (
    <ThemeProvider theme={theme}>
      {address != "" ? <AppContainer /> : <WelcomePage />}
    </ThemeProvider>
  );
}

export default App;
