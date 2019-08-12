import {connect} from "react-redux";
import {ICampaign} from "../../../interfaces/campaign";
import {ICampaignState} from "../../../interfaces/campaign-state";
import CampaignList, {IPropsCampaignList} from "../list/campaign-list";
import {ICampaignList} from "../../../interfaces/campaign-list";

const getFilteredCampaigns = ({campaigns, filters}: ICampaignList) => {
    return campaigns
        .filter(campaign => applyStartDateFilter(campaign, filters.startDate))
        .filter(campaign => applyEndDateFilter(campaign, filters.endDate))
        .filter(campaign => applySearchFilter(campaign, filters.search));
};

const applyStartDateFilter = (campaign: ICampaign, startDate: string): boolean => {
    if (startDate === null || startDate === '') {
        return true;
    }

    return new Date(campaign.startDate) >= new Date(startDate);
};

const applyEndDateFilter = (campaign: ICampaign, endDate: string): boolean => {
    if (endDate === null || endDate === '') {
        return true;
    }

    return new Date(campaign.endDate) <= new Date(endDate);
};

const applySearchFilter = (campaign: ICampaign, search: string): boolean => {
    if (search === null || search === '') {
        return true;
    }

    return campaign.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
};

const mapStateToProps = (state: ICampaignState): IPropsCampaignList => ({
    campaigns: getFilteredCampaigns(state.campaignList)
});

export default connect(
    mapStateToProps
)(CampaignList)