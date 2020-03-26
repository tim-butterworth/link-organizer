import {
    Reducer
    , UnknownAction
} from '../common/commonTypes';
import {
    SavingLink
    , AddLinkDomainTypes
} from '../links/add/addLinkDomainEvents';

export enum NavigationActionType {
    HOME = "HOME",
    ADD = "ADD"
}

export interface HomeNavigationAction {
    type: NavigationActionType.HOME
}
export interface AddNavigationAction {
    type: NavigationActionType.ADD
}

export type NavigationAction = UnknownAction | HomeNavigationAction | AddNavigationAction | SavingLink

export enum NavigationLocation {
    HOME = "HOME",
    ADD = "ADD"
}

export interface NavigationState {
    currentLocation: NavigationLocation
}

const HomeState = {
    currentLocation: NavigationLocation.HOME
}
const AddState = {
    currentLocation: NavigationLocation.ADD
}

export interface NavigationCombinedState {
    navigation: NavigationState
}

const initialNavigationState: NavigationState = {
    currentLocation: NavigationLocation.HOME
}
const navigationReducer: Reducer<NavigationState, NavigationAction> = (
    state: NavigationState = initialNavigationState,
    action: NavigationAction
): NavigationState => {
    switch (action.type) {
        case NavigationActionType.ADD: return AddState
        case AddLinkDomainTypes.SAVING: return HomeState
        case NavigationActionType.HOME: return HomeState
        default: return state
    }
}

export {
    navigationReducer
}
