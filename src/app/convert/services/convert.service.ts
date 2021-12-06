import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Currencies} from "../../core/interfaces/currencies";
import {ListData} from "../../core/interfaces/listData";

@Injectable({
  providedIn: 'root'
})
export class ConvertService{

  $currencies: Subject<Currencies> = new Subject<Currencies>();
  $listData: Subject<ListData> = new Subject<ListData>();

  constructor() { };



}
