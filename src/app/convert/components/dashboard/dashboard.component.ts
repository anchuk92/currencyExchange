import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ConvertService} from "../../services/convert.service";

@Component({
  selector: 'app-container',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private convertService: ConvertService
  ) { };

  ngOnInit(): void {
    this.apiService.getCurrencies().subscribe(currencies => {
      this.convertService.$currencies.next(currencies)
    });
    this.apiService.getLatest().subscribe(data => {
      this.convertService.$listData.next(data.rates)
    });
  };

}
