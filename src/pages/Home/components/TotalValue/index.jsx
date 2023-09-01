import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { DivFlex } from "../../../../components";
import useWalletContext from "../../../../context/hooks/useWalletContext";

function TotalValue() {
  const theme = useTheme();
  const { ethBalance, ethPrice, usdcBalance } =
    useWalletContext();
  return (
    <Box
      sx={{
        backgroundImage: `${theme.palette.purple_gradient.primary}`,
        borderRadius: "12px",
        height: "79px",
        padding: "2px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <DivFlex
        justifyContent="space-between"
        alignItems="center"
        style={{
          width: "100%",
          height: "75px",
          border: "2px solid transparent",
          borderRadius: "12px",
          background: "white",
          padding: "0 18px",
        }}
      >
        <Box>
          <Typography variant="h2"> $ {(parseFloat(ethBalance) * parseFloat(ethPrice) + parseFloat(usdcBalance)).toFixed(4)} </Typography>
        </Box>
        <Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.success.light }}
            >
              +$0.0
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.success.light }}
            >
              5.08%
            </Typography>
          </Box>
        </Box>
      </DivFlex>
    </Box>
  );
}

export default TotalValue;
