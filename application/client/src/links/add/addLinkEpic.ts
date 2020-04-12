import {
    ActionsObservable
} from 'redux-observable';

import {
    filter
    , flatMap
    , map
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
    , getSaveFailure
    , getSaveSuccess
} from './addLinkDomainEvents';

export interface Link {
    url: string
}
const just = of

enum SaveLinkResultType {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
interface SaveLinkResultSuccess {
    type: SaveLinkResultType.SUCCESS;
}
const saveResultSuccess: SaveLinkResultSuccess = {
    type: SaveLinkResultType.SUCCESS
}
interface SaveLinkResultFailure {
    type: SaveLinkResultType.FAILURE
}
const saveResultFailure: SaveLinkResultFailure = {
    type: SaveLinkResultType.FAILURE
}

export type SaveLinkClient = (link: Link) => Observable<SaveLinkResultSuccess | SaveLinkResultFailure>;

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
    flatMap((saveAction: SaveLinkAction) => {
        const localId = getNextLocalId();

        return concat(
            just(getSavingLink({
                url: saveAction.payload.link,
                localId
            })),
            saveLinkClient({ url: saveAction.payload.link }).pipe(
                map((result: SaveLinkResultSuccess | SaveLinkResultFailure) => {
                    console.log("result", result)

                    if (result.type === SaveLinkResultType.FAILURE) {
                        return getSaveFailure({ localId })
                    } else {
                        return getSaveSuccess({ localId, remoteId: "22" })
                    }
                })
            )
        )
    })
)

export {
    getAddLinkEpic
    , saveResultSuccess
    , saveResultFailure
}
