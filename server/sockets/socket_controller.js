let test_socket = require('./test_socket')
let test_socket2 = require('./test_socket2')


module.exports = function (io) {
    
    test_socket(io);
    test_socket2(io);

}