import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import {getWebsocketDomain} from "./helpers/getDomain";
import {StompSessionProvider} from "react-stomp-hooks";
import React from "react";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
    return (
        <div>
            {/*StompSessionProvider : Once a user open the App, he will be connected via WS*/}
            <StompSessionProvider
                brokerURL={`${getWebsocketDomain()}/gs-guide-websocket`}
                debug={STOMP => console.log({STOMP})}
                onConnect={() => console.log({STOMP_CONNECT: 'TCP connection successfully established'})}
            >
                <Header/>
                <AppRouter/>
            </StompSessionProvider>

        </div>
    );
};

export default App;
