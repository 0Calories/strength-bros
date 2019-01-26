module.exports = function( app ) {

    const index = require('./index');
	const create_room = require('./create_room');

    app.use('/', index);
    app.use('/create', create_room)

}