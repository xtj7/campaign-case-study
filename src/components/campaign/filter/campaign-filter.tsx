import {connect} from "react-redux";
import {ICampaignState} from "../../../interfaces/campaign-state";
import {Dispatch} from "redux";
import {IAction} from "../../../interfaces/action";
import CampaignFilterForm, {IDispatchPropsFilterList, IStatePropsFilterList} from "../filter-form/campaign-filter-form";
import {updateFilter} from "../../../actions/update-filter";

const mapStateToProps = (state: ICampaignState): IStatePropsFilterList => ({
    filters: state.campaignList.filters
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IDispatchPropsFilterList => ({
    onChange: (filterName: string, filterValue: any) => dispatch(updateFilter(filterName, filterValue))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignFilterForm);
