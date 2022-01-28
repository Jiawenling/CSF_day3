import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioButton, MatRadioModule} from "@angular/material/radio";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";

const MATERIAL = [ MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatListModule, MatDatepickerModule, MatRadioModule, MatToolbarModule, MatDividerModule]



@NgModule({
  declarations: [],
  imports: [
    MATERIAL
  ],
  exports: [
    MATERIAL
  ]
})
export class MaterialModule { }
