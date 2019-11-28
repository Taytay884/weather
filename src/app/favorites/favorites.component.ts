import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/state/app.state';
import {FavoriteCityWeatherInterface} from '../interfaces/FavoriteCityWeather.interface';
import {selectFavoriteCities} from '../store/selectors/weather.selectors';
import {Observable, pipe} from 'rxjs';
import {RemoveFromFavorites} from '../store/actions/weather.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  favoriteCities$: Observable<FavoriteCityWeatherInterface[]> = this.store.select(pipe(selectFavoriteCities));

  constructor(private store: Store<IAppState>) {
  }

  onRemoveFromFavorites(cityIndex: number) {
    this.store.dispatch(new RemoveFromFavorites(cityIndex));
  }
}
