import {ICampaign} from "../interfaces/campaign";
import {IAction} from "../interfaces/action";

export const addCampaigns = (campaigns: ICampaign[]): IAction => ({
    type: ADD_CAMPAIGNS_TYPE,
    payload: {
        campaigns
    }
});

export const ADD_CAMPAIGNS_TYPE = 'ADD_CAMPAIGNS';