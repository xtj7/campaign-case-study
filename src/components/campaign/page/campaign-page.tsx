import React from 'react';
import queryString from 'query-string';
import {RouteComponentProps} from "react-router";
import CampaignFilter from "../filter/campaign-filter";
import CampaignFilteredList from "../filtered-list/campaign-filtered-list";
import CampaignAdd from "../add/campaign-add";
import './campaign-page.scss';
import Paper from "@material-ui/core/Paper";

const CampaignPage: React.FC<RouteComponentProps> = ({location}) => {
    let params = queryString.parse(location.search);

    return (
        <Paper className="campaign-container">
            <CampaignAdd/>
            <div className="campaign-filter-form">
                <CampaignFilter/>
            </div>
            <div className="campaign-list">
                <CampaignFilteredList/>
            </div>
        </Paper>
    );
};

export default CampaignPage;
