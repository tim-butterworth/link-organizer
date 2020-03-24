import React from 'react';

import {
    NavigationState
    , NavigationLocation
} from './reducer';

export interface NavigationDispatchProps {
    home: () => void
    add: () => void
}
export interface NavigationStateProps {
    navigation: NavigationState,
}
export interface NavigationLocationProps {
    locations: { [keys in NavigationLocation]: React.SFC }
}

interface NavigationProps extends NavigationDispatchProps, NavigationStateProps, NavigationLocationProps { }

const Navigation: React.FC<NavigationProps> = (props: NavigationProps): JSX.Element => {
    const currentLocation = props.navigation.currentLocation;
    const CurrentView: React.SFC = props.locations[currentLocation];

    return (
        <div>
            <div>
                <CurrentView />
            </div>
        </div>
    )
}

export {
    Navigation
}
