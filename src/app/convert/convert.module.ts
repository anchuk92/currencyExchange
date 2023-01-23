import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavActionComponent } from './components/nav-action/nav-action.component';
import { ConvertCurrencyComponent } from './components/convert-currency/convert-currency.component';
import { MaterialModule } from "../shared/modules/material.module";


const routes: Routes = [{ path: '', component: DashboardComponent}];

@NgModule({
  declarations: [
    CurrencyListComponent,
    DashboardComponent,
    NavActionComponent,
    ConvertCurrencyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class ConvertModule {
}
