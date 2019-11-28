import {Action} from '@ngrx/store';
import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';
import {DailyForecastModel} from '../../models/DailyForecast.model';
import {FavoriteCityWeatherInterface} from '../../interfaces/FavoriteCityWeather.interface';

export enum EWeatherActions {
  GetCities = '[Weather] Get Cities',
  GetCitiesSuccess = '[Weather] Get Cities Success',
  GetCitiesFail = '[Weather] Get Cities Fail',
  SetSelectedCity = '[Weather] Set Selected City',
  GetCurrentWeather = '[Weather] Get Current Weather',
  GetCurrentWeatherSuccess = '[Weather] Get Current Weather Success',
  GetCurrentWeatherFail = '[Weather] Get Current Weather Fail',
  GetForecast = '[Weather] Get Forecast',
  GetForecastSuccess = '[Weather] Get Forecast Success',
  GetForecastFail = '[Weather] Get Forecast Fail',
  AddToFavorites = '[Weather] Add To Favorites',
  RemoveFromFavorites = '[Weather] Remove From Favorites',
}

export class GetCities implements Action {
  public readonly type = EWeatherActions.GetCities;

  constructor(public payload: string) {
  }
}

export class GetCitiesSuccess implements Action {
  public readonly type = EWeatherActions.GetCitiesSuccess;

  constructor(public payload: CityInterface[]) {
  }
}

export class GetCitiesFail implements Action {
  public readonly type = EWeatherActions.GetCitiesFail;
}

export class SetSelectedCity implements Action {
  public readonly type = EWeatherActions.SetSelectedCity;

  constructor(public payload: CityInterface) {
  }
}

export class GetCurrentWeather implements Action {
  public readonly type = EWeatherActions.GetCurrentWeather;

  constructor(public payload: string) {
  }
}

export class GetCurrentWeatherSuccess implements Action {
  public readonly type = EWeatherActions.GetCurrentWeatherSuccess;

  constructor(public payload: CurrentWeatherInterface) {
  }
}

export class GetCurrentWeatherFail implements Action {
  public readonly type = EWeatherActions.GetCurrentWeatherFail;
}

export class GetForecast implements Action {
  public readonly type = EWeatherActions.GetForecast;

  constructor(public payload: string) {
  }
}

export class GetForecastSuccess implements Action {
  public readonly type = EWeatherActions.GetForecastSuccess;

  constructor(public payload: DailyForecastModel[]) {
  }
}

export class GetForecastFail implements Action {
  public readonly type = EWeatherActions.GetForecastFail;
}

export class AddToFavorites implements Action {
  public readonly type = EWeatherActions.AddToFavorites;

  constructor(public payload: FavoriteCityWeatherInterface) {}
}

export class RemoveFromFavorites implements Action {
  public readonly type = EWeatherActions.RemoveFromFavorites;

  constructor(public payload: number) {}
}

export type WeatherActions =
  GetCities
  | GetCitiesSuccess
  | GetCitiesFail
  | SetSelectedCity
  | GetCurrentWeather
  | GetCurrentWeatherSuccess
  | GetCurrentWeatherFail
  | GetForecast
  | GetForecastSuccess
  | GetForecastFail
  | AddToFavorites
  | RemoveFromFavorites;
