import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    StateToProps
    , DispatchToProps
} from '../common/commonTypes';

import {
    NavigationActionType
} from '../navigation/reducer';

import {
    Links
    , LinksStateProps
    , LinksDispatchProps
} from './links';

import { LinksCombinedState } from './reducer';

const mapStateToProps: StateToProps<LinksCombinedState, LinksStateProps> = (
    state: LinksCombinedState
): LinksStateProps => ({
    links: state.links.linkList
})
const mapDispatchToProps: DispatchToProps<LinksDispatchProps> = (
    dispatch: Dispatch
): LinksDispatchProps => ({
    add: () => dispatch({ type: NavigationActionType.ADD })
})

const LinksConnectedComponent: React.SFC = connect(
    mapStateToProps
    , mapDispatchToProps
)(Links)

export {
    LinksConnectedComponent
}
