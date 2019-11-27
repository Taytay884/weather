import {RouterReducerState} from '@ngrx/router-store';
import {initialWeatherState, IWeatherState} from './weather.state';

export interface IAppState {
  router?: RouterReducerState;
  weather: IWeatherState;
}

export const initialAppState: IAppState = {
  weather: initialWeatherState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
