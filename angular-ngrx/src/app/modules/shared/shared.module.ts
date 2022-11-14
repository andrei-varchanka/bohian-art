import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth-guard';
import { CheckboxGroupComponent } from './components/checkbox-group/checkbox-group.component';
import { RangeComponent } from './components/range/range.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from 'src/app/imports/material-modules';



@NgModule({
  declarations: [
    CheckboxGroupComponent,
    RangeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    CheckboxGroupComponent,
    RangeComponent
  ],
  providers: [AuthGuard]
})
export class SharedModule { }
