import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/station';
import { CONSTANT } from '../contant/Constatnt';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  getTrainsBetweenStations(searchObj: any) {
    throw new Error('Method not implemented.');
  }

  apiEndPoint: string = '';
  constructor(private http: HttpClient) { 
    this.apiEndPoint = environment.ApiEndPoint;
  }

  getAllStations(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_STATION);
  }
}
