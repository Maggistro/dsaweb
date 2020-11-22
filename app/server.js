const app = require('express')();
const server = require('http').Server(app);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

/**
 * Start our custom server and attach the http server instance to the req object
 */
nextApp.prepare().then(() => {
    app.all('*', (req, res) => {
        req.server = server;
        return nextHandler(req, res)
    });
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
})
