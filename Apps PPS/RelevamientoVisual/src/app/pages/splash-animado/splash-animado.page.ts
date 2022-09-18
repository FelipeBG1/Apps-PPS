import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash-animado',
  templateUrl: './splash-animado.page.html',
  styleUrls: ['./splash-animado.page.scss'],
})
export class SplashAnimadoPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() 
  {
    setTimeout(() => {
      this.router.navigateByUrl("login");
    }, 3500);
  }

  
  
}
