import {IAction} from "../interfaces/action";
import moment from 'moment';
import {UPDATE_FILTER_TYPE} from "../actions/update-filter";
import {ADD_CAMPAIGNS_TYPE} from "../actions/add-campaigns";

const initialState = {
    campaigns: [
        {
            "id": 1,
            "name": "Divavu",
            "startDate": new Date("9/19/2017"),
            "endDate": new Date("3/9/2018"),
            "Budget": 88377
        },
        {
            "id": 2,
            "name": "Jaxspan",
            "startDate": new Date("11/21/2017"),
            "endDate": new Date("2/21/2018"),
            "Budget": 608715
        },
        {
            "id": 3,
            "name": "Miboo",
            "startDate": new Date("11/1/2017"),
            "endDate": new Date("6/20/2017"),
            "Budget": 239507
        },
        {
            "id": 4,
            "name": "Trilith",
            "startDate": new Date("4/25/2019"),
            "endDate": new Date("11/30/2019"),
            "Budget": 179838
        },
        {
            "id": 5,
            "name": "Layo",
            "startDate": new Date("11/28/2017"),
            "endDate": new Date("3/10/2018"),
            "Budget": 837850
        },
        {
            "id": 6,
            "name": "Photojam",
            "startDate": new Date("7/25/2017"),
            "endDate": new Date("6/23/2017"),
            "Budget": 858131
        },
        {
            "id": 7,
            "name": "Blogtag",
            "startDate": new Date("6/27/2017"),
            "endDate": new Date("1/15/2018"),
            "Budget": 109078
        },
        {
            "id": 8,
            "name": "Rhyzio",
            "startDate": new Date("10/13/2017"),
            "endDate": new Date("1/25/2018"),
            "Budget": 272552
        },
        {
            "id": 9,
            "name": "Zoomcast",
            "startDate": new Date("9/6/2017"),
            "endDate": new Date("11/10/2017"),
            "Budget": 301919
        },
        {
            "id": 10,
            "name": "Realbridge",
            "startDate": new Date("3/5/2018"),
            "endDate": new Date("10/2/2017"),
            "Budget": 505602
        }
    ],
    filters: {
        startDate: moment().startOf('year').subtract(5, 'years').toDate(),
        endDate: moment().endOf('year').add(5, 'years').toDate(),
        search: ''
    }
};

const CampaignsReducer = (state = initialState, action: IAction) => {
    switch (action.type) {

        case ADD_CAMPAIGNS_TYPE:
            return {
                ...state,
                campaigns: [
                    ...state.campaigns,
                    ...action.payload.campaigns
                ]
            };

        case UPDATE_FILTER_TYPE:
            console.log('update filter', action.payload);
            const newState = {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            };

            // Ensure startDate cannot be before endDate
            if (new Date(newState.filters.startDate) >= new Date(newState.filters.endDate)) {
                return state;
            }

            return newState;

        default:
            return state;
    }
};

export default CampaignsReducer;
