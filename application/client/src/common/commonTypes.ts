import { Dispatch } from 'redux';

export type StateToProps<I, O> = (state: I) => O
export type DispatchToProps<O> = (dispatch: Dispatch) => O

export type Reducer<S, A> = (state: S, action: A) => S

export type GetAction<I, A> = (i: I) => A

export enum UnknownType {
    UNKNOWN = "UNKNOWN"
}
export interface UnknownAction {
    type: UnknownType
}

const getUnknownAction = (): UnknownAction => ({
    type: UnknownType.UNKNOWN
})
