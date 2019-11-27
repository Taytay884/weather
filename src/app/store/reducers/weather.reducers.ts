import {initialWeatherState, IWeatherState} from '../state/weather.state';
import {EWeatherActions, WeatherActions} from '../actions/weather.actions';

export const weatherReducers = (state = initialWeatherState, action: WeatherActions): IWeatherState => {
  switch (action.type) {
    case EWeatherActions.GetCities: {
      return {
        ...state,
        citiesLoading: true
      };
    }
    case EWeatherActions.GetCitiesSuccess: {
      return {
        ...state,
        cities: action.payload,
        citiesLoading: false
      };
    }
    case EWeatherActions.GetCitiesFail: {
      return {
        ...state,
        cities: [],
        citiesLoading: false
      };
    }
    case EWeatherActions.GetSelectedCitySuccess: {
      return {
        ...state,
        selectedCity: action.payload
      };
    }
    case EWeatherActions.GetCurrentWeatherSuccess: {
      return {
        ...state,
        currentWeather: action.payload
      };
    }
    case EWeatherActions.GetForecastSuccess: {
      return {
        ...state,
        forecast: action.payload
      };
    }
    default:
      return state;
  }
};
