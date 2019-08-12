// Map of field validations
const fieldValidations = {
    'id': /^\d+$/,
    'name': /^.+$/,
    'startDate': /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
    'endDate': /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
    'Budget': /^\d+$/,
};
const fieldNames = Object.keys(fieldValidations);

// Steps for validations
const validationSteps: IValidationStep[] = [
    {
        name: 'Verify fields exist',
        validator: (campaign: IImportCampaign) => {
            const campaignFields = Object.keys(campaign).map(fieldName => fieldName.trim());
            return fieldNames.every((fieldName) => campaignFields.indexOf(fieldName) !== -1);
        }
    },
    {
        name: 'Verify no extra fields exist',
        validator: (campaign: IImportCampaign) => {
            return Object.keys(campaign).filter(campaignField => fieldNames.indexOf(campaignField.trim()) === -1).length === 0;
        }
    },
    {
        name: 'Verify data types match',
        validator: (campaign: IImportCampaign) => {
            const validationArray = Object.entries(fieldValidations);
            return validationArray.filter(([fieldName, fieldValidation]) => {
                const index = Object.keys(campaign).indexOf(fieldName);
                return !Object.values(campaign)[index].toString().match(fieldValidation);
            }).length === 0;
        }
    }
];

// Validator
const CampaignListValidator = (campaignList: IImportCampaign[]): boolean => {
    if(campaignList == null || campaignList.length === 0){
        throw new Error('The supplied dataset is empty.');
    }

    return validationSteps.filter((validationStep) => {
        const invalidLines = campaignList.filter(campaign => !validationStep.validator(campaign));
        if(invalidLines.length > 0) {
            throw new Error(`Validation failed at step: ${validationStep.name}, the following data is corrupt: ${JSON.stringify(invalidLines)}`);
        }

        return false;
    }).length === 0;
};

export default CampaignListValidator;

interface IValidationStep {
    name: string;
    validator: (campaign: IImportCampaign) => boolean;
}

// Important: We cannot assume correct data types or structure to be passed into the validator!
export interface IImportCampaign {
    id?: any;
    name?: any;
    startDate?: any;
    endDate?: any;
    Budget?: any;
    [key: string]: any;
}