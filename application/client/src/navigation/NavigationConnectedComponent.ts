import {
    connect
} from 'react-redux';

import {
    Dispatch
} from 'redux';

import {
    NavigationCombinedState
} from './reducer';
import {
    Navigation
    , NavigationStateProps
    , NavigationDispatchProps
    , NavigationLocationProps
} from './navigation';

type StateToProps = (state: NavigationCombinedState) => NavigationCombinedState;
type DispatchToProps = (dispatch: Dispatch) => NavigationDispatchProps;

const mapStateToProps: StateToProps = (state: NavigationCombinedState): NavigationStateProps => ({
    navigation: state.navigation
});
const mapDispatchToProps: DispatchToProps = (dispatch: Dispatch): NavigationDispatchProps => ({
    home: () => ({}),
    add: () => ({})
});

const NavigationConnectedComponent: React.SFC<NavigationLocationProps> = connect(
    mapStateToProps
    , mapDispatchToProps
)(Navigation)

export {
    NavigationConnectedComponent
}
