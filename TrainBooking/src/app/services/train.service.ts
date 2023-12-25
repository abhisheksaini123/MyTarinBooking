import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Booking, IsPassenger, ResponseModel } from '../model/station';
import { CONSTANT } from '../contant/Constatnt';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  apiEndPoint: string = '';

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.ApiEndPoint;
  }

  getTrainsBetweenStations(searchObj: any): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_TRAINS_BETWEEN_STATIONS + `?departureStationId=${searchObj.fromStationId}&arrivalStationId=${searchObj.toStationId}&departureDate=${searchObj.dateOfTravel}`)
  }

  craetePassenger(obj: IsPassenger): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiEndPoint + CONSTANT.ENDPOINTS.ADD_UPDATE_PASSENGER, obj);
  }

  login(obj: IsPassenger): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiEndPoint + CONSTANT.ENDPOINTS.LOGIN, obj);
  }

  bookTrains(obj: Booking): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.apiEndPoint + CONSTANT.ENDPOINTS.BOOK_TRAIN, obj);
  }

  getAllTarins(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_TRAINS);
  }

  getAllBookings(id: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.apiEndPoint + CONSTANT.ENDPOINTS.GET_ALL_BOOKING_BY_PASSENGER + '?passengerid=' + id)
  }
}
