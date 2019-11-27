import {IAppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {IWeatherState} from '../state/weather.state';

const selectWeather = (state: IAppState) => state.weather;

export const selectCities = createSelector(
  selectWeather,
  (state: IWeatherState) => state.cities
);

export const selectCitiesLoading = createSelector(
  selectWeather,
  (state: IWeatherState) => state.citiesLoading
);
