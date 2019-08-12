import React from 'react';
import {ICampaign} from "../../../interfaces/campaign";
import CampaignListItem from "../list-item/campaign-list-item";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const CampaignList: React.FC<IPropsCampaignList> = ({campaigns}) => {
    return (
        <div>
            {campaigns.map(campaign =>
                <CampaignListItem key={campaign.id} campaign={campaign}></CampaignListItem>
            )}
            {emptyMessage(campaigns)}
        </div>
    );
};

const emptyMessage = (campaigns: ICampaign[]) => {
    if (campaigns.length > 0) {
        return;
    }

    return (
        <Container>
            <Typography align="center">No items found for your selected criteria.</Typography>
        </Container>
    );
};

export default CampaignList;

export interface IPropsCampaignList {
    campaigns: ICampaign[]
}