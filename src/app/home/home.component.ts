import {Component, OnInit} from '@angular/core';
import {AccuweatherService} from '../services/accuweather.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {DailyForecastModel} from '../models/DailyForecast.model';
import {CityInterface} from '../interfaces/City.interface';
import {CurrentWeatherInterface} from '../interfaces/CurrentWeather.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../store/state/app.state';
import {GetCities} from '../store/actions/weather.actions';
import {selectCities, selectCitiesLoading} from '../store/selectors/weather.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();
  selectedCity: CityInterface;
  cities$: Observable<CityInterface[]> = this._store.pipe(select(selectCities));
  citiesLoading$: Observable<boolean> = this._store.pipe(select(selectCitiesLoading));
  currentWeather$: Observable<CurrentWeatherInterface>;
  currentFiveDaysForecast$: Observable<DailyForecastModel[]>;

  constructor(private accuweatherService: AccuweatherService, private _store: Store<IAppState>) {
    // this.cities$ = this.accuweatherService.cities$;
    this.currentWeather$ = this.accuweatherService.currentWeather$;
    this.currentFiveDaysForecast$ = this.accuweatherService.fiveDaysForecast$;
  }

  ngOnInit() {
  }

  onSearchInput(searchText: string): void {
    this._store.dispatch(new GetCities(searchText));
    // this.accuweatherService.getLocationAutoComplete(searchText);
  }

  onCitySelected(city: CityInterface): void {
    this.selectedCity = city;
    this.accuweatherService.getLocationCurrentWeather(city.key);
    this.accuweatherService.getLocation5DaysForecast(city.key);
  }

}
