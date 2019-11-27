import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';
import {ForecastInterface} from '../../interfaces/Forecast.interface';

export interface IWeatherState {
  cities: CityInterface[];
  citiesLoading: boolean;
  selectedCity: CityInterface;
  currentWeather: CurrentWeatherInterface;
  forecast: ForecastInterface;
}

export const initialWeatherState: IWeatherState = {
  cities: [],
  citiesLoading: false,
  selectedCity: null,
  currentWeather: null,
  forecast: null
};

