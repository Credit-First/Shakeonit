
const messageController = require('./message-controller');

const c_users = [];

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
  const index = c_users.findIndex((p_user) => p_user.id === id);

  if (index !== -1) {
      return c_users.splice(index, 1)[0];
  }
}

function join_User(id, contractAddress, tokenId) {
    user_Disconnect(id);

    const p_user = { id, contractAddress, tokenId };
    c_users.push(p_user);
  
    return p_user;
}
  
// Gets a particular user id to return the current user
function get_Current_User(id) {
    return c_users.find((p_user) => p_user.id === id);
}

const init = function (http) {
    const io = require('socket.io')(http, {
        cors: {
            origin: '*'
        }
    });

    io.on("connection", (socket) => {
        //for a new user joining the room
        socket.on("joinRoom", ({ contractAddress, tokenId }) => {
          // create user
          const p_user = join_User(socket.id, contractAddress, tokenId);
          if (p_user != null) {
            socket.join(p_user.room);
          }
        });
      
        //user sending message
        socket.on("chat", (data) => {
          //gets the room user and the message sent
          const p_user = get_Current_User(socket.id);
          if (p_user != null) {
            messageController.insert(data.fromAddress, data.toAddress, data.ans, data.role, data.buyerAddr);
            io.to(p_user.room).emit("message", {
              userId: p_user.id,
              fromAddress: data.fromAddress,
              contractAddress: p_user.contractAddress,
              tokenId: p_user.tokenId,
              text: data.ans,
            });
          }
        });
      
        //when the user exits the room
        socket.on("disconnect", () => {
          //the user is deleted from array of users and a left room message displayed
          user_Disconnect(socket.id);
        });
    })
}

module.exports = {
  init
};