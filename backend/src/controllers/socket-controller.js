
const c_users = [];

function join_User(id, username, room, role) {
    const index = c_users.findIndex((p_user) => p_user.id === id);
    if (index >= 0)
      c_users.splice(index, 1)[0];
    const p_user = { id, username, room, role };
  
    c_users.push(p_user);
    console.log(c_users, "users");
  
    return p_user;
}
  
// Gets a particular user id to return the current user
function get_Current_User(id) {
    return c_users.find((p_user) => p_user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
    const index = c_users.findIndex((p_user) => p_user.id === id);

    if (index !== -1) {
        return c_users.splice(index, 1)[0];
    }
}

const init = function (http) {
    const io = require('socket.io')(http, {
        cors: {
            origin: '*'
        }
    });

    io.on("connection", (socket) => {
        //for a new user joining the room
        socket.on("joinRoom", ({ username, roomname, role }) => {
          //* create user
          const p_user = join_User(socket.id, username, roomname, role);
          if (p_user != null) {
            console.log(socket.id, "=id");
            socket.join(p_user.room);
          }
        });
      
        //user sending message
        socket.on("chat", (text) => {
          //gets the room user and the message sent
          const p_user = get_Current_User(socket.id);
          if (p_user != null) {
      
            io.to(p_user.room).emit("message", {
              userId: p_user.id,
              username: p_user.username,
              role: p_user.role,
              text: text,
            });
          }
        });
      
        //when the user exits the room
        socket.on("disconnect", () => {
          //the user is deleted from array of users and a left room message displayed
          console.log('user disconnect from ' + socket.id);
          const p_user = user_Disconnect(socket.id);
        });
    })
}

module.exports = {
  init
};

