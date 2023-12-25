import { Component, OnInit } from '@angular/core';
import { IsStation, ResponseModel } from '../../model/station';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { StationService } from '../../services/station.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [StationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { ngSkipeHydration: 'true' },
})
export class HomeComponent implements OnInit {

  stationList: IsStation[] = [];
  travelObj: any = {
    fromStationId: '',
    toStationId: '',
    dateOfTravel: '',
  }

  constructor(private service: StationService, private router: Router) { }

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations() {
    this.service.getAllStations().subscribe((res: ResponseModel) => {
      this.stationList = res.data;
    },
      error => {
        alert("Error Occoured" + JSON.stringify(error));
      }
    )
  }
  onSearch() {
    // this.router.navigateByUrl('/search');  
    this.router.navigate(['/search', this.travelObj.fromStationId, this.travelObj.toStationId, this.travelObj.dateOfTravel]);
  }
}
