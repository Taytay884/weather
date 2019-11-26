import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatDividerModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatSliderModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HomeComponent} from './home/home.component';
import {FavoritesComponent} from './favorites/favorites.component';
import { WeatherDayCardComponent } from './home/weather-day-card/weather-day-card.component';
import { WeatherCityCardComponent } from './favorites/weather-city-card/weather-city-card.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
