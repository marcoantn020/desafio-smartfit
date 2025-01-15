import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UnitsResponse} from "../types/units-response.interface";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LocationInterface} from "../types/location.interface";

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {

  readonly URL = environment.API_URL as string;

  private allUnitsSubject: BehaviorSubject<LocationInterface[]> = new BehaviorSubject<LocationInterface[]>([])
  private allUnits$: Observable<LocationInterface[]> = this.allUnitsSubject.asObservable()
  private filteredUnits: LocationInterface[] = []

  constructor(private httpClient: HttpClient) {
     this.httpClient.get<UnitsResponse[]>(this.URL)
       .subscribe(data => {
         if (data[0]) {
           this.allUnitsSubject.next(data[0].locations)
           this.filteredUnits = data[0].locations
         }
       });
  }

  getAllUnits(): Observable<LocationInterface[]> {
    return this.allUnits$
  }

  getFilteredUnits() {
    return this.filteredUnits
  }

  setFilteredUnits(value: LocationInterface[]) {
     this.filteredUnits = value
  }
}
