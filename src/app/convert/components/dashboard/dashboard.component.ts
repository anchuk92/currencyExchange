import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ConvertService} from "../../services/convert.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-container',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private apiService: ApiService,
    private convertService: ConvertService
  ) { };

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.apiService.getCurrencies()
      .pipe(takeUntil(this.destroy$))
      .subscribe(currencies => {
      this.convertService.$currencies.next(currencies)
    });
    this.apiService.getLatest()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
      this.convertService.$listData.next(data.rates)
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  };

}
