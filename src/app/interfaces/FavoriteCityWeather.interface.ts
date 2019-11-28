import {CityInterface} from './City.interface';
import {CurrentWeatherInterface} from './CurrentWeather.interface';

export interface FavoriteCityWeatherInterface {
  city: CityInterface;
  currentWeather: CurrentWeatherInterface;
}
