module.exports = function(io) {

    io.on('connect', function (socket) {
        
        socket.on('create_room', (data) => {
            console.log(`Creating room`);

            // Get a room id then send to the client


        });


        socket.on('add_to_room', (data) => {
            // Data will contain the following:
            // room_id - id of the room to add to
            // user_id - id of the user to add to the room
            // user_name - nickname of the user

            // Ensure room isn't already full
                // if full return error to client
                // else add to room

        })

        socket.on('remove_from_room', (data) => {
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