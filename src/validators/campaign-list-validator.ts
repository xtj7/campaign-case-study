import {ICampaign} from "../interfaces/campaign";
const fieldValidations = {
    'id': /^\d+$/,
    'name': /^\w+$/,
    'startDate': /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
    'endDate': /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
    'Budget': /^\d+$/,
};
const fieldNames = Object.keys(fieldValidations);

const validationSteps: IValidationStep[] = [
    {
        name: 'Verify fields exist',
        validator: (campaign: ICampaign) => {
            const campaignFields = Object.keys(campaign).map(fieldName => fieldName.trim());
            return fieldNames.every((fieldName) => campaignFields.indexOf(fieldName) !== -1);
        }
    },
    {
        name: 'Verify no extra fields exist',
        validator: (campaign: ICampaign) => {
            return Object.keys(campaign).filter(campaignField => fieldNames.indexOf(campaignField.trim()) === -1).length === 0;
        }
    },
    {
        name: 'Verify data types match',
        validator: (campaign: ICampaign) => {
            const validationArray = Object.entries(fieldValidations);
            return validationArray.filter(([fieldName, fieldValidation]) => {
                const index = Object.keys(campaign).indexOf(fieldName);
                return !Object.values(campaign)[index].toString().match(fieldValidation);
            }).length === 0;
        }
    }
];

const CampaignListValidator = (campaignList: ICampaign[]): boolean => {
    if(campaignList == null || campaignList.length === 0){
        alert('The supplied dataset is empty.');
        return false;
    }

    return validationSteps.filter((validationStep) => {
        const invalidLines = campaignList.filter(campaign => !validationStep.validator(campaign));
        if(invalidLines.length > 0) {
            alert(`Validation failed at step: ${validationStep.name}, the following data is corrupt: ${JSON.stringify(invalidLines)}`);
            return true;
        }

        return false;
    }).length === 0;
};

export default CampaignListValidator;

interface IValidationStep {
    name: string;
    validator: (campaign: ICampaign) => boolean;
};