import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { Menu, MenuItem, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { assetsList } from "../../config";

export default function GasSelect({gasToken, onChange}) {
  const anchorRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState();
  const [open, setOpen] = React.useState(false);  
  const handleClick = (e) => {
    setOpen(true);
  };

  const handleClose = (contractAddr) => {
    onChange(contractAddr);
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  return (
    <div ref={anchorRef}>
      <Button aria-haspopup="true" onClick={handleClick}>
        {assetsList.filter((item) => item.contractAddress === gasToken)[0].symbol}
      </Button>
      <Menu        
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {assetsList.map((el, index) => (<MenuItem key={index} onClick={()=>handleClose(el.contractAddress)}>{el.symbol}</MenuItem>))}
      </Menu>
    </div>
  );
}
