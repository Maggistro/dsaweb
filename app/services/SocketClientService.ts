import { io, Socket } from "socket.io-client";

/**
 * Manages socket communication on the client
 */
class SocketClientService
{
    static instance: SocketClientService;

    private client: Socket | undefined;

    /**
     * Construct service as singleton
     */
    constructor() {
        if (!SocketClientService.instance) {
            SocketClientService.instance = this;
            this.initData();
        }
        return SocketClientService.instance;
    }

    /**
     * Connect socket to server and register listeners
     */
    initData() {
        if (typeof window !== 'undefined') {
            this.client = io({
                transports: ['websocket']
            });

            this.client?.on('connect', () => {
                console.log(`connected to server`);
            });

            this.client?.on('changes arrived', (data: {test: string}) => {
                console.log(`updating data with ${data}`);
            });

            this.client?.on('disconnect', () => {
                console.log('disconnect');
            });
        }
    }

    /**
     * Send an update request via socket
     */
    update() {
        this.client?.emit('update');
    }
}

export default SocketClientService;
