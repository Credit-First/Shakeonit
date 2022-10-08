import io from "socket.io-client";
import Config from '../config/app';
export const socket = io(Config.socket_url);
localStorage.setItem("username", "guest" + Math.ceil(Math.random() * 65535));