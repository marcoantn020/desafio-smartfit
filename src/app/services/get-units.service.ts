import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UnitsResponse} from "../types/units-response.interface";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {

  readonly URL = environment.API_URL as string;

  constructor(private httpClient: HttpClient) { }

  getAllUnits(): Observable<UnitsResponse[]> {
    return this.httpClient.get<UnitsResponse[]>(this.URL)
  }
}
