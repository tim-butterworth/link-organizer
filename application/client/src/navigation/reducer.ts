import { Action } from 'redux';
import { Reducer } from '../common/commonTypes';

export enum NavigationActionType {
    UNKNOWN = "UNKNOWN",
    HOME = "HOME",
    ADD = "ADD"
}

export interface UnknownNavigationAction extends Action {
    type: NavigationActionType.UNKNOWN
}
export interface HomeNavigationAction extends Action {
    type: NavigationActionType.HOME
}
export interface AddNavigationAction extends Action {
    type: NavigationActionType.ADD
}
export type NavigationAction = UnknownNavigationAction | HomeNavigationAction | AddNavigationAction

export enum NavigationLocation {
    HOME = "HOME",
    ADD = "ADD"
}

export interface NavigationState {
    currentLocation: NavigationLocation
}

export interface NavigationCombinedState {
    navigation: NavigationState
}

const initialNavigationState: NavigationState = {
    currentLocation: NavigationLocation.HOME
}
const navigationReducer: Reducer<NavigationState, NavigationAction> = (
    state: NavigationState = initialNavigationState,
    { type: actionType }: NavigationAction
): NavigationState => {
    if (actionType === NavigationActionType.ADD) {
        return {
            currentLocation: NavigationLocation.ADD
        }
    } else {
        return state
    }
}

export {
    navigationReducer
}
