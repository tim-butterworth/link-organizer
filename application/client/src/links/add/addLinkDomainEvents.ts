import { GetAction } from '../../common/commonTypes';

export enum AddLinkDomainTypes {
    SAVING = "[SAVE_LINK:SAVING]",
    SUCCESS = "[SAVE_LINK:SUCCESS]",
    FAILURE = "[SAVE_LINK:FAILURE]"
}

export interface SavingLink {
    type: AddLinkDomainTypes.SAVING;
    payload: {
        localId: string;
        url: string;
    }
}

export interface SaveSuccess {
    type: AddLinkDomainTypes.SUCCESS;
    payload: {
        localId: string;
        remoteId: string;
    }
}
export interface SaveFailure {
    type: AddLinkDomainTypes.FAILURE;
    payload: {
        localId: string;
    }
}
const getSaveSuccess: GetAction<{ localId: string; remoteId: string; }, SaveSuccess> = (
    { localId, remoteId }
): SaveSuccess => ({
    type: AddLinkDomainTypes.SUCCESS,
    payload: {
        localId,
        remoteId
    }
})
const getSavingLink: GetAction<{ url: string; localId: string; }, SavingLink> = ({ url, localId }) => ({
    type: AddLinkDomainTypes.SAVING,
    payload: {
        url,
        localId
    }
})

export {
    getSaveSuccess
    , getSavingLink
}
