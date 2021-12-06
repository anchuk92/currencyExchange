import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { environment as env } from "src/environments/environment";
import {Currencies} from "../interfaces/currencies";
import {CurrencyByDay} from "../interfaces/currencyByDay";
import { DEFAULT_CURRENCY } from "src/app/core/const";


@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private http: HttpClient) {
  };

  getCurrencies(): Observable<Currencies>{
    return this.http.get<Currencies>(`${env.apiURL}/currencies`)
  };

  getLatest(amount?: number, currencyTo?: string, currencyFrom?: string): Observable<any> {
    if (amount && currencyTo && currencyFrom) {
      return this.http.get<any>(`${env.apiURL}/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`);
    } if (amount && currencyTo) {
      return this.http.get<any>(`${env.apiURL}/latest?amount=${amount}&from=${DEFAULT_CURRENCY}&to=${currencyTo}`);
    }
    else {
      return this.http.get<any>(`${env.apiURL}/latest?from=${DEFAULT_CURRENCY}`);
    }
  };

  getCurrenciesByDate(date: string, currencyFrom?: string, currencyTo?: string, ): Observable<CurrencyByDay>{
    if (currencyTo && currencyFrom) {
      return this.http.get<any>(`${env.apiURL}/${date}?from=${currencyFrom}&to=${currencyTo}`);
    }
    else {
      return this.http.get<CurrencyByDay>(`${env.apiURL}/${date}?from=${DEFAULT_CURRENCY}`);
    }
  };

}
