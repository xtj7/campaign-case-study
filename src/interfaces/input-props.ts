import * as React from "react";

export interface IInputProps {
    id: string;
    label: string;
    defaultValue: string;
    onChange: (id: string, value: string) => void;
}