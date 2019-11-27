import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AccuweatherService} from '../../services/accuweather.service';
import {IAppState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {EWeatherActions, GetCities, GetCitiesFail, GetCitiesSuccess} from '../actions/weather.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CityInterface} from '../../interfaces/City.interface';

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
}
