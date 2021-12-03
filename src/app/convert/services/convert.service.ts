import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Subject} from "rxjs";
import {Currencies} from "../interfaces/currencies";
import { ListData } from "../interfaces/listData";

@Injectable({
  providedIn: 'root'
})
export class ConvertService{

  $currencies: Subject<Currencies> = new Subject<Currencies>();
  $listData: Subject<ListData> = new Subject<ListData>();

  constructor(private apiService: ApiService) {
  };



}
