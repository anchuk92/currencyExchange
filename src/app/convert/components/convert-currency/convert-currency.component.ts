import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Currency } from "../../../core/interfaces/currency";
import { ApiService } from "../../services/api.service";
import { ConvertService } from "../../services/convert.service";
import { Latest } from "../../../core/interfaces/latest";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-convert-currency',
  templateUrl: './convert-currency.component.html',
  styleUrls: ['./convert-currency.component.css']
})
export class ConvertCurrencyComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    amount: new FormControl('1', Validators.required)
  });
  public currencies!: Currency[];
  public answer!: Latest;
  public resCur!: string;
  public resAmount!: number;
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
          this.currencies.push({ id: k })
        }
      });
  }

  getData() {
    this.apiService.getLatest(this.form.value['amount'], this.form.value['to'], this.form.value['from'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.answer = data;
        this.resCur = this.form.value['to'];
        this.resAmount = data.rates[this.resCur];
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
