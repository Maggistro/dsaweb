import { createServer,  Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

class SocketServerService
{
    static instance: SocketServerService;

    private server: Server | undefined;

    constructor(server: HttpServer ) {
        if (!SocketServerService.instance) {
            SocketServerService.instance = this;
            this.initData(server);
        }
        return SocketServerService.instance;
    }

    initData(server: HttpServer) {
        this.server = new Server(server);

        this.server.on('connection', (socket: Socket) => {
            console.log(`new connection from ${socket.id}`);
        });

        this.server.on('update', (socket: Socket) => {
            socket.broadcast.emit('changes arrived', { test: 'test'});
        });
    }
}

export default SocketServerService;
