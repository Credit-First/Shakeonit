import io from "socket.io-client";
import Config from '../config/app';
export const socket = io(Config.socket_url);

export const simplifyAccount = function(account) {
    if (account === undefined || account === '')
        return "";
    return account.substring(0, 8) + "..." + account.substring(account.length - 4);
}
