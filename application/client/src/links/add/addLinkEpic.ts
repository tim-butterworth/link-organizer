import {
    ActionsObservable
} from 'redux-observable';

import {
    filter
    , flatMap
} from 'rxjs/operators';

import {
    of
    , concat
    , Observable
} from 'rxjs';

import { UnknownAction } from '../../common/commonTypes';
import {
    SaveLinkAction
} from './reducer';
import {
    SaveSuccess
    , SaveFailure
    , getSavingLink
} from './addLinkDomainEvents';

export interface Link {
    url: string
}
const just = of
export type SaveLinkClient = (link: Link) => Observable<SaveSuccess | SaveFailure>;

let currentId: number = 0;
const getNextLocalId: () => string = (): string => {
    const idString = `${currentId + 1}`;

    currentId++;

    return idString;
}

type Actions = SaveLinkAction | UnknownAction
const getAddLinkEpic = (
    saveLinkClient: SaveLinkClient
) => (
    action: ActionsObservable<Actions>
) => action.pipe(
    filter((a: Actions): a is SaveLinkAction => a.type === "SAVE"),
    flatMap((saveAction: SaveLinkAction) => concat(
        just(getSavingLink({
            url: saveAction.payload.link,
            localId: getNextLocalId()
        })),
        saveLinkClient({ url: saveAction.payload.link })
    ))
)

export {
    getAddLinkEpic
}
