import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from '@mui/material/CardMedia';
import clsx from "clsx";
const useStyles = makeStyles({
    root: {
        transition: "transform 0.15s ease-in-out",
        "& .MuiCardMedia-media": {
            transition: "all"
        },
        "&:hover": {
            "& .MuiCardMedia-media": {
                transform: "scale(1.3)"
            }
        },
    },
    
    cardHovered: {
      transform: "scale3d(1.05, 1.05, 1)"
    }
  });
function CollectionCard({ address, image, name, balance = 0, onSelect }) {
    const classes = useStyles();
    return (
            <div onClick={() => onSelect(address)}>
                <Card className={clsx(classes.root, "cursor-pointer my-3 mx-2 px-3 pt-3 md:px-5 md:pt-5 md:mx-10 lg:mx-5")}
                    style={{
                        borderRadius: "24px"
                    }}
                    >
                    <div
                        style={{ 
                            height: 300,
                            width: '100%',
                            overflow: 'hidden',
                            borderRadius: "24px"
                        }}
                    >
                    <CardMedia
                        component="img"
                        image={image}
                        style={{ 
                            height: 300,
                            width: '100%',
                            objectFit: "cover",
                            transition: 'all .5s ease 0s'
                        }}
                    />
                    </div>
                    <div className="flex justify-around items-center py-5">
                        <div className="text-2xl font-bold truncate">
                            {name}
                        </div>
                    </div>
                </Card>
            </div>
    );
}

export default CollectionCard;