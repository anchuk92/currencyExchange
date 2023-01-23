import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatOptionSelectionChange } from "@angular/material/core";
import { DEFAULT_CURRENCY } from "../../../core/consts/const";
import { ApiService } from "../../services/api.service";
import { ConvertService } from "../../services/convert.service";
import { Currency } from "../../../core/interfaces/currency";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-nav-action',
  templateUrl: './nav-action.component.html',
  styleUrls: ['./nav-action.component.css']
})
export class NavActionComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({
    from: new FormControl(DEFAULT_CURRENCY, Validators.required),
    to: new FormControl(''),
    date: new FormControl(null)
  });
  public currencies!: Currency[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private convertService: ConvertService
  ) {};

  ngOnInit(): void {
    this.convertService.$currencies
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.currencies = [];
        for (let k in data) {
          this.currencies.push({id: k})
        }
      });
    this.convertService.$listData.subscribe();
  }

  getData(val: MatOptionSelectionChange, key: string) {
    if (val.isUserInput) {
      switch (key) {
        case 'from':
          this.apiService.getLatest(1, this.form.value['to'], val.source.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
              this.convertService.$listData.next(data.rates)
            })
          break;
        case 'to':
          this.apiService.getLatest(1, val.source.value, this.form.value['from'])
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
              this.convertService.$listData.next(data.rates)
            })
          break;
        default:
          break;
      }
    }
  }

  selectDate() {
    const from = this.form.value['from'];
    const to = this.form.value['to'];
    const date = this.formattedDate(this.form.value['date']);

    this.apiService.getCurrenciesByDate(date, from, to)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.convertService.$listData.next(data.rates)
      });
  }

  setDefault(): void {
    this.form.patchValue({
      from: DEFAULT_CURRENCY,
      to: '',
      date: null
    });
    this.apiService.getLatest()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.convertService.$listData.next(data.rates)
      });
  }

  formattedDate(date: Date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
