import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import { DivFlex } from "..";

const InfoPanel = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 16px;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.palette.text_colors.neutral_275};
  border-radius: 10px;
`;

function TokenInfoItem({ tokenName, unit, icon, amount, tokenPrice, diff }) {
  return (
    <Box>
      <InfoPanel>
        <DivFlex justifyContent="space-between" alignItems="center">
          <DivFlex alignItems="center">
            <Box>
              <img src={icon} style={{ width: "30px" }} />
            </Box>
            <Box>
              <Box>
                <Typography variant="subtitle1">{tokenName}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">
                  {amount} {unit}
                </Typography>
              </Box>
            </Box>
          </DivFlex>
          <Box>
            <Box>
              <Typography variant="subtitle1">$ {tokenPrice}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">+${diff}</Typography>
            </Box>
          </Box>
        </DivFlex>
      </InfoPanel>
    </Box>
  );
}

export default TokenInfoItem;
