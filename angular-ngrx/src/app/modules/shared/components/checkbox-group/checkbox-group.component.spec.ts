import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxGroupComponent } from './checkbox-group.component';

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent;
  let fixture: ComponentFixture<CheckboxGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.changeEvent, 'emit').and.callThrough();
  });

  it('should update selected items array on item selection', () => {
    component.updateSelectedItems('A');
    expect(component.selectedItems).toContain('A');
    component.updateSelectedItems('A');
    expect(component.selectedItems).not.toContain('A');
    expect(component.changeEvent.emit).toHaveBeenCalledWith(component.selectedItems);
  });
});
