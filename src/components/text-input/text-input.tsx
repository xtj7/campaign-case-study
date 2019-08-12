import React, {ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";
import {IInputProps} from "../../interfaces/input-props";
import './text-input.scss';

const TextInput: React.FC<IInputProps> = ({id, label, defaultValue, onChange}) => {
    const handleChange = (e: ChangeEvent<any>) => {
        onChange(e.target.id, e.target.value);
    };

    return (
        <TextField id={id}
                   label={label}
                   type="text"
                   defaultValue={defaultValue}
                   className="text-input"
                   onChange={handleChange}/>
    );
};

export default TextInput;

