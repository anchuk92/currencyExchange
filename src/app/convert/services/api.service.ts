import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import { environment as env } from "src/environments/environment";
import {Currencies} from "../interfaces/currencies";
import {Latest} from "../interfaces/latest";
import {CurrencyByDay} from "../interfaces/currencyByDay";
import { DEFAULT_CURRENCY } from "src/app/core/const";


@Injectable({
  providedIn: 'root'
})
export class ApiService{

  date = new Date();

  constructor(private http: HttpClient) {
  }

  getCurrencies(): Observable<Currencies>{
    return this.http.get<Currencies>(`${env.apiURL}/currencies`)
  };

  getLatest(amount: number, currency?: string, ): Observable<any> {
    if (currency) {
      return this.http.get<any>(`${env.apiURL}/latest?amount=${amount}&from=${DEFAULT_CURRENCY}&to=${currency}`);
    } else {
      return this.http.get<any>(`${env.apiURL}/latest?from=${DEFAULT_CURRENCY}`);
    }
  };

  getCurrenciesByDate(): Observable<CurrencyByDay>{
    return this.http.get<CurrencyByDay>(`${env.apiURL}/${this.date.getFullYear()}-${this.date.getMonth()}-0${this.date.getDay()}?from=${DEFAULT_CURRENCY}`);
  }

}
