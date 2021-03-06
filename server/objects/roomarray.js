class RoomArray {
    constructor() {
        this.rooms = [];
    }

    addRoom(room_id, socket_id, max_participants) {
        var room = { room_id, socket_id, max_participants, 'participants': [] };
        this.rooms.push(room);
        return room;
    }

    removeRoom(id) {
        var removedRoom = this.rooms.filter((room) => room.room_id === id)[0];

        if (removedRoom) {
            this.room = this.rooms.filter((room) => room.room_id !== id);
        }

        return removedRoom;
    }

    getRoom(id) {
        return this.rooms.filter((room) => room.room_id === id)[0];
    }

    addUser(room_id, user) {
        // Get room to add to
        let room = this.getRoom(room_id);

        // Check to see if user can be added
        if ( room.participants.length >= room.max_participants ) { return false }

        // Push the user in if there's room
        room.participants.push(user);
    }

    removeUser(room_id, user_id) {
        // Get room to add to
        let room = this.getRoom(room_id);

        room.participants.filter( (user) => user.user_id !== user_id );
    }

    updateUserStatus(room_id, user_id, user_is_ready) {
        let room = this.getRoom(room_id);
        let user = room.participants.filter( (user) => user.user_id === user_id )[0];

        if ( user == null ) {
            console.log("error");
            return false;
        }
        console.log(user);
        
        user.is_ready = user_is_ready;

    }

    addToUserScore(room_id, user_id, amount) {
        let room = this.getRoom(room_id);
        let user = room.participants.filter( (user) => user.user_id === user_id )[0];

        if ( user == null ) {
            console.log("error");
            return false;
        }

        user.score += amount;
    }

    allReady(room_id) {
        let room = this.getRoom(room_id);
        room.participants.forEach(user => {
            if ( user.is_ready === false ) { return false }
        });

        return true;
    }

    roomExists(id) {
        var found = this.rooms.filter((room) => room.room_id === id);

        if ( found.length > 0 ) {
            return true
        }

        return false
    }
}

module.exports = { RoomArray };