import React from 'react';

export interface AddLinkDispatchProps {
    addLink: (link: string) => void
    updateLink: (updatedLink: string) => void
}

export interface AddLinkStateProps {
    formData: {
        link: string
    }
}

interface AddLinkProps extends AddLinkDispatchProps, AddLinkStateProps { }

const AddLink: React.FC<AddLinkProps> = (props: AddLinkProps) => (
    <div>
        {"Add Link"}
        <div>
            <div>
                <label>{"Link"}</label>
                <input
                    type="text"
                    value={props.formData.link}
                    onChange={(changeEvent) => {
                        props.updateLink(changeEvent.target.value)
                    }}
                >
                </input>
            </div>
            <div>
                <button
                    onClick={(clickEvent) => {
                        clickEvent.preventDefault()

                        props.addLink(props.formData.link)
                    }}
                >
                    ADD
		</button>
            </div>
        </div>
    </div>
)

export { AddLink }
