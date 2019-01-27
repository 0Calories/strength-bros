class UsersArray {
    constructor() {
        this.users = [];
    }

    addUser(user_id, room_id, socket_id, username) {
        var user = { user_id, room_id, socket_id, username, 'is_ready': false, 'score': 0 };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var removedUser = this.users.filter((user) => user.user_id === id)[0];

        if (removedUser) {
            this.users = this.users.filter((user) => user.user_id !== id);
        }

        return removedUser;
    }

    getUser(id) {
        return this.users.filter((user) => user.user_id === id)[0];
    }
    
}

module.exports = { UsersArray };