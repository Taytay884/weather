import {IAppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {IWeatherState} from '../state/weather.state';


const selectWeather = (state: IAppState) => state.weather;

export const selectTheme = createSelector(
  selectWeather,
  (state: IWeatherState) => state.theme
);

export const selectCities = createSelector(
  selectWeather,
  (state: IWeatherState) => state.cities
);

export const selectCitiesLoading = createSelector(
  selectWeather,
  (state: IWeatherState) => state.citiesLoading
);

export const selectSelectedCity = createSelector(
  selectWeather,
  (state: IWeatherState) => state.selectedCity
);

export const selectCurrentWeather = createSelector(
  selectWeather,
  (state: IWeatherState) => state.currentWeather
);

export const selectCurrentWeatherLoading = createSelector(
  selectWeather,
  (state: IWeatherState) => state.currentWeatherLoading
);

export const selectForecast = createSelector(
  selectWeather,
  (state: IWeatherState) => state.forecast
);

export const selectForecastLoading = createSelector(
  selectWeather,
  (state: IWeatherState) => state.forecastLoading
);

export const selectFavoriteCities = createSelector(
  selectWeather,
  (state: IWeatherState) => state.favoriteCities
);

