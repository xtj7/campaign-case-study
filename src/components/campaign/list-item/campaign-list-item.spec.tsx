import React from 'react';
import {act} from "react-dom/test-utils";
import ReactDOM from 'react-dom';
import cheerio from 'cheerio';
import {ICampaign} from "../../../interfaces/campaign";
import CampaignListItem from "./campaign-list-item";
import moment from "moment";
import {dateFormat} from "../../../config";

let container: HTMLDivElement;

const mockCampaign: ICampaign = {
    id: 1,
    name: 'TestCampaign',
    startDate: moment().subtract(6, 'months').toDate(),
    endDate: moment().add(6, 'months').toDate(),
    Budget: 123
};

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
});

describe('CampaignListItem', () => {
    it('should display campaign name', () => {
        createComponent(mockCampaign);
        const $ = getComponentSelector();
        expect($('.campaign-list-item-name').text()).toEqual(mockCampaign.name);
    });

    it('should display campaign start date', () => {
        createComponent(mockCampaign);
        const $ = getComponentSelector();
        expect($('.campaign-list-item-start-date').text()).toEqual(moment(mockCampaign.startDate).format(dateFormat));
    });

    it('should display campaign end date', () => {
        createComponent(mockCampaign);
        const $ = getComponentSelector();
        expect($('.campaign-list-item-end-date').text()).toEqual(moment(mockCampaign.endDate).format(dateFormat));
    });

    it('should display campaign active status', () => {
        createComponent(mockCampaign);
        const $ = getComponentSelector();
        expect($('.campaign-list-item-active-status').text()).toContain('Active');
    });

    it('should display campaign budget', () => {
        createComponent(mockCampaign);
        const $ = getComponentSelector();
        expect($('.campaign-list-item-budget').text()).toContain('123');
    });
});

const createComponent = (campaign: ICampaign) => {
    act(() => {
        ReactDOM.render(<CampaignListItem campaign={campaign}></CampaignListItem>, container);
    });
};

const getComponentSelector = () => {
    const componentElement = container.querySelector('.campaign-list-item');
    if (componentElement === null) {
        throw new Error('campaign-list-item not found');
    }

    return cheerio.load(componentElement.outerHTML);
};
