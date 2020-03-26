import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
    Link
    , SaveLinkClient
} from './addLinkEpic';
import {
    getSaveSuccess
} from './addLinkDomainEvents';

const saveLinkHttpClient: SaveLinkClient = (link: Link) => of(getSaveSuccess({
    localId: "0",
    remoteId: "10"
})).pipe(
    delay(2000)
)

export {
    saveLinkHttpClient
}
