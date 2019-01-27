const { RoomArray } = require("../objects/roomarray");
const { UsersArray } = require("../objects/userarray");
const GameReference = require("../game_reference");
let { generateId } = require("../utils/utils.js");

let rooms = new RoomArray();
let users = new UsersArray();

module.exports = function(io) {
  io.on("connect", function(socket) {
    socket.on("create_room", data => {
      // Get a room id then send to the client
      let id = generateId();

      socket.join(id);
      io.to(id).emit("room_data", { ...rooms.addRoom(id, socket.id, 8) });
    });

    socket.on("join_room", data => {
      console.log(` JOINING ROOM ${data.room_id}`);
      // Data will contain the following:
      // room_id - id of the room to add to
      // user_name - nickname of the user

      if (rooms.roomExists(data.room_id) === false) {
        io.to(socket.id).emit("error", "Room not found");
        return;
      }

      // Set the room to the one specified
      var room = rooms.getRoom(data.room_id);

      // Check to see if the room is full
      if (room.participants.length >= room.max_participants) {
        io.to(socket.id).emit("error", "Room is full");
        return;
      }

      // Generate the user id to be used later
      user_id = generateId();

      var newUser = users.addUser(
        user_id,
        data.room_id,
        socket.id,
        data.username
      );
      rooms.addUser(room.room_id, newUser);

      io.to(room.socket_id).emit("update_data", room);

      // Add the user to the array
      io.to(socket.id).emit("room_connection_successful", { user_id });
    });

    socket.on("leave_room", data => {
      // Data will contain the following:
      // room_id - id of the room to remove user from
      // user_id - id of the user to remove

      rooms.removeUser(room_id, user_id);
    });

    socket.on("set_game_type", data => {
      // Data will contai the following:
      // room_id - id of the room to set the game type to
      // game_type - type of the game to send to clients

      // emit to all clients in the room the game type

      let users = rooms.getUsers(data.room_id);

      for (user in users) {
        io.to(user.socket_id).emit(
          "set_game_type",
          GameReference[data.game_type]
        );
      }
    });

    socket.on("start_game", data => {
      // Data will contain the following:
      // room_id - id of the room to start the game on
      // game_id - id of the type of game to be starting

      // emit to all clients in the room that the game is starting
      let users = rooms.getUsers(data.room_id);

      for (user in users) {
        io.to(user.socket_id).emit("game_start", data.game_type);
      }

      // set timer to the amount of time the game is supposed to be going for
      // based on the game type

      setTimeout(() => {
        // After timer expires emit game_over message to all clients in the room
        let users = rooms.getUsers(data.room_id);

        for (user in users) {
          io.to(user.socket_id).emit("game_over");
        }
      }, GameReference[data.game_type].game_length);
    });

    socket.on("get_updated_data", data => {
      // Data will contain the following:
      // room_id - id of room to fetch information

      const room = rooms.getRoom(data.room_id);

      io.to(room.socket_id).emit("update", room);
    });

    socket.on("user_action", data => {
      // Data will contain the following:
      // room_id - id of the room to update the score in
      // user_id - id of the user to be updating the score for
      // game_type - id of the type of game being played
      // action_type - the action performed by the user
      // action_data - data corresponding to the action (ANALYZE HERE LATER)

      // TODO later:
      // Verify valid actions
      const room = rooms.getRoom(data.room_id);

      console.log(
        `${data.user_id} is performing a ${data.action_type} in room ${
          data.room_id
        }`
      );

      switch (data.game_type) {
        case "squat_race":
          if (data.action_type == "squat") {
            rooms.addToUserScore(data.room_id, data.user_id, 1);
            io.to(room.socket_id).emit("update_data", room);
          }
          break;
        default:
          break;
      }

      // console.log(`User ${data.username} just did a ${data.action_type}!`);
    });

    socket.on("user_status_update", data => {
      console.log(data);
      // Data will contain the following:
      // room_id - id of the room the users status will be updated in
      // user_id - id of the user to update their status
      // user_is_ready - status of the user to be updated

      // Update the user room socket
      let room = rooms.getRoom(data.room_id);

      rooms.updateUserStatus(data.room_id, data.user_id, data.user_is_ready);

      if (rooms.allReady(data.room_id)) {
        io.to(room.socket_id).emit("players_ready", true);
      } else {
        io.to(room.socket_id).emit("players_ready", false);
      }

      io.to(room.socket_id).emit("update_data", room);
    });
  });

  io.on("disconnect", socket => {});
};
