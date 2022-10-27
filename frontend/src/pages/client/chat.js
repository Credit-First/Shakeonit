import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
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
    const { active, account } = useWeb3React();
    const { contractAddress, tokenId, username, isOpenedChat, openchat, closechat, role } = props;
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
        if(role == "seller" && acceptFlag || role == "buyer"){
            setShowEmoji(!showEmoji);
            document.getElementById("buyerchat_input").focus();
        }
    }

    const opencall = () => {
        window.open(`/#/jitsi/${contractAddress}/${tokenId}`);
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
        if (account !== undefined && account !== '')
            socket.emit("joinRoom", { contractAddress, tokenId });
        sessionStorage.setItem("account", account);
    }, [account])

    useEffect(() => {
        if (active === false)
            closechat();
        sessionStorage.setItem("active", active);
    }, [active])

    useEffect(() => {
        sessionStorage.setItem("open_chat", isOpenedChat);

        const allChats = getAllChattingHistories(account, contractAddress, tokenId);
        console.log(allChats);
        // setHistories([...allChats]);

        const acceptStatus = getAcceptStatus(contractAddress, tokenId);
        acceptStatus.then((v) => {
            if(role == "seller"){
                if (v == true) {
                    console.log("seller true");
                    setAcceptFlag(true);
                    document.getElementById("buyerchat_input").disabled = false;
                } else {
                    console.log("seller false");
                    setAcceptFlag(false);
                    document.getElementById("buyerchat_input").disabled = true;
                }
            }else{
                console.log("buyer");
                setAcceptFlag(true);
                document.getElementById("buyerchat_input").disabled = false;
            }
        });       
    }, [isOpenedChat])
    
    const handler = (data) => {
        //decypt
        const ans = to_Decrypt(data.text, data.account);
        const open_chat = sessionStorage.getItem("open_chat");
        const account = sessionStorage.getItem("account");
        console.log(data);

        if (account === undefined || account === '') return;

        if (data.account !== account && open_chat !== "true") {
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
                        {data.account}
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
            fromAddress: data.fromAddress,
            text: ans,
        });

        setMessages([...temp]);
    }

    useEffect(() => {
        socket.on("message", handler);
        return () => socket.off('message', handler);
    }, [socket]);
    
    const setAcceptAllow = () => {
        setAcceptStatusAllow(contractAddress, tokenId);
        setAcceptFlag(true);
        document.getElementById("buyerchat_input").disabled = false;
    }

    const sendData = () => {
        if(role == "seller" && acceptFlag || role == "buyer"){
            if (text !== "") {
              //encrypt here
              const ans = to_Encrypt(text);
              socket.emit("chat", {ans, fromAddress: account, toAddress: contractAddress, tokenId: tokenId, role: role});
              setText("");
            }
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
                        if (i.fromAddress === account) {
                        return (
                            <Box className="sms-y my-3 grid" key={key}>
                                <p className="rounded-xl m-you px-4 py-2 text-white">{i.text}</p>
                            </Box>
                        );
                        } else {
                        return (
                            <Box className="sms-o my-3 grid" key={key}>
                                <p className="text-gray-600 text-xs">{i.account}</p>
                                <p className="rounded-xl m-other px-4 py-2">{i.text}</p>
                            </Box>
                        );
                        }
                    })}
                    <div ref={messagesEndRef} />
                </Box>
                <Box className="flex justify-between px-4 rounded-xl bg-white py-3" >
                    <Box>
                        <input
                            id="buyerchat_input"
                            style={{outline: 'none', width: 220}}
                            placeholder={(!acceptFlag && role == "seller") ? "Please accept first!" : "Text here!"}
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
                </Box>
            </Box>
        </Box>
        <Box style={{ position: "absolute", bottom: "-60px", right: "0px" }} onClick={closechat}><img src="/static/images/arrow-circle-down.png" /></Box>
    </Box>);
};

export default BuyerChat;
