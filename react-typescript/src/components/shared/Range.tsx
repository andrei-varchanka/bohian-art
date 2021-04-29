import React from "react";
import '../../styles/shared/range.scss'
import {TextField} from "@material-ui/core";

type RangeProps = {name?: string, value?: RangeModel, placeholder1?: string, placeholder2?: string, onValueChange?: Function};
type RangeState = {};
class Range extends React.Component<RangeProps, RangeState>{
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    onValue1Change(value: number | null) {
        if (value === 0) {
            value = null;
        }
        if (this.props.onValueChange) {
            this.props.onValueChange({value1: value, value2: this.props.value?.value2});
        }
    }

    onValue2Change(value: number | null) {
        if (value === 0) {
            value = null;
        }
        if (this.props.onValueChange) {
            this.props.onValueChange({value1: this.props.value?.value1, value2: value});
        }
    }

    render() {
        return (
            <div className="range">
                <div className="title">{this.props.name}</div>
                <div className="range-row">
                    <TextField
                        type="number"
                        defaultValue={this.props.value?.value1}
                        onChange={(event) => this.onValue1Change(+event.target.value)}
                        placeholder={this.props.placeholder1}
                        inputProps={{min: 0, max: 2147483647}}
                    />
                    <div className="separator">-</div>
                    <TextField
                        type="number"
                        defaultValue={this.props.value?.value2}
                        onChange={(event) => this.onValue2Change(+event.target.value)}
                        placeholder={this.props.placeholder2}
                        inputProps={{min: 0, max: 2147483647}}
                    />
                </div>
            </div>
        );
    }
}

export default Range;

export class RangeModel {
    value1?: number;
    value2?: number;
}
