export interface Delta {
  cases: number;
  deaths: number;
  recovered: number;
}

export interface RValue4Days {
  value: number;
  date: Date;
}

export interface RValue7Days {
  value: number;
  date: Date;
}

export interface R {
  value: number;
  rValue4Days: RValue4Days;
  rValue7Days: RValue7Days;
  lastUpdate: Date;
}

export interface Hospitalization {
  cases7Days: number;
  incidence7Days: number;
  date: Date;
  lastUpdate: Date;
}

export interface Meta {
  source: string;
  contact: string;
  info: string;
  lastUpdate: Date;
  lastCheckedForUpdate: Date;
}

export interface CovidDataAll {
  cases: number;
  deaths: number;
  recovered: number;
  weekIncidence: number;
  casesPer100k: number;
  casesPerWeek: number;
  delta: Delta;
  r: R;
  hospitalization: Hospitalization;
  meta: Meta;
}

export interface Delta {
  cases: number;
  deaths: number;
  recovered: number;
}

export interface Hospitalization {
  cases7Days: number;
  incidence7Days: number;
  date: Date;
  lastUpdate: Date;
}

export interface SN {
  id: number;
  name: string;
  population: number;
  cases: number;
  deaths: number;
  casesPerWeek: number;
  deathsPerWeek: number;
  recovered: number;
  abbreviation: string;
  weekIncidence: number;
  casesPer100k: number;
  delta: Delta;
  hospitalization: Hospitalization;
}

export interface DataSN {
  SN: SN;
}

export interface MetaSN {
  source: string;
  contact: string;
  info: string;
  lastUpdate: Date;
  lastCheckedForUpdate: Date;
}

export interface CovidDataSaxony {
  data: DataSN;
  meta: MetaSN;
}

export interface GermanyDataSevenDays {
  cases: number;
  date: string; // date
}

export interface GermanyMetaSevenDays {
  source: string;
  contact: string;
  info: string;
  lastUpdate: Date;
  lastCheckedForUpdate: Date;
}

export interface CovidGermanySevenDays {
  data: GermanyDataSevenDays[];
  meta: GermanyMetaSevenDays;
}

export interface CovidSaxonySevenDaysHistory {
  cases: number;
  date: Date;
}

export interface CovidSaxonySevenDaysSN {
  id: number;
  name: string;
  history: CovidSaxonySevenDaysHistory[];
}

export interface CovidSaxonySevenDaysData {
  SN: CovidSaxonySevenDaysSN;
}

export interface CovidSaxonySevenDaysMeta {
  source: string;
  contact: string;
  info: string;
  lastUpdate: Date;
  lastCheckedForUpdate: Date;
}

export interface CovidSaxonySevenDays {
  data: CovidSaxonySevenDaysData;
  meta: CovidSaxonySevenDaysMeta;
}

export interface LeipzigHistory {
  cases: number;
  date: Date;
}

export interface City {
  history: LeipzigHistory[];
}

export interface LeipzigData {
  '14713': City;
}

export interface Leipzig {
  data: LeipzigData;
}


