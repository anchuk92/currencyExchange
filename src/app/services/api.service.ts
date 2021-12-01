import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import { environment as env } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private http: HttpClient) {
  }
  curDefaultFrom = 'EUR';
  curDefaultTo = 'USD';
  curDefaultAmount = 1;
  date = new Date();

  $date: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  getCurrencies(): Observable<any>{
    return this.http.get<any>(`${env.apiURL}/currencies`)
  };
  getLatest(cur: string = this.curDefaultTo): Observable<any> {
    if (cur === '') {
      return this.http.get<any>(`${env.apiURL}/latest?amount=${this.curDefaultAmount}&from=${this.curDefaultFrom}`);
    } else {
      return this.http.get<any>(`${env.apiURL}/latest?amount=${this.curDefaultAmount}&from=${this.curDefaultFrom}&to=${cur}`);
    }
  };


  getCurrenciesByDate(){
    return this.http.get<any>(`${env.apiURL}/${this.date.getFullYear()}-${this.date.getMonth()}-0${this.date.getDay()}?from=${this.curDefaultFrom}`);
  }

}
