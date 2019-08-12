import {updateFilter} from "./update-filter";

describe('update filter action', () => {
    it('updateFilter should create UPDATE_FILTER action', () => {
        expect(updateFilter('search', 'filterValue')).toEqual({
            type: 'UPDATE_FILTER',
            payload: {
                search: 'filterValue'
            }
        });
    });

    it('updateFilter should allow for dynamic payload', () => {
        expect(updateFilter('startDate', '02/03/2019')).toEqual({
            type: 'UPDATE_FILTER',
            payload: {
                startDate: '02/03/2019'
            }
        });
    });
});