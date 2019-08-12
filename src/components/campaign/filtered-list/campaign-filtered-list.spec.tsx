import {
    campaignFilterReducer,
    isDateAfterFilter,
    isDateBeforeFilter,
    matchSearchFilter
} from "./campaign-filtered-list";
import moment from "moment";
import {ICampaignFilters} from "../../../interfaces/campaign-filters";
import {ICampaign} from "../../../interfaces/campaign";

const mockFilters: ICampaignFilters = {
    startDate: '',
    endDate: '',
    search: ''
};

const mockCampaigns: ICampaign[] = [
    {id: 1, name: 'campaign aa', startDate: new Date('2017-01-01'), endDate: new Date('2017-12-31'), Budget: 100},
    {id: 2, name: 'campaign ab', startDate: new Date('2018-01-01'), endDate: new Date('2018-12-31'), Budget: 100},
    {id: 3, name: 'campaign bc', startDate: new Date('2019-01-01'), endDate: new Date('2019-12-31'), Budget: 100},
];

describe('CampaignFilteredList', () => {

    describe('isDateBeforeFilter', () => {
        it('is before current date', () => {
            expect(isDateBeforeFilter(moment('2019-01-01').toDate(), '2019-06-01')).toEqual(true);
        });

        it('is after current date', () => {
            expect(isDateBeforeFilter(moment('2019-12-01').toDate(), '2019-06-01')).toEqual(false);
        });
    });

    describe('isDateAfterFilter', () => {
        it('is before current date', () => {
            expect(isDateAfterFilter(moment('2019-01-01').toDate(), '2019-06-01')).toEqual(false);
        });

        it('is after current date', () => {
            expect(isDateAfterFilter(moment('2019-12-01').toDate(), '2019-06-01')).toEqual(true);
        });

        it('is after current date, different year', () => {
            expect(isDateAfterFilter(moment('2019-05-01').toDate(), '2018-06-01')).toEqual(true);
        });
    });

    describe('matchSearchFilter', () => {
        it('does full match', () => {
            expect(matchSearchFilter('Test', 'Test')).toEqual(true);
        });

        it('does partial match', () => {
            expect(matchSearchFilter('This is a testcampaign', 'test')).toEqual(true);
        });

        it('does case-insensitive match', () => {
            expect(matchSearchFilter('TeSt', 'test')).toEqual(true);
        });

        it('does not match on different strings', () => {
            expect(matchSearchFilter('TeSt', 'abc')).toEqual(false);
        });
    });

    describe('campaignFilterReducer', () => {
        it('uses matchSearchFilter', () => {
            expect(campaignFilterReducer({
                campaigns: mockCampaigns,
                filters: {
                    ...mockFilters,
                    search: 'campaign a'
                }
            }).length).toEqual(2);
        });

        it('uses isDateAfterFilter', () => {
            expect(campaignFilterReducer({
                campaigns: mockCampaigns,
                filters: {
                    ...mockFilters,
                    startDate: '2018-01-01'
                }
            }).length).toEqual(2);
        });

        it('uses isDateBeforeFilter', () => {
            expect(campaignFilterReducer({
                campaigns: mockCampaigns,
                filters: {
                    ...mockFilters,
                    endDate: '2018-12-31'
                }
            }).length).toEqual(2);
        });
    });
});
