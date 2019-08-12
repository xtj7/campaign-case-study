import {isDateAfterFilter, isDateBeforeFilter, matchSearchFilter} from "./campaign-filtered-list";
import moment from "moment";

describe('CampaignFilteredList', () => {
    it('isDateBeforeFilter is before current date', () => {
        expect(isDateBeforeFilter(moment('2019-01-01').toDate(), '2019-06-01')).toEqual(true);
    });

    it('isDateBeforeFilter is after current date', () => {
        expect(isDateBeforeFilter(moment('2019-12-01').toDate(), '2019-06-01')).toEqual(false);
    });

    it('isDateAfterFilter is before current date', () => {
        expect(isDateAfterFilter(moment('2019-01-01').toDate(), '2019-06-01')).toEqual(false);
    });

    it('isDateAfterFilter is after current date', () => {
        expect(isDateAfterFilter(moment('2019-12-01').toDate(), '2019-06-01')).toEqual(true);
    });

    it('isDateAfterFilter is after current date, different year', () => {
        expect(isDateAfterFilter(moment('2019-05-01').toDate(), '2018-06-01')).toEqual(true);
    });

    it('matchSearchFilter does full match', () => {
        expect(matchSearchFilter('Test', 'Test')).toEqual(true);
    });

    it('matchSearchFilter does partial match', () => {
        expect(matchSearchFilter('This is a testcampaign', 'test')).toEqual(true);
    });

    it('matchSearchFilter does case-insensitive match', () => {
        expect(matchSearchFilter('TeSt', 'test')).toEqual(true);
    });

    it('matchSearchFilter does not match on different strings', () => {
        expect(matchSearchFilter('TeSt', 'abc')).toEqual(false);
    });
});