import React from 'react';
import {ICampaign} from "../../../interfaces/campaign";
import {Grid} from "@material-ui/core";
import ActiveStatus from "../../active-status/active-status";
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import {dateFormat} from "../../../config";
import './campaign-list-item.scss';

const CampaignListItem: React.FC<IPropsCampaignListItem> = ({campaign}) => {
    return (
        <Grid container alignItems="center" className="campaign-list-item">
            <Grid item xs={12} sm={3}>{campaign.name}</Grid>
            <Grid item xs={6} sm={2}>
                <Moment date={campaign.startDate} format={dateFormat}></Moment>
            </Grid>
            <Grid item xs={6} sm={2}>
                <Moment date={campaign.endDate} format={dateFormat}></Moment>
            </Grid>
            <Grid item xs={6} sm={2}>
                <ActiveStatus startDate={campaign.startDate}
                              endDate={campaign.endDate}/>
            </Grid>
            <Grid item xs={6} sm={3}>
                <NumberFormat value={campaign.Budget}
                              displayType='text'
                              thousandSeparator={true}
                              prefix={'$'}/>
            </Grid>
        </Grid>
    );
};

export default CampaignListItem;

export interface IPropsCampaignListItem {
    campaign: ICampaign
}