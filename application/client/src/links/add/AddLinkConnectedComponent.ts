import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    StateToProps
    , DispatchToProps
} from '../../common/commonTypes';

import {
    AddLink
    , AddLinkDispatchProps
    , AddLinkStateProps
} from './AddLink';

import {
    AddLinkCombinedState
    , getSaveLinkAction
    , getUpdateLinkAction
} from './reducer';

const mapStateToProps: StateToProps<AddLinkCombinedState, AddLinkStateProps> = (
    state: AddLinkCombinedState
): AddLinkStateProps => ({
    formData: state.addLink.formData
})
const mapDispatchToProps: DispatchToProps<AddLinkDispatchProps> = (
    dispatch: Dispatch
): AddLinkDispatchProps => ({
    addLink: (link: string) => dispatch(getSaveLinkAction(link)),
    updateLink: (updatedLink: string) => dispatch(getUpdateLinkAction(updatedLink))
})

const AddLinkConnectedComponent: React.SFC = connect(
    mapStateToProps
    , mapDispatchToProps
)(AddLink)

export { AddLinkConnectedComponent }
