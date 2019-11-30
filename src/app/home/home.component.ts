import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccuweatherService} from '../services/accuweather.service';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {DailyForecastModel} from '../models/DailyForecast.model';
import {CityInterface} from '../interfaces/City.interface';
import {CurrentWeatherInterface} from '../interfaces/CurrentWeather.interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../store/state/app.state';
import {
  AddToFavorites,
  GetCities,
  GetCurrentWeather,
  GetForecast,
  RemoveFromFavorites,
  SetSelectedCity
} from '../store/actions/weather.actions';
import {
  selectCities,
  selectCitiesLoading,
  selectCurrentWeather,
  selectCurrentWeatherLoading, selectDegreeType, selectFavoriteCities, selectForecast, selectForecastLoading,
  selectSelectedCity
} from '../store/selectors/weather.selectors';
import {FavoriteCityWeatherInterface} from '../interfaces/FavoriteCityWeather.interface';
import {DEGREE_TYPE} from '../enum/degreeType.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  degreeType: DEGREE_TYPE;
  DEGREE_TYPES = DEGREE_TYPE;
  degreeTypeSubscription: Subscription;
  defaultCity: CityInterface = {name: 'Tel Aviv', key: '215854'};
  searchControl = new FormControl();
  selectedCity: CityInterface;
  selectedCitySubscription: Subscription;
  favoriteCities: FavoriteCityWeatherInterface[];
  favoriteCitiesSubscription: Subscription;
  cities$: Observable<CityInterface[]> = this.store.pipe(select(selectCities));
  citiesLoading$: Observable<boolean> = this.store.pipe(select(selectCitiesLoading));
  currentWeather$: Observable<CurrentWeatherInterface> = this.store.pipe(select(selectCurrentWeather));
  currentWeatherLoading$: Observable<boolean> = this.store.pipe(select(selectCurrentWeatherLoading));
  currentFiveDaysForecast$: Observable<DailyForecastModel[]> = this.store.pipe(select(selectForecast));
  currentFiveDaysForecastLoading$: Observable<boolean> = this.store.pipe(select(selectForecastLoading));

  constructor(private accuweatherService: AccuweatherService, private store: Store<IAppState>) {
    this.selectedCitySubscription = this.store.pipe(select(selectSelectedCity)).subscribe(
      (city: CityInterface) => {
        this.selectedCity = city;
      });
    this.favoriteCitiesSubscription = this.store.pipe(select(selectFavoriteCities)).subscribe(
      (favoriteCities: FavoriteCityWeatherInterface[]) => {
        this.favoriteCities = favoriteCities;
      });
    this.degreeTypeSubscription = this.store.select(selectDegreeType).subscribe((degreeType) => {
      this.degreeType = degreeType;
      // We need to send an API Request to get the other degreeType.
      if (this.selectedCity) {
        this.store.dispatch(new GetForecast({cityKey: this.selectedCity.key, degreeType: this.degreeType}));
      }
    });
  }

  ngOnInit(): void {
    if (!this.selectedCity) {
      this.onCitySelected(this.defaultCity.name);
    }
    this.searchControl.setValue(this.selectedCity.name);
  }

  onSearchInput(searchText: string): void {
    this.store.dispatch(new GetCities(searchText));
  }

  onCitySelected(cityName: string): void {
    const subscription = this.cities$.subscribe((cities: CityInterface[]) => {
      const selectedCity = cities.find((city: CityInterface) => cityName === city.name);
      this.store.dispatch(new SetSelectedCity(selectedCity));
      this.store.dispatch(new GetCurrentWeather(selectedCity.key));
      this.store.dispatch(new GetForecast({cityKey: selectedCity.key, degreeType: this.degreeType}));
    });
    subscription.unsubscribe();
  }

  onAddToFavoritesClicked(): void {
    this.currentWeather$.subscribe((currentWeather) => {
      this.store.dispatch(new AddToFavorites({city: this.selectedCity, currentWeather}));
    });
  }

  onRemoveFromFavoritesClicked(): void {
    const favoriteCityIndex = this.favoriteCities.findIndex((favoriteCity) => favoriteCity.city.key === this.selectedCity.key);
    this.store.dispatch(new RemoveFromFavorites(favoriteCityIndex));
  }

  checkIsSelectedCityFavorite(): boolean {
    if (!this.favoriteCities || !this.selectedCity) {
      return false;
    }
    return !!this.favoriteCities.find((favoriteCity) => favoriteCity.city.key === this.selectedCity.key);
  }

  ngOnDestroy() {
    this.selectedCitySubscription.unsubscribe();
    this.favoriteCitiesSubscription.unsubscribe();
    this.degreeTypeSubscription.unsubscribe();
  }

}
