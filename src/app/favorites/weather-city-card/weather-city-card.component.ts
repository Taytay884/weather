import {Component, Input, OnInit} from '@angular/core';
import {CityInterface} from '../../interfaces/City.interface';
import {CurrentWeatherInterface} from '../../interfaces/CurrentWeather.interface';

@Component({
  selector: 'app-weather-city-card',
  templateUrl: './weather-city-card.component.html',
  styleUrls: ['./weather-city-card.component.scss']
})
export class WeatherCityCardComponent implements OnInit {

  @Input() city: CityInterface;
  @Input() weather: CurrentWeatherInterface;
  constructor() { }

  ngOnInit() {
  }

}
