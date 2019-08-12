import {ICampaign} from "./campaign";
import {ICampaignFilters} from "./campaign-filters";

export interface ICampaignList {
    campaigns: ICampaign[];
    filters: ICampaignFilters;
}