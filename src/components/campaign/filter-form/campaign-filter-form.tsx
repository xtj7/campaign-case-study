import React from 'react';
import Grid from "@material-ui/core/Grid";
import DateInput from "../../date-input/date-input";
import {SearchOutlined} from "@material-ui/icons";
import TextInput from "../../text-input/text-input";
import {ICampaignFilters} from "../../../interfaces/campaign-filters";
import './campaign-filter-form.scss';
import moment from "moment";

const CampaignFilterForm: React.FC<IStatePropsFilterList & IDispatchPropsFilterList> = ({filters, onChange}) => {
    return (
        <Grid container direction="row">
            <Grid item xs={12} sm={4}>
                <DateInput id="startDate"
                           label="Start-Date"
                           defaultValue={moment(filters.startDate).format('YYYY-MM-DD')}
                           onChange={onChange}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <DateInput id="endDate"
                           label="End-Date"
                           defaultValue={moment(filters.endDate).format('YYYY-MM-DD')}
                           onChange={onChange}/>
            </Grid>
            <Grid item xs={12} sm={4} className="search-container">
                <TextInput id="search"
                           label="Search by name"
                           defaultValue={filters.search}
                           onChange={onChange}/>
                <SearchOutlined className="search-icon"/>
            </Grid>
        </Grid>
    );
};

export interface IStatePropsFilterList {
    filters: ICampaignFilters
}

export interface IDispatchPropsFilterList {
    onChange: (filterName: string, filterValue: any) => void
}

export default CampaignFilterForm;
