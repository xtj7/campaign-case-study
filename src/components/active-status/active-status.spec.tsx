import React from 'react';
import ActiveStatus from "./active-status";
import moment from "moment";
import {act} from "react-dom/test-utils";
import ReactDOM from 'react-dom';
import cheerio from 'cheerio';

let container: HTMLDivElement;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
});

describe('ActiveStatus component', () => {
    it('should have an active state', () => {
        createActiveComponent();
        const $ = getComponentSelector();
        expect($('button').text()).toBe('Active');
    });

    it('should have an inactive state for date in the future', () => {
        createInactiveFutureComponent();
        const $ = getComponentSelector();
        expect($('button').text()).toBe('Inactive');
    });

    it('should have an inactive state for date in the past', () => {
        createInactivePastComponent();
        const $ = getComponentSelector();
        expect($('button').text()).toBe('Inactive');
    });

    it('should have an active icon for active state', () => {
        createActiveComponent();
        const $ = getComponentSelector();

        expect($('.active-status__icon--active').length).toEqual(1);
    });

    it('should have an inactive state for date in the future', () => {
        createInactiveFutureComponent();
        const $ = getComponentSelector();
        expect($('.active-status__icon--inactive').length).toEqual(1);
    });
});

const createComponent = (startDate: Date, endDate: Date) => {
    act(() => {
        ReactDOM.render(<ActiveStatus startDate={startDate} endDate={endDate}/>, container);
    });
};

const getComponentSelector = () => {
    return cheerio.load(container.getElementsByTagName('button')[0].outerHTML);
};

const createActiveComponent = () => {
    const startDate = moment().subtract(1, 'days').toDate();
    const endDate = moment().add(1, 'days').toDate();
    createComponent(startDate, endDate);
};

const createInactivePastComponent = () => {
    const startDate = moment().subtract(2, 'days').toDate();
    const endDate = moment().subtract(1, 'days').toDate();
    createComponent(startDate, endDate);
};

const createInactiveFutureComponent = () => {
    const startDate = moment().add(1, 'days').toDate();
    const endDate = moment().add(2, 'days').toDate();
    createComponent(startDate, endDate);
};