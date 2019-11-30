import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/state/app.state';
import {FavoriteCityWeatherInterface} from '../interfaces/FavoriteCityWeather.interface';
import {selectDegreeType, selectFavoriteCities} from '../store/selectors/weather.selectors';
import {Observable, pipe} from 'rxjs';
import {RemoveFromFavorites} from '../store/actions/weather.actions';
import {DEGREE_TYPE} from '../enum/degreeType.enum';
import {FavoriteCitiesLocalStorageService} from '../services/favorite-cities-local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  favoriteCities$: Observable<FavoriteCityWeatherInterface[]> = this.store.select(pipe(selectFavoriteCities));
  degreeType$: Observable<DEGREE_TYPE> = this.store.select(pipe(selectDegreeType));

  constructor(private store: Store<IAppState>, private favCitiesLocalStorageService: FavoriteCitiesLocalStorageService) {
  }

  onRemoveFromFavorites(cityIndex: number) {
    this.favCitiesLocalStorageService.removeFromFavorites(cityIndex);
    this.store.dispatch(new RemoveFromFavorites(cityIndex));
  }
}
