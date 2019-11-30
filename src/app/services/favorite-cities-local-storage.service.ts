import {Injectable} from '@angular/core';
import {FavoriteCityWeatherInterface} from '../interfaces/FavoriteCityWeather.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesLocalStorageService {

  private key = 'favoriteCities';
  private favoriteCities: FavoriteCityWeatherInterface[] = JSON.parse(localStorage.getItem(this.key)) || [];

  addToFavorites(item: any): void {
    this.favoriteCities = [...this.favoriteCities, item];
    localStorage.setItem(this.key, JSON.stringify(this.favoriteCities));
  }

  removeFromFavorites(idx: number): void {
    this.favoriteCities = this.favoriteCities.filter((favoriteCity, index) => idx !== index);
    localStorage.setItem(this.key, JSON.stringify(this.favoriteCities));
  }

  getFavorites(): FavoriteCityWeatherInterface[] {
    return JSON.parse(JSON.stringify(this.favoriteCities));
  }
}
