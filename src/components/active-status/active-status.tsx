import React from 'react';
import {PauseCircleFilled, PlayCircleFilled} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import './active-status.scss';

class ActiveStatus extends React.Component<IPropsActiveStatus> {
    public state = {
        isActive: false
    };

    constructor(props: IPropsActiveStatus) {
        super(props);

        const now = new Date();
        this.state.isActive = props.startDate <= now && props.endDate >= now;
    }

    render() {
        return (
            <Button variant="text" disabled={!this.state.isActive} className="active-status__button">
                {this.state.isActive ? this.IconActiveStatus() : this.IconInactiveStatus()}
                <span>{this.state.isActive ? 'Active' : 'Inactive'}</span>
            </Button>
        );
    }

    private IconActiveStatus() {
        return <PlayCircleFilled className="active-status__icon active-status__icon--active"/>;
    }

    private IconInactiveStatus() {
        return <PauseCircleFilled className="active-status__icon active-status__icon--inactive"/>;
    }
}

export default ActiveStatus;

export interface IPropsActiveStatus {
    startDate: Date,
    endDate: Date,
}