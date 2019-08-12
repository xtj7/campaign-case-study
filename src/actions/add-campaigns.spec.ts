import {addCampaigns} from './add-campaigns'
import {ICampaign} from "../interfaces/campaign";

describe('add campaigns action', () => {
    it('addCampaigns should create ADD_CAMPAIGNS action', () => {
        const dummyCampaign = getCampaign(1, 'dummy-campaign');
        expect(addCampaigns([dummyCampaign])).toEqual({
            type: 'ADD_CAMPAIGNS',
            payload: {
                campaigns: [dummyCampaign]
            }
        });
    });

    it('addCampaigns should allow for dynamic payload', () => {
        const dummyCampaign = getCampaign(2, 'dummy-campaign2');
        expect(addCampaigns([dummyCampaign])).toEqual({
            type: 'ADD_CAMPAIGNS',
            payload: {
                campaigns: [dummyCampaign]
            }
        });
    });
});

const getCampaign = (id: number, name: string): ICampaign => {
    return {
        id: id,
        name: name,
        startDate: new Date(),
        endDate: new Date(),
        Budget: 50000
    };
};
