import {
    createStore
    , combineReducers
    , Store
} from 'redux';

import {
    navigationReducer
    , NavigationCombinedState
    , NavigationAction
} from '../navigation/reducer';

import {
    linkReducer
    , LinksCombinedState
} from '../links/reducer';

import {
    addLinkReducer
    , AddLinkCombinedState
} from '../links/add/reducer';

interface ApplicationState extends NavigationCombinedState, LinksCombinedState, AddLinkCombinedState { }
type Actions = NavigationAction;

const store: Store<ApplicationState, Actions> = createStore(
    combineReducers({
        navigation: navigationReducer
        , links: linkReducer
        , addLink: addLinkReducer
    })
);

export { store }
