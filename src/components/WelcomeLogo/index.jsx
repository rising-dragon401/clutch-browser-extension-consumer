import { Box } from "@mui/material";
import ClutchImg from "../../assets/img/logo.png";
import React from "react";

export default function WelcomeLogo() {
    return <Box>
        <img src={ClutchImg} style={{width:'100px'}}/>
    </Box>
}