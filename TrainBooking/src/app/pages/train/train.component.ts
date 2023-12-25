import { Component, Pipe } from '@angular/core';
import { TrainService } from '../../services/train.service';
import { subscribe } from 'diagnostics_channel';
import { CommonModule, NgFor } from '@angular/common';
import { pipe } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-train',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [TrainService],
  templateUrl: './train.component.html',
  styleUrl: './train.component.css'
})


export class TrainComponent {
  trainList: any[] = [];

  constructor(private service: TrainService) {
    // this.getAllTrains();
  }

  ngOnInit(): void {
    this.getAllTrains();
  }

  getAllTrains() {
    this.service.getAllTarins().subscribe((res: any) => {
      this.trainList = res.data;
    })
  }
}
