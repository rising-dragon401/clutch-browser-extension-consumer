import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { WalletIcon, MenuIcon, CopyIcon } from "../Svg";
import KeyStore from "../../lib/keystore";
import { storeToClipBoard } from "@src/lib/utils";
import useWalletContext from "../../context/hooks/useWalletContext";
const AccountList = styled("div")(({ theme }) => ({
  width: "154px",
  height: "32px",
  backgroundColor: theme.palette.background_colors.purple_25,
  paddingRight: "12px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: 0,
}));

const keyStore = KeyStore.getInstance();

function Header(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { walletAddress } = useWalletContext();

  async function showEmail() {
    let _email = await keyStore.getEmail();
    setEmail(_email);
    // let _walletAddr = await keyStore.getAddress();
    // setWalletAddr(_walletAddr);
  }
  useEffect(() => {
    showEmail();
  }, []);
  return (
    <Box
      key={props.page}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.text_colors.primary_550,
        padding: "8px 16px",
        borderBottom: `1px solid ${theme.palette.key_colors.primary_350}`,
      }}
    >
      <Box>
        <WalletIcon color={theme.palette.key_colors.primary_550} />
      </Box>
      <Box>
        <AccountList>
          <Box></Box>
          <Box>{email}</Box>
          <Box>
            <CopyIcon
              color={theme.palette.key_colors_interactions.primary_hover_550}
              display="block"
              size="15px"
              width="15px"
              height="15px"
              style={{ cursor: "pointer" }}
              onClick={(e) => storeToClipBoard(walletAddress)}
            />
          </Box>
        </AccountList>
      </Box>
      <Box onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}>
        <MenuIcon color={theme.palette.key_colors.primary_550} />
      </Box>
    </Box>
  );
}

export default Header;
