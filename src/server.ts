import app from './app';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
	console.log(
		'  App is running at http://localhost:%d in %s mode',
		app.get('port'),
		app.get('env')
	);
	console.log('  Press CTRL-C to stop\n');
});

// Exporting for Unit Test to use this as a starting point.
export default server;
