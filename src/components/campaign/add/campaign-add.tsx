import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IAction} from "../../../interfaces/action";
import React from "react";
import {addCampaigns} from "../../../actions/add-campaigns";
import {ICampaign} from "../../../interfaces/campaign";
import validateCampaignList from "../../../validators/campaign-list-validator";
import {ICampaignState} from "../../../interfaces/campaign-state";

const CampaignAdd: React.FC<IAddCampaignProps & IPropsCampaignAddList> = ({addCampaigns, campaigns}) => {
    (window as any).AddCampaigns = (campaignJson: string | ICampaign[] & any) => {
        try {
            let addCampaignList: ICampaign[] = typeof campaignJson === 'string' ? JSON.parse(campaignJson) : campaignJson;
            if(validateCampaignList(addCampaignList)) {

                // Convert date strings to actual dates
                addCampaignList = addCampaignList.map((campaign: ICampaign & any) => {
                    if(typeof campaign.startDate === 'string') {
                        campaign.startDate = new Date(campaign.startDate);
                    }
                    if(typeof campaign.endDate === 'string') {
                        campaign.endDate = new Date(campaign.endDate);
                    }
                    return campaign;
                });

                // Avoid duplicate IDs by trying to match IDs to existing campaigns
                const filteredAddCampaignList = addCampaignList.filter(addCampaign =>
                    campaigns.filter(campaign => addCampaign.id === campaign.id).length > 0);

                if(filteredAddCampaignList.length === 0) {
                    // No duplicates, proceed to add campaign
                    addCampaigns(addCampaignList);
                } else {
                    // Report on duplicate IDs
                    const duplicateIds = filteredAddCampaignList.map(filteredCampaign => filteredCampaign.id);
                    alert(`Aborted due to duplicate IDs found: ${duplicateIds.join(', ')}`);
                }
            }
        } catch (e) {
            // Invalid data was passed, so report an error
            alert(`Parsing campaigns failed: ${e}`);
        }
    };

    return null;
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IAddCampaignProps => ({
    addCampaigns: (campaigns: ICampaign[]) => dispatch(addCampaigns(campaigns))
});
const mapStateToProps = (state: ICampaignState): IPropsCampaignAddList => ({
    campaigns: state.campaignList.campaigns
});

export interface IAddCampaignProps {
    addCampaigns: (campaigns: ICampaign[]) => void;
}

export interface IPropsCampaignAddList {
    campaigns: ICampaign[]
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignAdd);
