import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Currency} from "../../../core/interfaces/currency";
import {ConvertService} from "../../services/convert.service";
import {ListData} from "../../../core/interfaces/listData";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'value'];
  listData!: Currency[];

  constructor(
    private apiService: ApiService,
    private convertService: ConvertService
  ) { };

  ngOnInit(): void {

    this.convertService.$listData.subscribe(data =>{
      this.listData = [];
      for (let k in data){
            this.listData.push({
              id: k,
              value: data[k as keyof ListData]
            });
          }
    });
  };

}
