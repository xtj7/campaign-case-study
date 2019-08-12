import React from 'react';
import {act} from "react-dom/test-utils";
import ReactDOM from 'react-dom';
import cheerio from 'cheerio';
import {ICampaign} from "../../../interfaces/campaign";
import moment from "moment";
import CampaignList from "./campaign-list";

let container: HTMLDivElement;

const mockCampaigns: ICampaign[] = [
    {
        id: 1,
        name: 'TestCampaign 1',
        startDate: moment().subtract(6, 'months').toDate(),
        endDate: moment().add(6, 'months').toDate(),
        Budget: 123
    },
    {
        id: 2,
        name: 'TestCampaign 2',
        startDate: moment().subtract(3, 'months').toDate(),
        endDate: moment().add(3, 'months').toDate(),
        Budget: 456
    }
];

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
});

describe('CampaignListItem', () => {
    it('should display multiple campaigns', () => {
        createComponent(mockCampaigns);
        const $ = getComponentSelector();
        expect($('.campaign-list-item').length).toEqual(mockCampaigns.length);
    });

    it('should display no items found message if there are no campaigns', () => {
        createComponent([]);
        const $ = getComponentSelector();
        expect($('div').text()).toContain('No items found');
    });
});

const createComponent = (campaigns: ICampaign[]) => {
    act(() => {
        ReactDOM.render(<CampaignList campaigns={campaigns}></CampaignList>, container);
    });
};

const getComponentSelector = () => {
    const componentElement = container.querySelector('div');
    if (componentElement === null) {
        throw new Error('campaign-list-item not found');
    }

    return cheerio.load(componentElement.outerHTML);
};

