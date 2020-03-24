import React from 'react';
import './App.css';

import { NavigationConnectedComponent } from './navigation/NavigationConnectedComponent';
import { Home } from './home/Home';
import { AddLinkConnectedComponent } from './links/add/AddLinkConnectedComponent';

const App: React.FunctionComponent<{}> = (): JSX.Element => (
    <div className="App">
        <NavigationConnectedComponent locations={{
            HOME: Home,
            ADD: AddLinkConnectedComponent
        }} />
    </div>
);

export default App;
