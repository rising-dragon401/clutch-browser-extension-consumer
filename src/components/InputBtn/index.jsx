import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";
import InputField from "@src/components/Input";
import Button from "@src/components/Button";
export default function InputBtn({
  placeholder,
  value,
  onChange,
  label,
  onClick,
}) {
  return (
    <Box sx={{ width: "100%" }} position={"relative"}>
      <InputField
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <Button
        width="20%"
        height="30px"
        label={label}
        style={{ position: "absolute", right: "4px", top: "4px" }}
        borderRadius="8px"
        onClick={(e) => onClick(e)}
      />
    </Box>
  );
}
