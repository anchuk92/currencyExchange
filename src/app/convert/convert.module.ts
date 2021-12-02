import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { RouterModule, Routes } from '@angular/router';

import { CurrencyListComponent } from './currency-list/currency-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavActionComponent } from './nav-action/nav-action.component';
import { ConvertCurrencyComponent } from './convert-currency/convert-currency.component';
import {MaterialModule} from "../shared/modules/material.module";


const routes: Routes = [{ path: '', component: DashboardComponent }];

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
    MaterialModule
  ],
  exports: [RouterModule],
})
export class ConvertModule { }
