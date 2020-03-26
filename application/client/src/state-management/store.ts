import {
    createStore
    , combineReducers
    , applyMiddleware
    , Action
    , Middleware
    , MiddlewareAPI
} from 'redux';

import {
    combineEpics
    , createEpicMiddleware
} from 'redux-observable';

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

import {
    getAddLinkEpic
} from '../links/add/addLinkEpic';

import {
    saveLinkHttpClient
} from '../links/add/AddLinkHttpClient';

interface ApplicationState extends NavigationCombinedState, LinksCombinedState, AddLinkCombinedState { }
type Actions = NavigationAction;

const epicMiddleware = createEpicMiddleware()
const loggingMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action: Action) => {
    console.log("Dispatching", action);

    const result = next(action)

    console.log("Result", result);

    return result
}

const store = createStore(
    combineReducers({
        navigation: navigationReducer
        , links: linkReducer
        , addLink: addLinkReducer
    })
    , applyMiddleware(
        loggingMiddleware
        , epicMiddleware
    )
);

epicMiddleware.run(combineEpics(getAddLinkEpic(saveLinkHttpClient)))

export { store }
