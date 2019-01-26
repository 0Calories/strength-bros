module.exports = function(io) {

    io.on('connect', function (socket) {
        
        socket.on('event2', () => {
            console.log(`Event 2`);
        })

    });
    
}