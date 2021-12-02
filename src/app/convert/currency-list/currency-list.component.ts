import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {Currency} from "../interfaces/currency";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  curDefaultAmount = 1;
  displayedColumns: string[] = ['id', 'value'];
  currencies!: Currency[]

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getLatest(this.curDefaultAmount).subscribe(latestCurrencies => {
      this.currencies = []
      for (let k in latestCurrencies.rates){
        this.currencies.push({
          id: k,
          value: latestCurrencies.rates[k]})
      }
    })
  }

}
