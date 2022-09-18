import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage implements OnInit {

  @Input() perfil : string;

  dato : boolean = false;
  usuarios : any[];
  
  constructor( private as : AuthService,private fs : FirestoreService, private imgS : ImagenesService) {
    
   }

  ngOnInit() {
    this.as.loading = true;
    this.fs.traerUsuarios().subscribe(value =>{    
      this.usuarios = value;
      this.usuarios = this.usuarios.sort(this.ordenarArray);
      if(this.usuarios != undefined )
      {
        this.as.loading = false;
      }
    });
  }

  ordenarArray(a : any,b : any)
  {
    if(a.nombre > b.nombre)
    {
      return 1;
    }
    else
    {
      if(a.nombre < b.nombre)
      {
        return -1
      }
      else
      {
        return 0;
      }
    }
  }

  logOut()
  {
    this.as.logOut();
  }


  irAgregarUsuario()
  {
    //this.perfil = this.as.logeado.perfil;
    this.dato = true;
  }

  cambiarDato(datoACambiar : boolean)
  {
    this.dato = datoACambiar;
  }

}
