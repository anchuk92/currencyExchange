import { Component } from '@angular/core';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private apiService: ApiService) {
  };

  getCurrencies() {
    this.apiService.getCurrencies().subscribe(value => {
      console.log(value);
    });

  };

  getLatest() {
    this.apiService.getLatest('AUD').subscribe(value => {
      console.log(value);
    });
  };

  getCurrenciesByDate() {
    this.apiService.getCurrenciesByDate().subscribe(value => {
      console.log(value);
    });

  };
}
