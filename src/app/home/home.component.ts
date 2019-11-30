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
import {FavoriteCitiesLocalStorageService} from '../services/favorite-cities-local-storage.service';

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

  constructor(private accuweatherService: AccuweatherService, private store: Store<IAppState>, private favCitiesLocalStorageService: FavoriteCitiesLocalStorageService) {
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
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const subscription = this.accuweatherService.getCityByPosition(position.coords.latitude, position.coords.longitude).subscribe((city) => {
            this.onCitySelected(city.name, city.key);
            this.searchControl.setValue(this.selectedCity.name);
            subscription.unsubscribe();
          });
        });
      } else {
        this.onCitySelected(this.defaultCity.name);
      }
    } else {
      this.searchControl.setValue(this.selectedCity.name);
    }
  }

  onSearchInput(searchText: string): void {
    this.store.dispatch(new GetCities(searchText));
  }

  onCitySelected(cityName: string, key?: string): void {
    if (!key) {
      const subscription = this.cities$.subscribe((cities: CityInterface[]) => {
        const selectedCity = cities.find((city: CityInterface) => cityName === city.name);
        this.store.dispatch(new SetSelectedCity(selectedCity));
        this.store.dispatch(new GetCurrentWeather(selectedCity.key));
        this.store.dispatch(new GetForecast({cityKey: selectedCity.key, degreeType: this.degreeType}));
        subscription.unsubscribe();
      });
    } else {
      const selectedCity = {name: cityName, key};
      this.store.dispatch(new SetSelectedCity(selectedCity));
      this.store.dispatch(new GetCurrentWeather(selectedCity.key));
      this.store.dispatch(new GetForecast({cityKey: selectedCity.key, degreeType: this.degreeType}));
    }
  }

  onAddToFavoritesClicked(): void {
    const subscription = this.currentWeather$.subscribe((currentWeather) => {
      this.favCitiesLocalStorageService.addToFavorites({city: this.selectedCity, currentWeather});
      this.store.dispatch(new AddToFavorites({city: this.selectedCity, currentWeather}));
    });
    subscription.unsubscribe();
  }

  onRemoveFromFavoritesClicked(): void {
    const favoriteCityIndex = this.favoriteCities.findIndex((favoriteCity) => favoriteCity.city.key === this.selectedCity.key);
    this.favCitiesLocalStorageService.removeFromFavorites(favoriteCityIndex);
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
