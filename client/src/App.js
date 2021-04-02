import React from 'react'
import GameView from './views/GameView'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import GlobalStyle from './styles/globalStyles'
import TopNavBar from './components/navigation/TopNavBar'

const navigationDetails = [
    {
        name: "Home",
        path: "/home",
        page: <GameView />
    },
    {
        name: "How To Play",
        path: "/howtoplay",
        page: <div><h1>HELP PAGE WILL BE HERE</h1></div>
    },
    {
        name: "Road Map",
        path: "/roadmap",
        page: <div><h1>ROADMAP WILL BE HERE</h1></div>
    }
]

export default function App() {
    return (
        <Router>
            <div>
                {/* Need to apply global style better */}
                <GlobalStyle />
                <TopNavBar navDetails={navigationDetails} />
                <Switch>
                    {navigationDetails.map(navpath =>
                        <Route key={navpath.name} path={navpath.path}>
                            <div>
                                {navpath.page}
                            </div>
                        </Route>
                    )}
                    <Route path="/">
                        <GameView />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
