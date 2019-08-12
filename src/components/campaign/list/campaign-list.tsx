import React from 'react';
import {ICampaign} from "../../../interfaces/campaign";
import CampaignListItem from "../list-item/campaign-list-item";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import './campaign-list.scss';

const CampaignList: React.FC<IPropsCampaignList> = ({campaigns}) => {
    return (
        <div>
            {tableHeading(campaigns)}
            {campaignList(campaigns)}
            {emptyMessage(campaigns)}
        </div>
    );
};

const tableHeading = (campaigns: ICampaign[]) => {
    if (campaigns.length === 0) {
        return;
    }

    return (
        <Hidden xsDown>
            <Grid container className="campaign-list-table-heading">
                <Grid item xs={12} sm={3}>Name</Grid>
                <Grid item xs={6} sm={2}>Start Date</Grid>
                <Grid item xs={6} sm={2}>End Date</Grid>
                <Grid item xs={6} sm={3}>Active</Grid>
                <Grid item xs={6} sm={2}>Budget</Grid>
            </Grid>
        </Hidden>
    );
};

const campaignList = (campaigns: ICampaign[]) => {
    if (campaigns.length === 0) {
        return;
    }

    return (
        <div className="campaign-list-container">
            {campaigns.map(campaign =>
                <CampaignListItem key={campaign.id} campaign={campaign}></CampaignListItem>
            )}
        </div>
    );
};

const emptyMessage = (campaigns: ICampaign[]) => {
    if (campaigns.length > 0) {
        return;
    }

    return (
        <Container>
            <Typography align="center">
                <span className="campaign-list-no-content">No items found for your selected criteria.</span>
            </Typography>
        </Container>
    );
};

export default CampaignList;

export interface IPropsCampaignList {
    campaigns: ICampaign[]
}
