import React from "react";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import '../../styles/shared/checkbox-group.scss'

type CheckboxGroupProps = {items: any[], value?: string[], vertical?: boolean, onSelectedItemsChange?: Function};
type CheckboxGroupState = {};
class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
    items: any[];

    selectedItems: string[] = [];

    constructor(props: any) {
        super(props);
        this.state = {};
        this.items = props.items;
        this.selectedItems = props.value;
    }

    updateSelectedItems(item: string) {
        if (!this.selectedItems.find(selectedItem => selectedItem === item)) {
            this.selectedItems.push(item);
        } else {
            this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
        }
        if (this.props.onSelectedItemsChange) {
            this.props.onSelectedItemsChange(this.selectedItems);
        }
    }

    render() {
        return (
            <FormGroup row className={'checkbox-group' + (this.props.vertical ? ' vertical' : '')}>
                {this.items.map(item => {
                    return (
                        <FormControlLabel key={item}
                            control={
                                <Checkbox
                                    checked={this.selectedItems.indexOf(item) !== -1}
                                    onChange={() => {this.updateSelectedItems(item)}}
                                />
                            }
                            label={item}
                        />
                    );
                })}
            </FormGroup>
        );
    }
}

export default CheckboxGroup;
