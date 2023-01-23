import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Currency } from "../../../core/interfaces/currency";
import { ConvertService } from "../../services/convert.service";
import { ListData } from "../../../core/interfaces/listData";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['id', 'value'];
  public listData!: Currency[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private convertService: ConvertService
  ) {};

  ngOnInit(): void {
    this.convertService.$listData
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.listData = [];
        for (let k in data) {
          this.listData.push({
            id: k,
            value: data[k as keyof ListData]
          });
        }
      });
  };

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
