import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from '@mui/material/CardMedia';
import { TypographySize20 } from "../Typography/TypographySize";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';

function TradeCard({ image, name, id }) {
    return (
        <Link
            component={RouterLink}
            underline="none"
            color="inherit"
            to={`/preview/${id}`}
        // to={`/buy/${id}`}
        >
            <div>
                <Card className="my-3 px-16 pt-5 pb-5 md:px-10 lg:mx-5 lg:px-5"
                    style={{
                        borderRadius: "24px"
                    }}>
                    <CardMedia
                        component="img"
                        // height="140"
                        image={image}
                        style={{ objectFit: "cover" }}
                    />
                    <div className="flex justify-center">
                        <TypographySize20>
                            {name}
                        </TypographySize20>
                    </div>
                    <div className="flex justify-center">
                        <div className="sell_btn tex-btn pulse">Sell</div>
                    </div>
                </Card>
            </div>
        </Link>
    );
}

export default TradeCard;