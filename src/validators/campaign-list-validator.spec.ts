import CampaignListValidator, {IImportCampaign} from "./campaign-list-validator";

describe('campaign list validator', () => {
    it('valid campaign is testing positive', () => {
        expect(CampaignListValidator([givenValidCampaign()])).toEqual(true);
    });

    it('campaign with missing field is reported correctly', () => {
        expect(() => {
            CampaignListValidator([givenCampaignWithMissingField()])
        }).toThrow('Verify fields exist');
    });

    it('campaign with extra field is reported correctly', () => {
        expect(() => {
            CampaignListValidator([givenCampaignWithExtraField()])
        }).toThrow('Verify no extra fields exist');
    });

    describe('verify data type errors', () => {
        it('campaign with wrong id', () => {
            expect(() => {
                CampaignListValidator([givenCampaignWithInvalidId()])
            }).toThrow('Verify data types match');
        });

        it('campaign with wrong name', () => {
            expect(() => {
                CampaignListValidator([givenCampaignWithInvalidName()])
            }).toThrow('Verify data types match');
        });

        it('campaign with wrong startDate', () => {
            expect(() => {
                CampaignListValidator([givenCampaignWithInvalidStartDate()])
            }).toThrow('Verify data types match');
        });

        it('campaign with wrong endDate', () => {
            expect(() => {
                CampaignListValidator([givenCampaignWithInvalidEndDate()])
            }).toThrow('Verify data types match');
        });

        it('campaign with wrong Budget', () => {
            expect(() => {
                CampaignListValidator([givenCampaignWithInvalidBudget()])
            }).toThrow('Verify data types match');
        });
    });
});

const givenValidCampaign = (): IImportCampaign => {
    return {
        id: 25,
        name: 'dummy-campaign',
        startDate: '01/02/2019',
        endDate: '02/03/2019',
        Budget: 80000
    };
};

const givenCampaignWithMissingField = (): IImportCampaign => {
    return {
        id: 25,
        name: 'dummy-campaign',
        startDate: '01/02/2019',
        Budget: 80000
    };
};

const givenCampaignWithExtraField = (): IImportCampaign => {
    return {
        id: 25,
        name: 'dummy-campaign',
        startDate: '01/02/2019',
        endDate: '02/03/2019',
        Budget: 80000,
        extraField: 'error'
    };
};

const givenCampaignWithInvalidId = (): IImportCampaign => {
    return {
        id: 'xy',
        name: 'dummy-campaign',
        startDate: '01/02/2019',
        endDate: '02/03/2019',
        Budget: 80000
    };
};

const givenCampaignWithInvalidName = (): IImportCampaign => {
    return {
        id: 25,
        name: '',
        startDate: '01/02/2019',
        endDate: '02/03/2019',
        Budget: 80000
    };
};

const givenCampaignWithInvalidStartDate = (): IImportCampaign => {
    return {
        id: 25,
        name: 'dummy-campaign',
        startDate: '01/02/19',
        endDate: '02/03/2019',
        Budget: 80000
    };
};

const givenCampaignWithInvalidEndDate = (): IImportCampaign => {
    return {
        id: 25,
        name: 'dummy-campaign',
        startDate: '01/02/2019',
        endDate: 'XYZ',
        Budget: 80000
    };
};

const givenCampaignWithInvalidBudget = (): IImportCampaign => {
    return {
        id: 25,
        name: 'dummy-campaign',
        startDate: '01/02/2019',
        endDate: '02/03/2019',
        Budget: '80k'
    };
};

