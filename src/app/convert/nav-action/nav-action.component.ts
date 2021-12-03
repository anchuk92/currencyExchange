import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {DEFAULT_CURRENCY} from "../../core/const";
import {ApiService} from "../services/api.service";
import {ConvertService} from "../services/convert.service";
import {Currency} from "../interfaces/currency";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-nav-action',
  templateUrl: './nav-action.component.html',
  styleUrls: ['./nav-action.component.css']
})
export class NavActionComponent implements OnInit {


  form: FormGroup = new FormGroup({
    from: new FormControl(DEFAULT_CURRENCY, Validators.required),
    to: new FormControl(''),
    date: new FormControl(null)
  })
  currencies!: Currency[]

  constructor(
    private apiService: ApiService,
    private convertService: ConvertService
  ) { }

  ngOnInit(): void {
    this.convertService.$currencies.subscribe(data => {
      this.currencies = []
      for (let k in data) {
        this.currencies.push({
          id: k})
      }
    })
    this.convertService.$listData.subscribe()
  }

  getData() {
    this.apiService.getLatest(1, this.form.value['to'],this.form.value['from']).subscribe(data => {
      this.convertService.$listData.next(data.rates)
    })
  }

  SelectDate() {
    const date = this.formattedDate(this.form.value['date'])
    this.apiService.getCurrenciesByDate(date).subscribe(data =>{
      this.convertService.$listData.next(data.rates)
    })
  }

  setDefault(): void {
    this.form.patchValue({
      from: DEFAULT_CURRENCY,
      to: '',
      date: null
    })
    this.apiService.getLatest().subscribe(data => {
      this.convertService.$listData.next(data.rates)
    })
  }

  formattedDate(date: Date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  }

}
