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
        let room = getRoom(room_id);

        // Check to see if user can be added
        if ( room.participants.length >= room.max_participants ) { return false }

        // Push the user in if there's room
        room.participants.push(user);
    }

    removeUser(room_id, user_id) {
        // Get room to add to
        let room = getRoom(room_id);

        room.participants.filter( (user) => user.user_id !== user_id );
    }

    roomExists(id) {
        var found = this.rooms.filter((room) => room.room_id === id)[0];

        if ( found !== null ) {
            return true
        }

        return false
    }
}

module.exports = { RoomArray };