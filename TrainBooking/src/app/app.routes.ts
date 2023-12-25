import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './pages/admin/admin.component';
import { TrainComponent } from './pages/train/train.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search/:fromStationId/:toStationId/:dateOfTravel', component: SearchComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'train', component: TrainComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }