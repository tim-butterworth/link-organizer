import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
    map
    , catchError
} from 'rxjs/operators';

import {
    Link
    , SaveLinkClient
} from './addLinkEpic';
import {
    saveResultSuccess
    , saveResultFailure
} from './addLinkEpic';

const saveLinkHttpClient: SaveLinkClient = (link: Link) => ajax({
    url: 'http://localhost:8080/links',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: {
        url: link.url,
        description: "Some description"
    }
}).pipe(
    map(response => {
        console.log('response: ', response)

        return saveResultSuccess
    }),
    catchError(error => {
        console.log('error: ', error);

        return of(saveResultFailure);
    })
)

export {
    saveLinkHttpClient
}
