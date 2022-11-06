import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export class RangeModel {
  value1?: number;
  value2?: number;
}

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  placeholder1: string;

  @Input()
  placeholder2: string;

  @Input()
  value: RangeModel = {};

  @Output()
  changeEvent = new EventEmitter<RangeModel>();

  constructor() {
  }

  ngOnInit() {
  }

  onChange() {
    this.changeEvent.emit(this.value);
  }

}
