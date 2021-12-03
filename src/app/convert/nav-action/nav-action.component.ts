import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {DEFAULT_CURRENCY} from "../../core/const";
import {ApiService} from "../services/api.service";
import {ConvertService} from "../services/convert.service";
import {Currency} from "../interfaces/currency";

@Component({
  selector: 'app-nav-action',
  templateUrl: './nav-action.component.html',
  styleUrls: ['./nav-action.component.css']
})
export class NavActionComponent implements OnInit {


  form: FormGroup = new FormGroup({
    from: new FormControl(DEFAULT_CURRENCY, Validators.required),
    to: new FormControl('', Validators.required),
    date: new FormControl(null, Validators.required)
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
          id: k
        })
      }
    })
    this.convertService.$listData.subscribe()
  }

  getData() {

  }

  setDefault(): void {
    console.log(this.form.value)
    this.form.reset();
    this.form.patchValue({
      from: DEFAULT_CURRENCY,
      to: '',
      date: null
    })
    console.log(this.form.value)
    this.apiService.getLatest().subscribe(data => {
      this.convertService.$listData.next(data.rates)
    })
  }

}
