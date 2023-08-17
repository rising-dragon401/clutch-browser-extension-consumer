import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { DivFlex } from "../../components";
import { EthIcon, ChevronDownIcon } from "../../components/Svg";
import MaticIcon from "@src/assets/tokens/matic.png";

const InputField = styled.div`
  flex-basis: 50%;
  input {
    height: 48px;
    font-family: "Lato";
    color: ${({ theme }) => theme.palette.text_colors.neutral_800};
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    font-weight: ${({ theme }) => theme.typography.body1.fontWeight};
    line-height: ${({ theme }) => theme.typography.h3.lineHeight};
    ::placeholder {
      color: ${({ theme }) => theme.palette.text_colors.neutral_500};
      font-family: "Lato";
      font-size: ${({ theme }) => theme.typography.body1.fontSize};
      font-weight: ${({ theme }) => theme.typography.body1.fontWeight};
      line-height: ${({ theme }) => theme.typography.h3.lineHeight};
    }
  }
`;

const SelectToken = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 50%;
  cursor: pointer;

  p {
    color: ${({ theme }) => theme.palette.text_colors.neutral_800};
  }

  box-sizing: border-box;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.palette.text_colors.neutral_275};
  border-radius: 10px;
`;

function SendPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [error, setError] = useState("");
  const onClickSend = () => {
    if (receiver && amount) {
      navigate("/send/transaction", { state: { receiver, amount } });
    } else {
      setError("Please input the receiver address and amount");
    }
  };
  return (
    <>
      <Box
        sx={{
          padding: "16px",
          height: "372px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: "4px" }}>
            Recepient’s address
          </Typography>
          <InputField>
            <Input
              placeholder="Search public address, or ENS"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </InputField>
          <DivFlex justifyContent="space-between" gap="16px" marginTop="32px">
            <InputField>
              <Input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputField>
            <SelectToken onClick={() => navigate("/check_assets")}>
              <img src={MaticIcon} style={{ width: "30px" }} />
              <Typography variant="body1"> Matic </Typography>
              <ChevronDownIcon />
            </SelectToken>
            {/* <SelectContainer>
              <Select>
                {options.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
              <ArrowIcon />
            </SelectContainer> */}
          </DivFlex>
        </Box>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          size="fullWidth"
          variant="secondary"
          label="Next"
          style={{
            marginBottom: "9px",
            // fontSize: "14px",
            // color: theme.palette.text_colors.primary_475,
          }}
          onClick={() => onClickSend()}
        />
      </Box>
    </>
  );
}

export default SendPage;
