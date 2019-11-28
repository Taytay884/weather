import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';
import {DailyForecastModel} from '../../models/DailyForecast.model';
import {FavoriteCityWeatherInterface} from '../../interfaces/FavoriteCityWeather.interface';

export interface IWeatherState {
  cities: CityInterface[];
  citiesLoading: boolean;
  selectedCity: CityInterface;
  currentWeather: CurrentWeatherInterface;
  currentWeatherLoading: boolean;
  forecast: DailyForecastModel[];
  forecastLoading: boolean;
  favoriteCities: FavoriteCityWeatherInterface[];
}

export const initialWeatherState: IWeatherState = {
  cities: [],
  citiesLoading: false,
  selectedCity: null,
  currentWeather: null,
  currentWeatherLoading: false,
  forecast: null,
  forecastLoading: false,
  favoriteCities: [],
};

