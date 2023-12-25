import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Booking, IsSearchTrain, IsStation, ResponseModel, TrainAppBookingPassengers } from '../../model/station';
import { TrainService } from '../../services/train.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StationService } from '../../services/station.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, HttpClientModule],
  providers: [TrainService, StationService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchObj: any = {
    fromStationId: '',
    toStationId: '',
    dateOfTravel: '',
  };

  stationList: IsStation[] = [];
  trainsList: IsSearchTrain[] = [];

  bookingObj: Booking = new Booking();
  bookingPassengers: TrainAppBookingPassengers = new TrainAppBookingPassengers();

  loggedUserData: any;

  constructor(private service: TrainService, private router: Router, private activactedRoute: ActivatedRoute, private _service: StationService) {

    this.activactedRoute.params.subscribe((paramObj: any) => {
      // debugger;
      this.searchObj.fromStationId = paramObj.fromStationId;
      this.searchObj.toStationId = paramObj.toStationId;
      this.searchObj.dateOfTravel = paramObj.dateOfTravel;
      this.bookingObj.travelDate = this.searchObj.dateOfTravel;
      this.getAllTrains();
    })
    const localData = localStorage.getItem('trainUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.bookingObj.passengerId = this.loggedUserData.passengerID;
    }
  }
  
  ngOnInit(): void {
    this.loadStations();
  }

  AddPassenger() {
    const data = JSON.stringify(this.bookingPassengers);
    const paserData = JSON.parse(data);

    this.bookingObj.TrainAppBookingPassengers.push(paserData);
  }
  
  onRemove(index: number) {
    this.bookingObj.TrainAppBookingPassengers.splice(index, 1)
  }

  openBooking(trainId: number) {
    this.bookingObj.trainId = trainId;
    const model = document.getElementById('bookmodel');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeBooking() {
    const model = document.getElementById('bookmodel');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  loadStations() {
    this._service.getAllStations().subscribe((res: ResponseModel) => {
      this.stationList = res.data;
    }, error => {
      alert("Error Occoured" + JSON.stringify(error))
    })
  }

  getAllTrains() {
    this.service.getTrainsBetweenStations(this.searchObj).subscribe((result: ResponseModel) => {
      this.trainsList = result.data;
      console.log("data", this.trainsList);
    }, error => {
      alert("Error Occoured" + JSON.stringify(error));
    })
  }

  BookTicket() {
    this.bookingObj.bookingDate = new Date();
    this.bookingObj.totalSeats = this.
    bookingObj.TrainAppBookingPassengers.length;

    this.service.bookTrains(this.bookingObj).subscribe((result: ResponseModel) => {
      if (result.result) {
        alert('Booking Done Success');
      } else {
        alert(result.message);
      }
    }, error => {
      alert("Error Occoured" + JSON.stringify(error));
    })
  }
}
