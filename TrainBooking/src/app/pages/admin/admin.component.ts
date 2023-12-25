import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrainService } from '../../services/train.service';
import { IsPassenger } from '../../model/station';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterLink],
  providers: [TrainService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  localStorage:any;

  registerObj: IsPassenger = new IsPassenger();
  loggedUserData: any;

  constructor(private service: TrainService, private router:Router ) {

    const localData = localStorage.getItem('trainUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  ngOnInit(): void { 
    // const localData = localStorage.getItem('trainUser');
    // if (localData != null) {
    //   this.loggedUserData = JSON.parse(localData);
    // }
  }

  logoff() {
    localStorage.removeItem('trainUser');
    alert("Are Yoy Sure...");
    this.loggedUserData = undefined;
    this.router.navigateByUrl('/home');
  }



  openRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'block'
    }
  }


  closeRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'none'
    }
  }

  openLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  onRegister() {
    this.service.craetePassenger(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert('Registartion Success...');
        localStorage.setItem("trainUser", JSON.stringify(res.data));
        this.loggedUserData = res.data;
        this.closeRegister();
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.service.login(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login Success...");
        localStorage.setItem('trainUser', JSON.stringify(res.data));
        this.loggedUserData = res.data;
        this.closeLogin();
      } else {
        alert(res.message);
      }
    })
  }
}
