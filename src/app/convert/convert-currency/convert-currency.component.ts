import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Currency} from "../interfaces/currency";
import {ApiService} from "../services/api.service";
import {ConvertService} from "../services/convert.service";
import {Latest} from "../interfaces/latest";

@Component({
  selector: 'app-convert-currency',
  templateUrl: './convert-currency.component.html',
  styleUrls: ['./convert-currency.component.css']
})
export class ConvertCurrencyComponent implements OnInit {

  form: FormGroup = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    amount: new FormControl('1', Validators.required)
  });
  currencies!: Currency[];
  answer!: Latest;
  resCur!: string;
  resAmount!: number;

  constructor(
    private apiService: ApiService,
    private convertService: ConvertService
  ) { };

  ngOnInit(): void {
    this.convertService.$currencies.subscribe( data => {
      this.currencies = [];
      for (let k in data){
        this.currencies.push({
          id: k});
      }
    });
  }
  getData() {
    this.apiService.getLatest(this.form.value['amount'], this.form.value['to'], this.form.value['from'])
      .subscribe(data => {
      this.answer =data;
      this.resCur = this.form.value['to'];
      this.resAmount = data.rates[this.resCur];
    })
  }

}
