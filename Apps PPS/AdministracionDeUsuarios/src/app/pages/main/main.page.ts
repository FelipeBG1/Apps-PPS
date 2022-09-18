import { Component, OnInit } from '@angular/core';
import { AnimationDurations } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  perfil : string = "";
  constructor(private as : AuthService) 
  {
    this.perfil = this.as.logeado.perfil;
  }

  ngOnInit() {
  }

  logOut()
  {
    this.as.logOut();
  }
}
