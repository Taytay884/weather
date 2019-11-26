import {Component, Input} from '@angular/core';
import {DailyForecastModel} from '../../models/DailyForecast.model';

@Component({
  selector: 'app-weather-day-card',
  templateUrl: './weather-day-card.component.html',
  styleUrls: ['./weather-day-card.component.scss']
})
export class WeatherDayCardComponent {

  @Input() dailyForecast: DailyForecastModel;

  constructor() { }

}
