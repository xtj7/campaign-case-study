import {IAction} from "../interfaces/action";

export const updateFilter = (filterName: string, filterValue: string): IAction => ({
    type: UPDATE_FILTER_TYPE,
    payload: {
        [filterName]: filterValue
    }
});

export const UPDATE_FILTER_TYPE = 'UPDATE_FILTER';