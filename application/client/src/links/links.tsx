import React from 'react';
import * as R from 'rambda';

import {
    LinkEntry
    , LinkType
} from './reducer';

export interface LinksStateProps {
    links: LinkEntry[]
}
export interface LinksDispatchProps {
    add: () => void
}

interface LinkProps extends LinksStateProps, LinksDispatchProps {
}

const linkElement = (link: LinkEntry): JSX.Element => {
    let key = ""
    if (link.linkType === LinkType.LOCAL_LINK) {
        key = link.localId
    } else {
        key = link.id
    }

    return (
        <div
            key={key}
        >
            {link.url}
        </div>
    )
}

const Links: React.FunctionComponent<LinkProps> = (props: LinkProps): JSX.Element => (
    <div>
        {R.map(
            (link: LinkEntry) => linkElement(link),
            props.links
        )}
        <div
            onClick={props.add}
        >
            {"+"}
        </div>
    </div>
)

export {
    Links
}
