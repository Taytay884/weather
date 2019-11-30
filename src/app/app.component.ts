import {Component} from '@angular/core';
import {IAppState} from './store/state/app.state';
import {Store} from '@ngrx/store';
import {SetTheme} from './store/actions/weather.actions';
import {selectTheme} from './store/selectors/weather.selectors';
import {THEMES} from './const/themes.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Weather';
  currentTheme: string;

  constructor(private store: Store<IAppState>) {
    this.store.select(selectTheme).subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  switchTheme() {
    const newTheme = this.currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    this.store.dispatch(new SetTheme(newTheme));
  }

}
