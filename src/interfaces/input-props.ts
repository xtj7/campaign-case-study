export interface IInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (id: string, value: string) => void;
}
