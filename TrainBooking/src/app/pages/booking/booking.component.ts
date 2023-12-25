import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TrainService } from '../../services/train.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [TrainService],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  trainList: any[] = [];
  loggedUserData: any;

  constructor(private trservice: TrainService,private arouter:ActivatedRoute) {

    const localData = localStorage.getItem('trainUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.getAllTrains();
    }
  }

  ngOnInit(): void {
    this.getAllTrains();
  }

  getAllTrains() {
    this.trservice.getAllBookings(this.loggedUserData.passengerID).subscribe((res: any) => {
      this.trainList = res.data;
      console.log("gshd",this.loggedUserData.passengerID);
    })
  }
}
