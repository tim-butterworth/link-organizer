import {
    Reducer
    , UnknownAction
    , GetAction
} from '../../common/commonTypes';

interface AddLinkState {
    formData: {
        link: string
    }
}

enum AddLinkActionType {
    UPDATE = "UPDATE",
    SAVE = "SAVE"
}

export interface UpdateLinkAction {
    type: AddLinkActionType.UPDATE
    payload: {
        updatedLink: string
    }
}
export interface SaveLinkAction {
    type: AddLinkActionType.SAVE
    payload: {
        link: string
    }
}

export type AddLinkAction = UpdateLinkAction | SaveLinkAction | UnknownAction;

export interface AddLinkCombinedState {
    addLink: AddLinkState
}

const getUpdateLinkAction: GetAction<string, UpdateLinkAction> = (updatedLink: string) => ({
    type: AddLinkActionType.UPDATE,
    payload: {
        updatedLink
    }
})
const getSaveLinkAction: GetAction<string, SaveLinkAction> = (link: string) => ({
    type: AddLinkActionType.SAVE,
    payload: {
        link
    }
})

const initialState = {
    formData: {
        link: ""
    }
}
const addLinkReducer: Reducer<AddLinkState, AddLinkAction> = (
    state: AddLinkState = initialState
    , action: AddLinkAction
): AddLinkState => {
    switch (action.type) {
        case AddLinkActionType.SAVE: return state
        case AddLinkActionType.UPDATE: return {
            formData: {
                link: action.payload.updatedLink
            }
        }
    }

    return state
}

export {
    addLinkReducer
    , getUpdateLinkAction
    , getSaveLinkAction
}
