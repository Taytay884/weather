import {Component, Input} from '@angular/core';
import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';
import {DEGREE_TYPE} from '../../enum/degreeType.enum';

@Component({
  selector: 'app-weather-city-card',
  templateUrl: './weather-city-card.component.html',
  styleUrls: ['./weather-city-card.component.scss']
})
export class WeatherCityCardComponent {

  @Input() city: CityInterface;
  @Input() weather: CurrentWeatherInterface;
  @Input() degreeType: DEGREE_TYPE;
  DEGREE_TYPES = DEGREE_TYPE;

}
