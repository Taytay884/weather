import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from './home/home.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {WeatherDayCardComponent} from './home/weather-day-card/weather-day-card.component';
import {WeatherCityCardComponent} from './favorites/weather-city-card/weather-city-card.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/reducers/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WeatherEffects} from './store/effects/weather.effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    WeatherDayCardComponent,
    WeatherCityCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([WeatherEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
