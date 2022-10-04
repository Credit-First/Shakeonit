import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from '@mui/material/CardMedia';
import { TypographySize20 } from "../Typography/TypographySize";
import { useNavigate } from 'react-router-dom';

function TradeCard(item) {
    const navigate = useNavigate();

    const handleLink = () => {
        localStorage.setItem('shakeonit_preview', JSON.stringify(item))
        navigate(`/preview/${item.tokenId}`)
    }

    return (
        <div
            onClick={handleLink}
        >
            <div>
                <Card className="my-3 mx-2 px-3 pt-3 md:px-5 md:pt-5 pb-5 md:mx-10 lg:mx-5"
                    style={{
                        borderRadius: "24px"
                    }}>
                    <CardMedia
                        component="img"
                        image={item.image}
                        style={{ objectFit: "cover" }}
                    />
                    <div className="flex justify-center">
                        <TypographySize20>
                            {item.name}
                        </TypographySize20>
                    </div>
                    <div className="flex justify-center">
                        <div className="cursor-pointer sell_btn tex-btn pulse">Sell</div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default TradeCard;