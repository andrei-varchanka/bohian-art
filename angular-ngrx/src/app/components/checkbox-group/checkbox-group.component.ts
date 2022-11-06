import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent implements OnInit {

  @Input()
  items: string[];

  @Input()
  selectedItems: string[] = [];

  @Input()
  vertical: boolean;

  @Output()
  changeEvent = new EventEmitter<string[]>();

  constructor() {
  }

  ngOnInit() {
  }

  updateSelectedItems(item: string) {
    if (!this.selectedItems.find(selectedItem => selectedItem === item)) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    }
    this.changeEvent.emit(this.selectedItems);
  }
}
