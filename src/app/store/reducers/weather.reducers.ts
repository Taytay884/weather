import {initialWeatherState, IWeatherState} from '../state/weather.state';
import {EWeatherActions, WeatherActions} from '../actions/weather.actions';
import {DEGREE_TYPE} from '../../enum/degreeType.enum';

export const weatherReducers = (state = initialWeatherState, action: WeatherActions): IWeatherState => {
  switch (action.type) {
    case EWeatherActions.SetTheme: {
      return {
        ...state,
        theme: action.payload
      };
    }
    case EWeatherActions.SwitchDegreeType: {
      return {
        ...state,
        degreeType: state.degreeType === DEGREE_TYPE.Celsius ? DEGREE_TYPE.Fahrenheit : DEGREE_TYPE.Celsius
      };
    }
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
    case EWeatherActions.SetSelectedCity: {
      return {
        ...state,
        selectedCity: action.payload
      };
    }
    case EWeatherActions.GetCurrentWeather: {
      return {
        ...state,
        currentWeatherLoading: true
      };
    }
    case EWeatherActions.GetCurrentWeatherSuccess: {
      return {
        ...state,
        currentWeather: action.payload,
        currentWeatherLoading: false
      };
    }
    case EWeatherActions.GetCurrentWeatherFail: {
      return {
        ...state,
        currentWeather: null,
        currentWeatherLoading: false
      };
    }
    case EWeatherActions.GetForecast: {
      return {
        ...state,
        forecastLoading: true
      };
    }
    case EWeatherActions.GetForecastSuccess: {
      return {
        ...state,
        forecast: action.payload,
        forecastLoading: false
      };
    }
    case EWeatherActions.GetForecastFail: {
      return {
        ...state,
        forecast: null,
        forecastLoading: false
      };
    }
    case EWeatherActions.AddToFavorites: {
      return {
        ...state,
        favoriteCities: [...state.favoriteCities, action.payload]
      };
    }
    case EWeatherActions.RemoveFromFavorites: {
      return {
        ...state,
        favoriteCities: state.favoriteCities.filter((favoriteCity, index) => action.payload !== index)
      };
    }
    default:
      return state;
  }
};
