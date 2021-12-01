import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  currencies: any

  ngOnInit(): void {
    this.apiService.getCurrencies().subscribe(value => {
      this.currencies = value;
    })
  }

}
