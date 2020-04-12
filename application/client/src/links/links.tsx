import React from 'react';
import * as R from 'rambda';
import './link.css';

import {
    LinkEntry
    , LinkType
    , LocalLinkState
} from './reducer';

export interface LinksStateProps {
    links: LinkEntry[]
}
export interface LinksDispatchProps {
    add: () => void
}

interface LinkProps extends LinksStateProps, LinksDispatchProps {
}

const resolveClassName = (link: LinkEntry): string => {
    switch (link.linkType) {
        case LinkType.REMOTE_LINK: return "remote"
        case LinkType.LOCAL_LINK: {
            if (link.state === LocalLinkState.PENDING) {
                return "pending"
            } else {
                return "save-failed"
            }
        }
    }
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
            className={resolveClassName(link)}
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
