import * as R from 'rambda';
import {
    Reducer
    , UnknownAction
} from '../common/commonTypes';

import {
    SavingLink
    , SaveSuccess
    , SaveFailure
    , AddLinkDomainTypes
} from './add/addLinkDomainEvents';

export enum LinkType {
    LOCAL_LINK = "LOCAL_LINK",
    REMOTE_LINK = "REMOTE_LINK"
}
export enum LocalLinkState {
    PENDING = "PENDING",
    SAVE_FAILURE = "SAVE_FAILURE"
}
interface LocalLink {
    linkType: LinkType.LOCAL_LINK;
    url: string;
    localId: string;
    state: LocalLinkState;
}
interface RemoteLink {
    linkType: LinkType.REMOTE_LINK;
    url: string;
    id: string;
}
export type LinkEntry = LocalLink | RemoteLink;

interface LinkState {
    linkList: LinkEntry[]
}

export interface LinksCombinedState {
    links: LinkState
}

type LinkAction = SavingLink | SaveSuccess | SaveFailure | UnknownAction;

const append: <T>(list: T[], t: T) => T[] = <T>(list: T[], t: T): T[] => {
    const result: T[] = []

    list.forEach((item: T) => {
        result.push(item)
    })
    result.push(t)

    return result
}

const getLocalLink = (
    {
        url,
        localId,
        state
    }: { url: string; localId: string; state: LocalLinkState; }
): LocalLink => ({
    linkType: LinkType.LOCAL_LINK,
    url,
    localId,
    state
})
const getLocalSuccessLink = ({ url, localId }: { url: string; localId: string }): LocalLink => getLocalLink({
    url,
    localId,
    state: LocalLinkState.PENDING
})

const getLocalFailureLink = ({ url, localId }: { url: string; localId: string }): LocalLink => getLocalLink({
    url,
    localId,
    state: LocalLinkState.SAVE_FAILURE
})

const initialState = {
    linkList: []
}
const linkReducer: Reducer<LinkState, LinkAction> = (
    state: LinkState = initialState,
    action: LinkAction
): LinkState => {
    switch (action.type) {
        case AddLinkDomainTypes.SAVING:
            return {
                linkList: append<LinkEntry>(
                    state.linkList,
                    getLocalSuccessLink({
                        url: action.payload.url,
                        localId: action.payload.localId
                    })
                )
            }
        case AddLinkDomainTypes.SUCCESS:
            return state;
        case AddLinkDomainTypes.FAILURE:
            const failureLocalId = action.payload.localId
            const updatedLinkList = R.map(
                (link: LinkEntry) => {
                    let updatedLinkEntry = link;

                    if (link.linkType === LinkType.LOCAL_LINK && link.localId === failureLocalId) {
                        updatedLinkEntry = getLocalFailureLink({ url: link.url, localId: link.localId });
                    }

                    return updatedLinkEntry;
                },
                state.linkList
            )

            return {
                linkList: updatedLinkList
            }
        default: return state;
    }
}

export {
    linkReducer
}
