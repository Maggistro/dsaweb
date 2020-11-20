import 'bootstrap/dist/css/bootstrap.min.css';
import { IncomingMessage, Server } from 'http';
import { NextPageContext } from 'next';
import { AppProps } from 'next/app'
import { Context } from 'react';
import SocketServerService from '../services/SocketServerService';
import SocketService from '../services/SocketServerService';

function App({Component, pageProps}: AppProps )
{
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default App;
