import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';
import {DailyForecastModel} from '../../models/DailyForecast.model';
import {FavoriteCityWeatherInterface} from '../../interfaces/FavoriteCityWeather.interface';
import {THEMES} from '../../const/themes.const';

export interface IWeatherState {
  theme: string;
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
  theme: THEMES.LIGHT,
  cities: [{name: 'Tel Aviv', key: '215854'}],
  citiesLoading: false,
  selectedCity: null,
  currentWeather: null,
  currentWeatherLoading: false,
  forecast: null,
  forecastLoading: false,
  favoriteCities: [],
};

