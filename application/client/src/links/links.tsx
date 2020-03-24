import React from 'react';

export interface LinksStateProps {
    links: string[]
}
export interface LinksDispatchProps {
    add: () => void
}

interface LinkProps extends LinksStateProps, LinksDispatchProps {
}

const Links: React.FunctionComponent<LinkProps> = (props: LinkProps): JSX.Element => (
    <div>
        {"Links"}
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
