import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TypographySize20 } from "../Typography/TypographySize";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';

function TradeCard({image, name, id}) {
    return (
        <Card className="my-3 px-3 pt-5 pb-5 lg:mx-5 lg:px-5 raise"
            style={{
                borderRadius: "24px"
            }}>
            <CardMedia
                component="img"
                // height="140"
                image={image}
                style={{objectFit : "cover"}}
            />
            <div className="flex justify-center">
                <TypographySize20>
                    {name}
                </TypographySize20>
            </div>
            <div className="flex justify-center">
                <Link
                    component={RouterLink}
                    underline="none"
                    color="inherit"
                    className="sell_btn tex-btn pulse"
                    // href="/preview/${}"
                    to={`/preview/${id}`}
                    // to={`/buy/${id}`}
                // onClick={() => {onClickSell(collection.image)}}
                >
                    Sell
                </Link>
            </div>
        </Card>
    );
}

export default TradeCard;