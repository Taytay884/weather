import {DEGREE_TYPE} from '../enum/degreeType.enum';

export interface GetForecastPayloadInterface {
  cityKey: string;
  degreeType: DEGREE_TYPE;
}
