import React, { useState } from "react";
import { TypographySize18 } from "../../../components/Typography/TypographySize";
import { Container, Box, Avatar } from "@mui/material";

function RecentActivity() {

    const [showFlag, setShowFlag] = useState(false);
    return (
        <>
            <TypographySize18 className="flex justify-center">Recent Activity</TypographySize18>
            <div className="recentactivity border rounded-xl mt-6 mb-12 pt-6 pb-6 color-blue bg-white">
                <Box className="my-6">
                    <Box className="block lg:flex">
                        <Box className="w-full">
                            <p className="listinput text-gray-400">Somebody wants to buy your NFT</p>
                        </Box>
                        <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center">
                            <a href="#" className="outlined-btn1 text-list-accept pulse">Accept Sale</a>
                        </Box>
                    </Box>
                    <Box className="my-6" >
                        <Box className="block lg:flex">
                            <Box className="w-full">
                                <p className="listinput text-gray-400">Somebody wants to buy your NFT</p>
                            </Box>
                            <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center">
                                <a href="#" onClick={() => setShowFlag(!showFlag)} className="outlined-btn1 text-list-accept pulse">Accept Sale</a>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="my-6">
                        <Box className="block lg:flex">
                            <Box className="w-full">
                                <p className="listinput text-gray-400">Somebody wants to buy your NFT</p>
                            </Box>
                            <Box className="w-full lg:w-96 mt-3 ml-0 lg:ml-6 lg:mt-0 flex justify-center">
                                <a href="#" className="outlined-btn1 text-list-accept pulse">Accept Sale</a>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
            {!showFlag ? '' :
                <Box className="absolute rounded-xl message bg-gray-100">
                    <Box className="rounded-xl text-white user-bg relative">
                        <Box className="text-2xl font-medium px-12 py-3">
                            Jordan Powell
                        </Box>
                        <Box className="flex pl-4 pr-16  py-3">
                            <Avatar className="mx-3">
                                {"J"}
                            </Avatar>
                            <Box className="text-white">Hello sofia, how can we help you</Box>
                        </Box>
                    </Box>
                    <Box style={{ display: "block" }} className="px-5">
                        <Box className="sms-y my-3">
                            <p className="rounded-xl m-you px-2 text-white">Hello</p>
                        </Box>
                        <Box className="sms-o my-3" style={{ width: "50%" }}>
                            <p className="rounded-xl m-other px-2">Hello Sofia, how can we help you?</p>
                        </Box>
                        <Box className="sms-y my-3">
                            <p className="rounded-xl m-you px-2 text-white">Lorem Ipsum</p>
                        </Box>
                        <Box className="sms-o my-3">
                            <p className="rounded-xl m-other px-2">Lorem Ipsum</p>
                        </Box>
                    </Box>
                    <Box className="flex justify-between px-4 rounded-xl bg-white py-3">
                        <Box>
                            <input placeholder="type here..."></input>
                        </Box>
                        <Box className="flex">
                            <Box>
                                <img src="/static/images/send-2.png" />
                            </Box>
                            <Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box className="absolute" style={{ left: "-60px" }} onClick={() => setShowFlag(false)}><img src="/static/images/arrow-circle-down.png" /></Box>
                </Box>
            }
        </>
    );
}

export default RecentActivity;