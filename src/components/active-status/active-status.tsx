import React from 'react';
import {PauseCircleFilled, PlayCircleFilled} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import './active-status.scss';

const ActiveStatus: React.FC<IPropsActiveStatus> = ({startDate, endDate}) => {
    const now = new Date();
    const isActive = startDate <= now && endDate >= now;

    return (
        <Button variant="text" disabled={!isActive} className="active-status__button">
            {isActive ? IconActiveStatus() : IconInactiveStatus()}
            {isActive ? 'Active' : 'Inactive'}
        </Button>
    );
};

const IconActiveStatus = () => {
    return <PlayCircleFilled className="active-status__icon active-status__icon--active"/>;
};

const IconInactiveStatus = () => {
    return <PauseCircleFilled className="active-status__icon active-status__icon--inactive"/>;
};

export default ActiveStatus;

export interface IPropsActiveStatus {
    startDate: Date,
    endDate: Date
}