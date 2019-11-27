import {Action} from '@ngrx/store';
import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';
import {ForecastInterface} from '../../interfaces/Forecast.interface';

export enum EWeatherActions {
  GetCities = '[Weather] Get Cities',
  GetCitiesSuccess = '[Weather] Get Cities Success',
  GetCitiesFail = '[Weather] Get Cities Fail',
  GetSelectedCity = '[Weather] Get Selected City',
  GetSelectedCitySuccess = '[Weather] Get Selected City Success',
  GetCurrentWeather = '[Weather] Get Current Weather',
  GetCurrentWeatherSuccess = '[Weather] Get Current Weather Success',
  GetForecast = '[Weather] Get Forecast',
  GetForecastSuccess = '[Weather] Get Forecast Success',
}

export class GetCities implements Action {
  public readonly type = EWeatherActions.GetCities;
  constructor(public payload: string) {}
}

export class GetCitiesSuccess implements Action {
  public readonly type = EWeatherActions.GetCitiesSuccess;
  constructor(public payload: CityInterface[]) {}
}

export class GetCitiesFail implements Action {
  public readonly type = EWeatherActions.GetCitiesFail;
}

export class GetSelectedCity implements Action {
  public readonly type = EWeatherActions.GetSelectedCity;
}

export class GetSelectedCitySuccess implements Action {
  public readonly type = EWeatherActions.GetSelectedCitySuccess;
  constructor(public payload: CityInterface) {}
}

export class GetCurrentWeather implements Action {
  public readonly type = EWeatherActions.GetCurrentWeather;
}

export class GetCurrentWeatherSuccess implements Action {
  public readonly type = EWeatherActions.GetCurrentWeatherSuccess;
  constructor(public payload: CurrentWeatherInterface) {}
}

export class GetForecast implements Action {
  public readonly type = EWeatherActions.GetForecast;
}

export class GetForecastSuccess implements Action {
  public readonly type = EWeatherActions.GetForecastSuccess;
  constructor(public payload: ForecastInterface) {}
}

export type WeatherActions = GetCities | GetCitiesSuccess | GetCitiesFail | GetSelectedCity | GetSelectedCitySuccess |
  GetCurrentWeather | GetCurrentWeatherSuccess | GetForecast | GetForecastSuccess;
