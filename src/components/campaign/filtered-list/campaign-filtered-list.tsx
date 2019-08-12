import {connect} from "react-redux";
import {ICampaignState} from "../../../interfaces/campaign-state";
import CampaignList, {IPropsCampaignList} from "../list/campaign-list";
import {ICampaignList} from "../../../interfaces/campaign-list";

export const getFilteredCampaigns = ({campaigns, filters}: ICampaignList) => {
    return campaigns
        .filter(campaign => isDateAfterFilter(campaign.startDate, filters.startDate))
        .filter(campaign => isDateBeforeFilter(campaign.endDate, filters.endDate))
        .filter(campaign => matchSearchFilter(campaign.name, filters.search));
};

export const isDateAfterFilter = (campaignDate: Date, compareDate: string): boolean => {
    if (compareDate === null || compareDate === '') {
        return true;
    }

    return campaignDate >= new Date(compareDate);
};

export const isDateBeforeFilter = (campaignDate: Date, compareDate: string): boolean => {
    if (compareDate === null || compareDate === '') {
        return true;
    }

    return campaignDate <= new Date(compareDate);
};

export const matchSearchFilter = (text: string, search: string): boolean => {
    if (search === null || search === '') {
        return true;
    }

    return text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
};

const mapStateToProps = (state: ICampaignState): IPropsCampaignList => ({
    campaigns: getFilteredCampaigns(state.campaignList)
});

export default connect(
    mapStateToProps
)(CampaignList)
