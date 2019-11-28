import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AccuweatherService} from '../../services/accuweather.service';
import {IAppState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {
  EWeatherActions,
  GetCities,
  GetCitiesFail,
  GetCitiesSuccess,
  GetCurrentWeatherFail,
  GetCurrentWeatherSuccess,
  GetForecastSuccess
} from '../actions/weather.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';
import {DailyForecastModel} from '../../models/DailyForecast.model';

@Injectable()
export class WeatherEffects {

  constructor(private weatherService: AccuweatherService, private _actions$: Actions, private _store: Store<IAppState>) {
  }

  @Effect()
  getCities$ = this._actions$.pipe(
    ofType<GetCities>(EWeatherActions.GetCities),
    switchMap((action) => this.weatherService.getLocationAutoComplete(action.payload)),
    switchMap((cities: CityInterface[]) => of(new GetCitiesSuccess(cities))),
    catchError(() => of(new GetCitiesFail()))
  );

  @Effect()
  getCurrentWeather$ = this._actions$.pipe(
    ofType<GetCities>(EWeatherActions.GetCurrentWeather),
    switchMap((action) => this.weatherService.getLocationCurrentWeather(action.payload)),
    switchMap((currentWeather: CurrentWeatherInterface) => of(new GetCurrentWeatherSuccess(currentWeather))),
    catchError(() => of(new GetCurrentWeatherFail()))
  );

  @Effect()
  getForecast$ = this._actions$.pipe(
    ofType<GetCities>(EWeatherActions.GetForecast),
    switchMap((action) => this.weatherService.getLocation5DaysForecast(action.payload)),
    switchMap((fiveDaysForecast: DailyForecastModel[]) => of(new GetForecastSuccess(fiveDaysForecast))),
    catchError(() => of(new GetCurrentWeatherFail()))
  );
}
