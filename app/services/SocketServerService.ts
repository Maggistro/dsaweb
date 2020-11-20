import { createServer,  Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export type ExtendedHttpServer = HttpServer & {
    io: Server
}

class SocketServerService
{
    static instance: SocketServerService;

    private server: Server | undefined;

    private connections: Map<string, Socket> = new Map<string, Socket>();

    constructor(server: ExtendedHttpServer ) {
        if (!SocketServerService.instance) {
            console.log("new socketserver");
            SocketServerService.instance = this;
            this.initData(server);
        }
        return SocketServerService.instance;
    }

    initData(server: ExtendedHttpServer) {
        if (server.io) {
            this.server = server.io;
            return;
        }

        this.server = new Server(server);
        server.io = this.server;

        this.server.on('connection', (socket: Socket) => {

            if (this.connections.has(socket.id)) return;
            console.log(`new connection from ${socket.id}`);
            this.connections.set(socket.id, socket);

            socket.on('update', () => {
                socket.emit('changes arrived', { test: 'test'});
            });
        });
    }
}

export default SocketServerService;
