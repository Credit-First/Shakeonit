import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TypographySize48 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 48px;
line-height: 56px;
text-align: center;
text-transform: capitalize;

color: #38435E;

@media only screen and (max-width : 1023px) {
    font-size: 24px;
    line-height: 28px;
}
`;

export const TypographySize40 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 40px;
line-height: 47px;
/* identical to box height */

text-align: center;

color: #032144;

@media only screen and (max-width : 1023px) {
    font-size: 24px;
    line-height: 28px;
}
`;

export const TypographySize20 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
line-height: 120%;
text-align: justify;

@media only screen and (max-width : 1023px) {
    font-size: 16px;
}
@media only screen and (min-width : 1024px) {
    font-size: 20px;
}

color: #38435E;
`;

export const TypographySize16 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 140%;
/* or 22px */

text-align: justify;
text-transform: capitalize;

color: rgba(11, 18, 45, 0.6);
`;

export const TypographySize14 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 140%;
/* or 20px */

text-align: justify;
text-transform: capitalize;

color: rgba(11, 18, 45, 0.8);
`;
export const TypographySize141 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 140%;
/* or 20px */

text-align: justify;
text-transform: capitalize;

color: white;
`;

export const TypographySize18 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 100%;
/* identical to box height, or 18px */


color: #38435E;
`;

export const TypographySize32 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 32px;
line-height: 120%;

text-align: justify;

color: #38435E;

@media only screen and (max-width : 767px) {
    font-size: 24px;
}
@media only screen and (min-width : 768px) {
    font-size: 32px;
}
`;

export const TypographySize42 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 500;
line-height: 100%;
/* identical to box height, or 42px */

color: #15375D;

@media only screen and (max-width : 767px) {
    font-size: 30px;
}
@media only screen and (min-width : 768px) {
    font-size: 42px;
}
`;

export const TypographySize12 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 100%;
/* identical to box height, or 12px */


color: #FFFFFF;
`;

export const TypographySize121 = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height, or 114% */

display: flex;
align-items: center;

color: rgba(56, 67, 94, 0.8);

opacity: 0.4;
`;