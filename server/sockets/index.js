const { RoomArray } = require('../objects/roomarray');
const { UsersArray } = require('../objects/userarray');
let { generateId } = require('../utils/utils.js');

let rooms = new RoomArray();
let users = new UsersArray();

module.exports = function(io) {

    io.on('connect', function (socket) {
        
        socket.on('create_room', (data) => {
            // Data will include the 

            // Get a room id then send to the client
            let id = generateId();

            socket.join(id);
            io.to(id).emit('room_data', { "room_id": id, 'room': rooms.addRoom( id, socket.id, 4 ) } );

        });

        socket.on('join_room', (data) => {

            console.log(` JOINING ROOM ${data.room_id}`); 
            // Data will contain the following:
            // room_id - id of the room to add to
            // user_name - nickname of the user

            if ( rooms.roomExists(data.room_id) === false ) {
                io.to(socket.id).emit( "error", "Room not found" );
                return;
            } 

            // Set the room to the one specified
            var room = rooms.getRoom(data.room_id);

            // Check to see if the room is full
            if ( room.participants.length >= room.max_participants ) {
                io.to(socket.id).emit( "error", "Room is full" );
                return;
            }

            // Generate the user id to be used later
            user_id = generateId();

            var newUser = users.addUser( user_id, data.room_id, socket.id, data.username );
            room.addUser( newUser );


            // Add the user to the array
            io.to(socket.id).emit( 'room_connection_successful', { user_id } );

        })

        socket.on('leave_room', (data) => {
            // Data will contain the following:
            // room_id - id of the room to remove user from
            // user_id - id of the user to remove

            // Ensure user id is in the room
                // remove from the room
        })

        socket.on('set_game_type', (data) => {
            // Data will contai the following:
            // room_id - id of the room to set the game type to
            // game_type - type of the game to send to clients

            // emit to all clients in the room the game type
        })

        socket.on('start_game', (data) => {
            // Data will contain the following:
            // room_id - id of the room to start the game on
            
            // emit to all clients in the room that the game is starting

            // set timer to the amount of time the game is supposed to be going for
            // based on the game type

            // After timer expires emit game_over message to all clients in the room
        })

        socket.on('update_score', (data) => {
            // Sets users score to value specified in data
            
        })


        // Examples of 
        socket.on('user_action', (data) => {
            // Data will contain the following:
            // room_id - id of the room to update the score in
            // user_id - id of the user to be updating the score for
            // game_type - id of the type of game being played
            // action_type - the action performed by the user
            // action_data - data corresponding to the action (ANALYZE HERE LATER)

            // TODO later:
            // Verify valid actions
            console.log(`User ${data.username} just did a ${data.action}!`);
        })

        socket.on('user_status_update', (data) => {
            // Data will contain the following:
            // room_id - id of the room the users status will be updated in
            // user_id - id of the user to update their status
            // user_status - status of the user to be updated

        })

        

    });

    io.on('disconnect', (socket) => {

    });
    
}