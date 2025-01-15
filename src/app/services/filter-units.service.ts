import {Injectable} from '@angular/core';
import {LocationInterface} from "../types/location.interface";

type HourIndexes = 'morning' | 'afternoon' | 'evening'

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  evening: {
    first: '18',
    last: '23'
  }
}


@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() {
  }


  transformWeekday(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }

  filterUnits(unit: LocationInterface, open_hour: string, close_hour: string) {
    if (!unit.schedules) return true;

    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    let today_weekday = this.transformWeekday(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour
      let schedule_weekday = unit.schedules[i].weekdays

      if (today_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(" às ")
          let unit_open_hour_filter =
            parseInt(unit_open_hour.replace('h', ''), 10)

          let unit_close_hour_filter =
            parseInt(unit_close_hour.replace('h', ''), 10)

          return unit_open_hour_filter <= open_hour_filter && unit_close_hour_filter >= close_hour_filter;
        }
      }
    }
    return false;
  }

  filter(results: LocationInterface[], showClosed: boolean, hour: string) {
    let intermediateResults = results

    if (!showClosed) {
      intermediateResults = results.filter(location => location.opened)
    }

    if (hour) {
      const OPEN_HOUR = OPENING_HOURS[hour as HourIndexes].first
      const CLOSE_HOUR = OPENING_HOURS[hour as HourIndexes].last

      return intermediateResults.filter(location => {
        return this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR)
      })
    } else {
      return intermediateResults;
    }
  }
}
