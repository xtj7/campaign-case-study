import React, {ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";
import {IInputProps} from "../../interfaces/input-props";
import './date-input.scss';
import moment from 'moment';

const DateInput: React.FC<IInputProps> = ({id, label, value, onChange}) => {
    const handleChange = (e: ChangeEvent<any>) => {
        onChange(e.target.id, e.target.value);
    };

    return (
        <TextField id={id}
                   label={label}
                   type="date"
                   value={moment(value).format('YYYY-MM-DD')}
                   className="date-input"
                   onChange={handleChange}
                   InputLabelProps={{
                       shrink: true,
                   }}/>
    );
};

export default DateInput;
