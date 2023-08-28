import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { Menu, MenuItem, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";

export default function GasSelect() {
  const anchorRef = React.useRef()
  const [anchorEl, setAnchorEl] = React.useState()
  const [open, setOpen] = React.useState(false);
  const handleClick = (e) => {    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => { 
    setTimeout(() => setAnchorEl(anchorRef?.current), 1) 
},  [anchorRef])

  return (
    <div ref={anchorRef}>
      <Button
        aria-haspopup="true"
        onClick={handleClick}
      >
        MATIC
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}        
      >
        <MenuItem onClick={handleClose}>MATIC</MenuItem>
        <MenuItem onClick={handleClose}>USDC</MenuItem>
      </Menu>
    </div>
  );
}
