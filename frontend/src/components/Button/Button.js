import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GradientButton = styled(Button)`
color: white !important;
background: linear-gradient(265.83deg, #98F7FF -23.13%, #10B0C7 21.83%, #14365C 93.42%);
padding: 10px 50px 10px 50px !important;
border-radius: 10px !important;
/* border-color: transparent; */
justify-self: center;
`;

export const OutlinedButton = styled(Button)`
color: #10B0C7 !important;
padding: 10px 50px 10px 50px !important;
border-radius: 10px !important;
border-color: transparent;
justify-self: center;
border: 1px solid #71BED8 !important;
border-radius: 12px !important;
`;