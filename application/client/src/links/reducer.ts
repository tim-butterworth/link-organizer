import {
    Reducer
    , UnknownAction
} from '../common/commonTypes';

interface LinkState {
    linkList: string[]
}

export interface LinksCombinedState {
    links: LinkState
}

type LinkAction = UnknownAction;

const initialState = {
    linkList: []
}
const linkReducer: Reducer<LinkState, LinkAction> = (
    state: LinkState = initialState
): LinkState => state

export {
    linkReducer
}
