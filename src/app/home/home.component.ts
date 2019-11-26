import {Component, OnInit} from '@angular/core';
import {AccuweatherService} from '../services/accuweather.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {DailyForecastModel} from '../models/DailyForecast.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();
  selectedCity: CityInterface;
  cities$: Observable<CityInterface[]>;
  currentWeather$: Observable<CurrentWeatherInterface>;
  currentFiveDaysForecast$: Observable<DailyForecastModel[]>;

  constructor(private accuweatherService: AccuweatherService) {
    this.cities$ = this.accuweatherService.cities$;
    this.currentWeather$ = this.accuweatherService.currentWeather$;
    this.currentFiveDaysForecast$ = this.accuweatherService.fiveDaysForecast$;
  }

  ngOnInit() {
  }

  onSearchInput(searchText: string): void {
    this.accuweatherService.getLocationAutoComplete(searchText);
  }

  onCitySelected(city: CityInterface): void {
    this.selectedCity = city;
    this.accuweatherService.getLocationCurrentWeather(city.key);
    this.accuweatherService.getLocation5DaysForecast(city.key);
  }

}
