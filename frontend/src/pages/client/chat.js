import React, { useEffect, useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import { to_Decrypt, to_Encrypt } from "./aes";
import { Avatar } from "@mui/material";
import Picker from '@emoji-mart/react'
import toast from 'react-hot-toast';
import { useWeb3React } from "@web3-react/core";

import './chat.css';

import {socket} from '../global';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Contact from './contact';

import { getAllChattingHistories, getAcceptStatus, setAcceptStatusAllow } from '../../store/apis';

const contacts = [
    {address: '0x81c200 ... $000C', unread: 1, lastmsg: '@mui/icons-material/Sent'},
    {address: '0x313444 ... $5cC0', unread: 0, lastmsg: '@mui/icons-material/Sen'},
]

const BuyerChat = (props) => {
    const { active } = useWeb3React();
    const { collectionID, username, isOpenedChat, openchat, closechat, role } = props;
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [messages, setMessages] = useState([]);
    const [curAddr, setCurAddr] = useState("");
    const [histories, setHistories] = useState([]);
    const [acceptFlag, setAcceptFlag] = useState(false);

    const addEmoji = (emoji) => {
        setShowEmoji(false);
        setText(`${text}${emoji.native}`);
        document.getElementById("buyerchat_input").focus();
    }

    const showEmojiPicker = () => {
        setShowEmoji(!showEmoji);
        document.getElementById("buyerchat_input").focus();
    }

    const opencall = () => {
        window.open(`/#/jitsi/${collectionID}/${username}`);
    }

    const openchatdialog = () => {
        openchat();
        toast.dismiss();
        scrollToBottom();
    }

    const openaddress = (address) => {
        console.log(address);
        setCurAddr(address);
    }

    useEffect(() => {
        if (username !== undefined && username !== '')
            socket.emit("joinRoom", { username, collectionID, role });
        sessionStorage.setItem("username", username);
    }, [username])

    useEffect(() => {
        if (active === false)
            closechat();
        sessionStorage.setItem("active", active);
    }, [active])

    useEffect(() => {
        sessionStorage.setItem("open_chat", isOpenedChat);

        const allChats = getAllChattingHistories(username, '0x81c200...$000C', collectionID);
        console.log(allChats);
        // setHistories([...allChats]);

        const acceptStatus = getAcceptStatus(username, '0x81c200...$000C', collectionID);
        acceptStatus.then((v) => {
            if(role == "seller"){
                if (v == true) {
                    console.log("seller true");
                    setAcceptFlag(true);
                } else {
                    console.log("seller false");
                    setAcceptFlag(false);
                }
            }else{
                console.log("buyer");
                setAcceptFlag(true);
            }
        });       
    }, [isOpenedChat])
    
    const handler = (data) => {
        //decypt
        const ans = to_Decrypt(data.text, data.username);
        const open_chat = sessionStorage.getItem("open_chat");
        const username = sessionStorage.getItem("username");
        console.log(data);

        if (data.role === role && data.username !== username) return;
        if (username === undefined || username === '') return;

        if (data.username !== username && open_chat !== "true") {
            toast.custom((t) => (
                <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                <div className="flex-1 w-0 p-4" onClick={openchatdialog}>
                    <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <Avatar className="mx-3">
                            {"J"}
                        </Avatar>
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                        {data.username}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                        {ans}
                        </p>
                    </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                    Close
                    </button>
                </div>
                </div>
            ))
        }
        let temp = messages;
        temp.push({
            userId: data.userId,
            username: data.username,
            text: ans,
        });

        setMessages([...temp]);
    }

    useEffect(() => {
        socket.on("message", handler);
        return () => socket.off('message', handler);
    }, [socket]);
    
    const setAcceptAllow = () => {
        setAcceptStatusAllow(username, '0x81c200...$000C', collectionID);
        setAcceptFlag(true);
    }

    const sendData = () => {
        if (text !== "") {
          //encrypt here
          const ans = to_Encrypt(text);
          socket.emit("chat", {ans, toAddress: '0x81c200...$000C', collectionID: collectionID});
          setText("");
        }
      };
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
  
    useEffect(scrollToBottom, [messages]);

    return (
    <Box className="rounded-xl message bg-gray-100">
        <Box className="rounded-xl text-white user-bg relative">
            <Box className="text-2xl font-medium pl-7 pr-7 py-3 flex">
                Jordan Powell
                <div style={{ marginLeft: 'auto', marginTop: -3 }}>
                    <PhoneOutlinedIcon style={{fontSize: 30}} onClick={opencall} />
                </div>
            </Box>
            <Box className="flex pl-4 pr-16  py-3">
                <Avatar className="mx-3">
                    {"J"}
                </Avatar>
                <Box className="text-white px-2 pt-2">Hello {username}, how can we help you</Box>
            </Box>
        </Box>
        <Box className="flex">
            <Box className="message-inbox">
                {contacts.map((i, key) => {
                    return (
                        <Contact data={i} key={key} selected={i.address === curAddr} openaddress={openaddress} />
                    );
                })}
            </Box>
            <Box>
                {showEmoji ? (
                    <Picker
                        sx={{
                            position: 'absolute',
                            maxWidth: 300,
                            borderRadius: 20
                        }}
                        previewPosition={'none'}
                        autoFocus={true}
                        onEmojiSelect={addEmoji}
                        theme="light" />
                ) : null}
                <Box sx={{ display: "block", width: 320, height: 320, overflowY: "auto" }} className="px-5">
                    {(() => {
                        if (role == "seller") {
                            if(!acceptFlag){
                                return (
                                    <button className="accept_btn" onClick={setAcceptAllow}>Accept</button>
                                )
                            }
                        }
                    })()}
                    {messages.map((i, key) => {
                        if (i.username === username) {
                        return (
                            <Box className="sms-y my-3 grid" key={key}>
                                <p className="rounded-xl m-you px-4 py-2 text-white">{i.text}</p>
                            </Box>
                        );
                        } else {
                        return (
                            <Box className="sms-o my-3 grid" key={key}>
                                <p className="text-gray-600 text-xs">{i.username}</p>
                                <p className="rounded-xl m-other px-4 py-2">{i.text}</p>
                            </Box>
                        );
                        }
                    })}
                    <div ref={messagesEndRef} />
                </Box>
                <Box className="flex justify-between px-4 rounded-xl bg-white py-3" >
                    {(() => {
                        if (role === "seller") {
                            if(!acceptFlag){
                                return (
                                    <div className="chat_input">
                                        <Box>
                                            <input
                                            id="buyerchat_input"
                                            style={{outline: 'none', width: 220}}
                                            placeholder={"Please accept first!"}
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                sendData();
                                            }
                                            }}
                                            disabled = "disabled"
                                        ></input>
                                        </Box>                        
                                        <Box className="block md:flex" onClick={showEmojiPicker} disabled = "disabled" >
                                            <Box>
                                                <SentimentSatisfiedOutlinedIcon style={{ fill: '#999999' }} />
                                            </Box>
                                        </Box>
                                        <Box className="block md:flex" onClick={sendData} disabled = "disabled" >
                                            <Box>
                                                <img src="/static/images/send-2.png" style={{cursor: 'pointer'}} />
                                            </Box>
                                        </Box>
                                    </div>                                    
                                )
                            }else{
                                return (
                                    <div className="chat_input">
                                        <Box>
                                            <input
                                            id="buyerchat_input"
                                            style={{outline: 'none', width: 220}}
                                            placeholder={"Text here!"}
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                sendData();
                                            }
                                            }}
                                        ></input>
                                        </Box>                        
                                        <Box className="block md:flex" onClick={showEmojiPicker} >
                                            <Box>
                                                <SentimentSatisfiedOutlinedIcon style={{ fill: '#999999' }} />
                                            </Box>
                                        </Box>
                                        <Box className="block md:flex" onClick={sendData} >
                                            <Box>
                                                <img src="/static/images/send-2.png" style={{cursor: 'pointer'}} />
                                            </Box>
                                        </Box>
                                    </div>
                                )
                            }
                        }else{
                            return (
                                <div className="chat_input">
                                    <Box>
                                        <input
                                        id="buyerchat_input"
                                        style={{outline: 'none', width: 220}}
                                        placeholder={"Text here!"}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            sendData();
                                        }
                                        }}
                                    ></input>
                                    </Box>                        
                                    <Box className="block md:flex" onClick={showEmojiPicker} >
                                        <Box>
                                            <SentimentSatisfiedOutlinedIcon style={{ fill: '#999999' }} />
                                        </Box>
                                    </Box>
                                    <Box className="block md:flex" onClick={sendData} >
                                        <Box>
                                            <img src="/static/images/send-2.png" style={{cursor: 'pointer'}} />
                                        </Box>
                                    </Box>
                                </div>
                            )
                        }
                    })()}
                </Box>
            </Box>
        </Box>
        <Box style={{ position: "absolute", bottom: "-60px", right: "0px" }} onClick={closechat}><img src="/static/images/arrow-circle-down.png" /></Box>
    </Box>);
};

export default BuyerChat;
