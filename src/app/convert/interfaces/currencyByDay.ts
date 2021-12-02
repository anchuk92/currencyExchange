import {Currencies} from "./currencies";

export interface CurrencyByDay{
  amount: number
  base: string
  date: string
  rates: {}
}
