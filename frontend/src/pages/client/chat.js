import React, { useEffect, useState, useRef } from "react";
import { Box, Avatar, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { to_Decrypt, to_Encrypt } from "./aes";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import ArrowBack from '@mui/icons-material/ArrowBack';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Picker from '@emoji-mart/react'
import toast from 'react-hot-toast';
import { useWeb3React } from "@web3-react/core";

import './chat.css';

import {socket} from '../global';
import Contact from './contact';
import { reduceAddress } from '../../utils/common'

import { getAllChattingHistories, getAcceptStatus, getContactsForBuyer, getBuyersByContract, getMessages, getLastMessage, setAcceptStatusAllow } from '../../store/apis';

const BuyerChat = (props) => {
    const { active, account } = useWeb3React();
    const { contractAddress, tokenId, username, isOpenedChat, openchat, closechat, role } = props;
    const [contacts, setContacts] = useState([{address: contractAddress, unread: 0}])
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [messages, setMessages] = useState([]);
    const [curAddr, setCurAddr] = useState(contractAddress);
    const [acceptFlag, setAcceptFlag] = useState(false);
    const [lastMessage, setLastMessage] = useState({});
    const [buyerAddr, setBuyerAddr] = useState('');
    const [buyers, setBuyers] = useState([]);

    useEffect(()=>{
        getContactsForBuyer()
            .then(res=>{
                const contactArr = res.map(item=>({address: item.contract_address, unread: 0, lastmsg: ''}))
                setContacts(prev=>[...getFilteredArrayByUnique([...prev, ...contactArr], 'address')])
            })
        getBuyersByContract(curAddr)
            .then(res=>{
                if(res != undefined && res.length) {
                    setBuyers(res.map(item=>item.from_address))
                    setBuyerAddr(res[0].from_address)
                }
            })
    }, [])

    const getFilteredArrayByUnique = (arr, field) => {
        var result = arr.reduce((unique, o) => {
          if(!unique.some(obj => obj[field] === o[field])) {
            unique.push(o);
          }
          return unique;
        }, []);
        return result
    }

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
        if (document.body.clientWidth < 767) { // mobile or tablet
            document.getElementById("message-content").style.display = "block";
            document.getElementById("message-back").style.display = "block";
        }
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
        // console.log(allChats);
        // setHistories([...allChats]);   
    }, [isOpenedChat])

    useEffect(() => {
        getLastMessage(role == "seller"? buyerAddr: account)
            .then(setLastMessage)
    }, [buyerAddr, account])

    useEffect(() => {
        if(account || (buyerAddr && role == "seller"))
            Promise.resolve()
                .then(_=>{
                    if(role == "seller")
                        return getMessages(curAddr, account, buyerAddr)
                    else
                        return getMessages(curAddr, 0, account)
                })
                .then(res=>{
                    const formatData = res.map(item=>({text: to_Decrypt(item.content, username), fromAddress: item.from_addr}))
                    setMessages(formatData)
                })
                .catch(err=>{
                    console.log(err)
                })
        if(role == "seller")
            getAcceptStatus(curAddr, buyerAddr)
                .then((accept) => {
                    console.log("seller", accept);
                    setAcceptFlag(accept);
                })
        else {
            console.log("buyer");
            setAcceptFlag(true);
        }
    }, [curAddr, account, buyerAddr])

    const handler = (data) => {
        //decypt
        const ans = to_Decrypt(data.text, data.account);
        const open_chat = sessionStorage.getItem("open_chat");
        const account = sessionStorage.getItem("account");
        console.log(data);

        if (data.role = role && data.username !== username) return;

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
        const newMsg = {
            userId: data.userId,
            fromAddress: data.fromAddress,
            text: ans,
        }
        setMessages(prev=>{
            return [...prev, newMsg]
        });
    }

    useEffect(() => {
        socket.on("message", handler);
        return () => socket.off('message', handler);
    }, [socket]);
    
    const setAcceptAllow = () => {
        setAcceptStatusAllow(contractAddress, buyerAddr, account);
        setAcceptFlag(true);
    }

    const sendData = () => {
        if(role == "seller" && acceptFlag || role == "buyer"){
            if (text !== "") {
              //encrypt here
              const ans = to_Encrypt(text);
              socket.emit("chat", {ans, fromAddress: account, toAddress: curAddr, tokenId: tokenId, role: role, buyerAddr});
              setText("");
            }
        }
    };

    const backToInbox = () => {
        document.getElementById("message-content").style.display = "none";
        document.getElementById("message-back").style.display = "none";
    }

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
  
    useEffect(scrollToBottom, [messages]);

    const handleChangeBuyer = (event) => {
        setBuyerAddr(event.target.value);
    };

    return (
    <Box className="rounded-xl message bg-gray-100">
        <Box className="rounded-xl text-white user-bg relative">
            <Box className="text-2xl font-medium pl-7 pr-7 py-3 flex">
                {account !== undefined ? reduceAddress(account) : ""}
                <div style={{ marginLeft: 'auto', marginTop: -3 }}>
                    <PhoneOutlinedIcon style={{fontSize: 30}} onClick={opencall} />
                </div>
            </Box>
            <Box className="flex pl-4 pr-4 py-3 flex">
                <div id="message-back" className="hidden">
                    <IconButton component="span" onClick={backToInbox} size="small" className="pt-2">
                        <ArrowBack style={{ fill: '#ffffff' }} />
                    </IconButton>
                </div>
                {role === "buyer" && account !== undefined ? (<Box className="text-white px-2 pt-2">Hello {reduceAddress(account)}, how can we help you</Box>) : ""}
                {
                    role === "seller" &&
                    <div style={{ marginLeft: 'auto', marginTop: -3, minWidth: 100 }}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="buyer-select-label">Buyer</InputLabel>
                            <Select
                                labelId="buyer-select-label"
                                value={buyerAddr}
                                label="Buyer"
                                autoWidth
                                onChange={handleChangeBuyer}
                            >
                                {
                                    buyers.map(buyer=>(
                                        <MenuItem value={buyer}>{reduceAddress(buyer)}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                }
            </Box>
        </Box>
        <Box className="flex">
            <Box className="message-inbox">
                {contacts.map((contact, key) => {
                    return (
                        <Contact data={contact} key={key} selected={contact.address === curAddr} openaddress={openaddress} lastMessage={lastMessage[contact.address] || ""}/>
                    );
                })}
            </Box>
            <Box id="message-content" className="hidden md:block">
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
                        emojiButtonSize={34}
                        perLine={8}
                        theme="light" />
                ) : null}
                <Box sx={{ display: "block", width: 300, height: 320, overflowY: "auto" }} className="px-5">
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
                <Box className="flex px-4 rounded-xl bg-white py-2" sx={{alignItems: 'center'}}>
                    <Box>
                        <input
                            id="buyerchat_input"
                            style={{outline: 'none', width: 200}}
                            placeholder={(!acceptFlag && role == "seller") ? "Please accept first!" : "Text here!"}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    sendData();
                                }
                            }}
                            disabled={(!acceptFlag && role == "seller")}
                        ></input>
                    </Box>  
                    <IconButton component="span" onClick={showEmojiPicker} size="small" disabled={!acceptFlag}>
                        <SentimentSatisfiedOutlinedIcon style={{ fill: '#999999' }} />
                    </IconButton>
                    <IconButton component="span" onClick={sendData} size="small" disabled={!acceptFlag}>
                        <img src="/static/images/send-2.png" style={{cursor: 'pointer'}} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
        <Box style={{ position: "absolute", bottom: "-60px", right: "0px" }} onClick={closechat}><img src="/static/images/arrow-circle-down.png" /></Box>
    </Box>);
};

export default BuyerChat;
