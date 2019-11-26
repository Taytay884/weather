const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export class DailyForecastModel {
  private date: Date;

  constructor(date: string, public temperature: TemperatureInterface, public day: DayOrNightInterface, public night: DayOrNightInterface) {
    this.date = new Date(date);
  }

  getDayName() {
    return weekdays[this.date.getDay()];
  }
}

interface TemperatureInterface {
  Minimum: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Maximum: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

interface DayOrNightInterface {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}
