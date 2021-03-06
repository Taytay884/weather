import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {Observable, of} from 'rxjs';
import {DailyForecastModel} from '../models/DailyForecast.model';
import {AutocompleteCityInterface} from '../interfaces/AutocompleteCity.interface';
import {ForecastInterface} from '../interfaces/Forecast.interface';
import {CityInterface} from '../interfaces/City.interface';
import {CurrentWeatherInterface} from '../interfaces/CurrentWeather.interface';
import {DailyForecastInterface} from '../interfaces/DailyForecast.interface';
import {catchError, map} from 'rxjs/operators';
import {DEGREE_TYPE} from '../enum/degreeType.enum';

const mockAutoCompleteJson = [
  {
    Version: 1,
    Key: '215854',
    Type: 'City',
    Rank: 31,
    LocalizedName: 'Tel Aviv',
    Country: {
      ID: 'IL',
      LocalizedName: 'Israel'
    },
    AdministrativeArea: {
      ID: 'TA',
      LocalizedName: 'Tel Aviv'
    }
  },
  {
    Version: 1,
    Key: '3431644',
    Type: 'City',
    Rank: 45,
    LocalizedName: 'Telanaipura',
    Country: {
      ID: 'ID',
      LocalizedName: 'Indonesia'
    },
    AdministrativeArea: {
      ID: 'JA',
      LocalizedName: 'Jambi'
    }
  },
  {
    Version: 1,
    Key: '300558',
    Type: 'City',
    Rank: 45,
    LocalizedName: 'Telok Blangah New Town',
    Country: {
      ID: 'SG',
      LocalizedName: 'Singapore'
    },
    AdministrativeArea: {
      ID: '05',
      LocalizedName: 'South West'
    }
  },
  {
    Version: 1,
    Key: '325876',
    Type: 'City',
    Rank: 51,
    LocalizedName: 'Telford',
    Country: {
      ID: 'GB',
      LocalizedName: 'United Kingdom'
    },
    AdministrativeArea: {
      ID: 'TFW',
      LocalizedName: 'Telford and Wrekin'
    }
  },
  {
    Version: 1,
    Key: '169072',
    Type: 'City',
    Rank: 51,
    LocalizedName: 'Telavi',
    Country: {
      ID: 'GE',
      LocalizedName: 'Georgia'
    },
    AdministrativeArea: {
      ID: 'KA',
      LocalizedName: 'Kakheti'
    }
  },
  {
    Version: 1,
    Key: '230611',
    Type: 'City',
    Rank: 51,
    LocalizedName: 'Telsiai',
    Country: {
      ID: 'LT',
      LocalizedName: 'Lithuania'
    },
    AdministrativeArea: {
      ID: 'TE',
      LocalizedName: 'Telšiai'
    }
  },
  {
    Version: 1,
    Key: '2723742',
    Type: 'City',
    Rank: 55,
    LocalizedName: 'Telégrafo',
    Country: {
      ID: 'BR',
      LocalizedName: 'Brazil'
    },
    AdministrativeArea: {
      ID: 'PA',
      LocalizedName: 'Pará'
    }
  },
  {
    Version: 1,
    Key: '186933',
    Type: 'City',
    Rank: 55,
    LocalizedName: 'Tela',
    Country: {
      ID: 'HN',
      LocalizedName: 'Honduras'
    },
    AdministrativeArea: {
      ID: 'AT',
      LocalizedName: 'Atlántida'
    }
  },
  {
    Version: 1,
    Key: '3453754',
    Type: 'City',
    Rank: 55,
    LocalizedName: 'Telaga Asih',
    Country: {
      ID: 'ID',
      LocalizedName: 'Indonesia'
    },
    AdministrativeArea: {
      ID: 'JB',
      LocalizedName: 'West Java'
    }
  },
  {
    Version: 1,
    Key: '3453755',
    Type: 'City',
    Rank: 55,
    LocalizedName: 'Telagamurni',
    Country: {
      ID: 'ID',
      LocalizedName: 'Indonesia'
    },
    AdministrativeArea: {
      ID: 'JB',
      LocalizedName: 'West Java'
    }
  }
];

const mockCurrentWeather = {
  LocalObservationDateTime: '2019-11-26T10:06:00+02:00',
  EpochTime: 1574755560,
  WeatherText: 'Cloudy',
  WeatherIcon: 7,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: true,
  Temperature: {Metric: {Value: 26.2, Unit: 'C', UnitType: 17}, Imperial: {Value: 79, Unit: 'F', UnitType: 18}},
  MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
  Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us'
};

const mock5DaysForecast = {
  Headline: {
    EffectiveDate: '2019-11-30T07:00:00+02:00',
    EffectiveEpochDate: 1575090000,
    Severity: 4,
    Text: 'Pleasant this weekend',
    Category: '',
    EndDate: null,
    EndEpochDate: null,
    MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us',
    Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us'
  },
  DailyForecasts: [{
    Date: '2019-11-26T07:00:00+02:00',
    EpochDate: 1574744400,
    Temperature: {Minimum: {Value: 62, Unit: 'F', UnitType: 18}, Maximum: {Value: 84, Unit: 'F', UnitType: 18}},
    Day: {Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false},
    Night: {Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false},
    Sources: ['AccuWeather'],
    MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us',
    Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us'
  }, {
    Date: '2019-11-27T07:00:00+02:00',
    EpochDate: 1574830800,
    Temperature: {Minimum: {Value: 59, Unit: 'F', UnitType: 18}, Maximum: {Value: 76, Unit: 'F', UnitType: 18}},
    Day: {Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false},
    Night: {Icon: 34, IconPhrase: 'Mostly clear', HasPrecipitation: false},
    Sources: ['AccuWeather'],
    MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us',
    Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us'
  }, {
    Date: '2019-11-28T07:00:00+02:00',
    EpochDate: 1574917200,
    Temperature: {Minimum: {Value: 56, Unit: 'F', UnitType: 18}, Maximum: {Value: 73, Unit: 'F', UnitType: 18}},
    Day: {Icon: 3, IconPhrase: 'Partly sunny', HasPrecipitation: false},
    Night: {Icon: 34, IconPhrase: 'Mostly clear', HasPrecipitation: false},
    Sources: ['AccuWeather'],
    MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us',
    Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us'
  }, {
    Date: '2019-11-29T07:00:00+02:00',
    EpochDate: 1575003600,
    Temperature: {Minimum: {Value: 56, Unit: 'F', UnitType: 18}, Maximum: {Value: 74, Unit: 'F', UnitType: 18}},
    Day: {Icon: 2, IconPhrase: 'Mostly sunny', HasPrecipitation: false},
    Night: {Icon: 36, IconPhrase: 'Intermittent clouds', HasPrecipitation: false},
    Sources: ['AccuWeather'],
    MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us',
    Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us'
  }, {
    Date: '2019-11-30T07:00:00+02:00',
    EpochDate: 1575090000,
    Temperature: {Minimum: {Value: 55, Unit: 'F', UnitType: 18}, Maximum: {Value: 75, Unit: 'F', UnitType: 18}},
    Day: {Icon: 3, IconPhrase: 'Partly sunny', HasPrecipitation: false},
    Night: {Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false},
    Sources: ['AccuWeather'],
    MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us',
    Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us'
  }]
};

@Injectable({
  providedIn: 'root'
})
export class AccuweatherService {

  apikey = 'xqrHn8gB0aQpaC3m2Ujhadx9cd6RaZGt';
  // apikey = 'IuPr9m7gy8juWIP3SbAOoWAox0VGWC5u';
  cityAutoCompleteUrl = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  currentWeatherUrl = 'https://dataservice.accuweather.com/currentconditions/v1';
  fiveDaysForecastUrl = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day';
  geopositionSearchUrl = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
  }

  getLocationAutoComplete(query: string): Observable<CityInterface[]> {
    if (!query) {
      return of([]);
    }

    return this.http.get(this.cityAutoCompleteUrl, {params: {apikey: this.apikey, q: query}}).pipe(
    // return of(mockAutoCompleteJson).pipe(
      map((res: AutocompleteCityInterface[]) => {
        return this.getCitiesFromAutocompleteJson(res);
      }), catchError((err) => {
        this.errorHandler.openErrorSnackBar('An error occured, cannot load cities.');
        return of(null);
      })
    );
  }

  private getCitiesFromAutocompleteJson(citiesJson: AutocompleteCityInterface[]): CityInterface[] {
    return citiesJson.map((cityJson: AutocompleteCityInterface) => {
      return {name: cityJson.LocalizedName, key: cityJson.Key};
    });
  }

  getLocationCurrentWeather(locationKey: string): Observable<CurrentWeatherInterface> {
    if (!locationKey) {
      return of(null);
    }
    return this.http.get(`${this.currentWeatherUrl}/${locationKey}`, {params: {apikey: this.apikey}}).pipe(
    // return of([mockCurrentWeather]).pipe(
      map((res: CurrentWeatherInterface[]) => res[0]),
      catchError((err) => {
        this.errorHandler.openErrorSnackBar('An error occured, cannot load forecast.');
        return of(null);
      })
    );
  }

  getLocation5DaysForecast(locationKey: string, degreeType: DEGREE_TYPE): Observable<DailyForecastModel[]> {
    if (!locationKey) {
      return of(null);
    }
    return this.http.get(`${this.fiveDaysForecastUrl}/${locationKey}`, {
      params: {
        apikey: this.apikey,
        metric: String(degreeType === DEGREE_TYPE.Celsius)
      }
    }).pipe(
      // return of(mock5DaysForecast).pipe(
      map((res: ForecastInterface) => this.mapFiveDaysForecast(res)),
      catchError(err => {
        this.errorHandler.openErrorSnackBar('An error occured, cannot load forecast.');
        return of(null);
      })
    );
  }

  private mapFiveDaysForecast(forecast: ForecastInterface): DailyForecastModel[] {
    return forecast.DailyForecasts.map((dailyForecast: DailyForecastInterface) => this.transformDailyForecast(dailyForecast));
  }

  private transformDailyForecast(dailyForecast: DailyForecastInterface): DailyForecastModel {
    return new DailyForecastModel(dailyForecast.Date, dailyForecast.Temperature, dailyForecast.Day, dailyForecast.Night);
  }

  getCityByPosition(latitude, longitude): Observable<CityInterface> {
    return this.http.get(`${this.geopositionSearchUrl}`, {params: {apikey: this.apikey, q: `${latitude},${longitude}`}}).pipe(
      map((res: any) => {return {name: res.LocalizedName, key: res.Key}}),
      catchError(err => {
        this.errorHandler.openErrorSnackBar('An error occured, cannot find nearby city.');
        return of(null);
      })
    );
  }
}
