import {
    Reducer
    , UnknownAction
} from '../common/commonTypes';

import {
    SavingLink
    , SaveSuccess
    , AddLinkDomainTypes
} from './add/addLinkDomainEvents';

export enum LinkType {
    LOCAL_LINK = "LOCAL_LINK",
    REMOTE_LINK = "REMOTE_LINK"
}
interface LocalLink {
    linkType: LinkType.LOCAL_LINK;
    url: string;
    localId: string;
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

type LinkAction = SavingLink | SaveSuccess | UnknownAction;

const append: <T>(list: T[], t: T) => T[] = <T>(list: T[], t: T): T[] => {
    const result: T[] = []

    list.forEach((item: T) => {
        result.push(item)
    })
    result.push(t)

    return result
}

const getLocalLink = ({ url, localId }: { url: string; localId: string }): LocalLink => ({
    linkType: LinkType.LOCAL_LINK,
    url,
    localId
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
                    getLocalLink({
                        url: action.payload.url,
                        localId: action.payload.localId
                    })
                )
            }
        case AddLinkDomainTypes.SUCCESS: return state;
        default: return state;
    }
}

export {
    linkReducer
}
