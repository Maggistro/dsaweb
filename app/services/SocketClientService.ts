import { io, Socket } from "socket.io-client";

class SocketClientService
{
    static instance: SocketClientService;

    private client: Socket | undefined;

    constructor() {
        if (!SocketClientService.instance) {
            SocketClientService.instance = this;
            this.initData();
        }
        return SocketClientService.instance;
    }

    initData() {
        this.client = io({
            transports: ['websocket']
        });

        this.client.on('connect', () => {
            console.log(`connected to server`);
        });

        this.client.on('changes arrived', (data: {test: string}) => {
            console.log(`updating data with ${data}`);
        });

        this.client.on('disconnect', () => {
            console.log('disconnect');
        });
    }

    update() {
        this.client?.emit('update');
    }
}

export default SocketClientService;
