import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ToastController } from '@ionic/angular';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-lindas-feas',
  templateUrl: './lindas-feas.page.html',
  styleUrls: ['./lindas-feas.page.scss'],
})
export class LindasFeasPage implements OnInit {

  @Input() tema : number;
  otraClase : boolean = false;
  cosasLindas : any = [];
  cosasFeas: any = [];

  constructor(private fs : FirestoreService, public as : AuthService, private imageStore : ImagenesService, private ts : ToastController) 
  { 

  }

  ngOnInit() 
  {
    this.fs.traerCosasLindas().subscribe(value =>{
      this.cosasLindas = value;
      this.cosasLindas.sort(this.ordenarLista); 
    });

    this.fs.traerCosasFeas().subscribe(value =>{
      this.cosasFeas = value;
      this.cosasFeas.sort(this.ordenarLista); 
    });
  }

  ordenarLista(foto1 : any,foto2 : any)
  {
    let foto1Array : string[];
    let foto2Array : string[];
    let fecha1 : any;
    let fecha2 : any;
    let hora1 : any;
    let hora2 : any;

    let fechaNumeros1 : number[] = [];
    let fechaNumeros2 : number[] = [];
    let horaNumeros1 : number[] = [];
    let horaNumeros2 : number[] = [];
    foto1Array = foto1.hora.split(' ');
    foto2Array = foto2.hora.split(' ');

    fecha1 = foto1Array[0].split('/');
    fechaNumeros1.push(parseInt(fecha1[0]));
    fechaNumeros1.push(parseInt(fecha1[1]));
    fechaNumeros1.push(parseInt(fecha1[2]));
    fecha1 = fechaNumeros1;

    fecha2 = foto2Array[0].split('/');
    fechaNumeros2.push(parseInt(fecha2[0]));
    fechaNumeros2.push(parseInt(fecha2[1]));
    fechaNumeros2.push(parseInt(fecha2[2]));
    fecha2 = fechaNumeros2;

    hora1 = foto1Array[1].split(':');
    horaNumeros1.push(parseInt(hora1[0]));
    horaNumeros1.push(parseInt(hora1[1]));
    hora1 = horaNumeros1;

    hora2 = foto2Array[1].split(':');
    horaNumeros2.push(parseInt(hora2[0]));
    horaNumeros2.push(parseInt(hora2[1]));
    hora2 = horaNumeros2;

    if(fecha1[0] > fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2])
    {
      return -1;
    }
    else
    {
      if(fecha1[1] > fecha2[1] && fecha1[2] == fecha2[2])
      {
        return -1;
      }
      else
      {
        if(fecha1[2] > fecha2[2])
        {
          return -1;
        }
        else
        {
          if(fecha1[0] == fecha2[0] && fecha1[1] == fecha2[1] && fecha1[2] == fecha2[2])
          {
            if(hora1[0] > hora2[0])
            {
              return -1;
            }
            else
            {
              if(hora1[0] == hora2[0] && hora1[1] > hora2[1])
              {
                return -1;
              }
              else
              {
                if(hora1[0] < hora2[0])
                {
                  return 1;
                }
              }
            }
          }
        }
      }
    }

    return 0;

  }

  /* cambiarClase(i : string)
  {
    console.log(i);
    let element = document.getElementById(i);
    console.log(element);
    let elementStyle = window.getComputedStyle(element);
    let elementColor = elementStyle.getPropertyValue('color');
    if(elementColor == "rgb(209, 37, 37)")
    {
      document.getElementById(i).style.color = "";
    }
    else
    {
      document.getElementById(i).style.color = "rgb(209, 37, 37)";
    }
  } */

  cambiarLike(foto : any,i : any)
  {
    if(this.tema == 1)
    {
      this.modificarFoto('cosasLindas',foto,i);
    }
    else
    {
      if(this.tema == 2)
      {
        this.modificarFoto('cosasFeas',foto,i);
      }
    }
  }

/*   modificarFoto(coleccion : string,foto : any, i : any)
  {
    let element = document.getElementById(i);

    let elementStyle = window.getComputedStyle(element);
    let elementColor = elementStyle.getPropertyValue('color');
    let index : number;
    
    if(elementColor == "rgb(209, 37, 37)")
    {
      console.log("en el color");
      index = foto.likes.indexOf(this.as.logeado.email);
      console.log(foto.like[index]);
      foto.likes = foto.likes.splice(index,i);
      console.log(foto.likes);
      
    }
    else
    {
      foto.likes.push(this.as.logeado.email);
    }

    this.fs.modificarFoto(foto,foto.id,coleccion);
  } */

  modificarFoto(coleccion : string,foto : any, i : any)
  {
    let element = document.getElementById(i);

    let elementStyle = window.getComputedStyle(element);
    let elementColor = elementStyle.getPropertyValue('color');
    
    if(elementColor == "rgb(209, 37, 37)")
    {
      foto.likes = foto.likes.filter((like : string) => like != this.as.logeado.email);   
    }
    else
    {
      foto.likes.push(this.as.logeado.email);
    }

    this.fs.modificarFoto(foto,foto.id,coleccion);
  } 



}
