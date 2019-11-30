import {Component} from '@angular/core';
import {IAppState} from './store/state/app.state';
import {Store} from '@ngrx/store';
import {AddToFavorites, GetForecast, SetTheme, SwitchDegreeType} from './store/actions/weather.actions';
import {selectDegreeType, selectTheme} from './store/selectors/weather.selectors';
import {THEMES} from './const/themes.const';
import {DEGREE_TYPE} from './enum/degreeType.enum';
import {FavoriteCitiesLocalStorageService} from './services/favorite-cities-local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Weather';
  currentTheme: string;
  degreeType: DEGREE_TYPE;
  DEGREE_TYPES = DEGREE_TYPE;

  constructor(private store: Store<IAppState>, private favCitiesLocalStorageService: FavoriteCitiesLocalStorageService) {
    this.store.select(selectTheme).subscribe((theme) => {
      this.currentTheme = theme;
    });

    this.store.select(selectDegreeType).subscribe((degreeType) => {
      this.degreeType = degreeType;
    });
    this.loadLocalStorageFavCities();
  }

  switchTheme() {
    const newTheme = this.currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.store.dispatch(new SetTheme(newTheme));
  }

  switchTemperatureDegreeType() {
    this.store.dispatch(new SwitchDegreeType());
  }

  private loadLocalStorageFavCities() {
    const localStorageFavoriteCities = this.favCitiesLocalStorageService.getFavorites();
    localStorageFavoriteCities.forEach((favoriteCity) => {
      this.store.dispatch(new AddToFavorites(favoriteCity));
    });
  }
}
