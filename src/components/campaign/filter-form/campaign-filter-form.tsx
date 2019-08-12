import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import DateInput from "../../date-input/date-input";
import {SearchOutlined} from "@material-ui/icons";
import TextInput from "../../text-input/text-input";
import {ICampaignFilters} from "../../../interfaces/campaign-filters";
import './campaign-filter-form.scss';

const CampaignFilterForm: React.FC<IStatePropsFilterList & IDispatchPropsFilterList> = ({filters, onChange}) => {
    const changeHandler = (filterName: string, filterValue: any) => {
        // Ensure startDate can't be after endDate and endDate can't be before startDate
        if (filterName === 'startDate' && new Date(filterValue) > new Date(filters.endDate)) {
            filterValue = filters.endDate;
        } else if (filterName === 'endDate' && new Date(filterValue) < new Date(filters.startDate)) {
            filterValue = filters.startDate;
        }

        onChange(filterName, filterValue);
    };

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={4} className="filter-grid-item">
                <DateInput id="startDate"
                           label="Start-Date"
                           value={filters.startDate}
                           onChange={changeHandler}/>
            </Grid>
            <Grid item xs={12} sm={4} className="filter-grid-item">
                <DateInput id="endDate"
                           label="End-Date"
                           value={filters.endDate}
                           onChange={changeHandler}/>
            </Grid>
            <Grid item xs={12} sm={4} className="filter-grid-item search-container">
                <TextInput id="search"
                           label="Search by name"
                           value={filters.search}
                           onChange={changeHandler}/>
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
