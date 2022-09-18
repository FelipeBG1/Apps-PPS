import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { IonContent, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  tema : number = 0;
  index : any;
  perfil : number = 0;
  eleccion : boolean = false;

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  constructor(private as : AuthService,private imageStore : ImagenesService,private fs : FirestoreService,private ts : ToastController) {

  }

  ngOnInit() {
  }

  volverInicio()
  {
    this.tema = 0;
    this.perfil = 0;
  }


  cargarPerfil(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.perfil = 1;
          this.eleccion = true;
          break;

        case 2:
          this.perfil = 2;
          this.eleccion = true;
          break;

        case 0:
          this.perfil = 0;
          break;
    }
  }

  mostrarCosasLindas()
  {
    this.tema = 1;
  }

  mostrarCosasFeas()
  {
    this.tema = 2;
  }

  logOut()
  {
    this.scrollToTop();
    this.as.logOut();
  }

  subirFoto()
  {
    let hora = new Date();
  
    let foto : any = {
      pathFoto : "",
      email : this.as.logeado.email,
      hora : hora.getFullYear(),
      likes : []
    } 
    
    this.imageStore.addNewToGallery(foto, this.tema).then((data) =>{
      this.scrollToTop();
      this.as.loading = true;
      setTimeout(() => {
        this.as.loading = false;
      }, 8000);
    });
    
  }
  

  MostrarToast(message : string)
  {
    return this.ts.create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
            position: 'top'
    });
  }

}
