import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
 
  usuario : any;
  perfiles : any = [];
  creditoActual : any;
  maximoAlcanzado : boolean = false;
  vaciar : boolean = false;
  constructor(public as : AuthService, private fs : FirestoreService, private scanner : ScannerService, private toastController : ToastController) 
  { 

  }

  ngOnInit() {
    this.as.loading = true;
    this.fs.traerPerfiles().subscribe((value)=>{
      this.perfiles = value;
      for (let item of this.perfiles) 
      {
        if(this.as.logeado.email == item.email)
        {
          this.usuario = item;
          this.creditoActual = this.usuario.credito;
          break;
        }
      }
      if(this.creditoActual != undefined)
      {
        this.as.loading = false;
      }
    })

  }

  logOut()
  {
    this.as.logOut();
  }

  cargarCredito()
  {
     let codigo : string;
    this.scanner.test().then((a)=>{
      codigo = a;
      this.scanner.stopScan(); 
      switch(codigo)
      {
        case "8c95def646b6127282ed50454b73240300dccabc":
          this.establecerCarga(10);
          if(this.usuario.credito == this.usuario.maximo)
          {
            this.MostrarToast('Ha alcanzado su crédito máximo',"Crédito máximo","dark").then((toast : any) => {
              toast.present();
            });
            this.maximoAlcanzado = true;
          }
          break;

        case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
          this.establecerCarga(50);
          if(this.usuario.credito == this.usuario.maximo)
          {
            this.MostrarToast('Ha alcanzado su crédito máximo',"Crédito máximo","dark").then((toast : any) => {
              toast.present();
            });
            this.maximoAlcanzado = true;
          }
          break;

        case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
          this.establecerCarga(100);
          if(this.usuario.credito == this.usuario.maximo)
          {
            this.MostrarToast('Ha alcanzado su crédito máximo',"Crédito máximo","dark").then((toast : any) => {
              toast.present();
            });
            this.maximoAlcanzado = true;
          }
          break;
    }
    });
  }

  establecerCarga(valor : any)
  {
    let variable1 : any;

    if(valor == 10)
    {
      variable1 = this.usuario.carga10;
    }
    else
    {
      if(valor == 50)
      {
        variable1 = this.usuario.carga50;
      }
      else
      {
        variable1 = this.usuario.carga100;
      }
    }

    if(this.usuario.perfil == "admin")
    {
      if(variable1 < 2)
      {
        this.usuario.credito += valor;
        variable1 ++;
      }
      else
      {
        this.MostrarToast('Ya ha utilizado ese QR el máximo de veces permitido',"Error","danger").then((toast : any) => {
          toast.present();
        });
      }
    }
    else
    {
      if(variable1 < 1)
      {
        this.usuario.credito += valor;
        variable1 ++;
      }
      else
      {
        this.MostrarToast('Ya ha utilizado ese QR el máximo de veces permitido',"Error","danger").then((toast : any) => {
          toast.present();
        });
      }
    }

    if(valor == 10)
    {
      this.usuario.carga10 = variable1;
    }
    else
    {
      if(valor == 50)
      {
        this.usuario.carga50 = variable1;
      }
      else
      {
        this.usuario.carga100 = variable1;
      }
    }

    this.fs.modificarPerfil(this.usuario,this.usuario.id);
  }

  confirmarVaciar()
  {
    this.usuario.credito = 0;
    this.usuario.carga10 = 0;
    this.usuario.carga50 = 0;
    this.usuario.carga100 = 0;
    this.creditoActual = 0;
    this.maximoAlcanzado = false;

    this.fs.modificarPerfil(this.usuario,this.usuario.id).then(() =>{
      this.MostrarToast('Se ha vaciado el crédito',"Crédito vaciado","success").then((toast : any) => {
        toast.present();
      });
    })
  }

  vaciarCredito()
  {
    this.MostrarToastVaciar("¿Desea vaciar su crédito?","","warning").then((toast : any) => {
      toast.present();
    }); 
  }

  MostrarToast(message : string, header : string, color : string)
  {
    return this.toastController.create({
            header: header,
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color : color
    });
  }

  MostrarToastVaciar(message : string, header : string, color : string)
  {
    return this.toastController.create({
            header: header,
            message: message,
            buttons: [
              {
                side: 'end',
                text: 'Si',
                handler: () => {
                  this.confirmarVaciar();
                }
              }, {
                side: 'end',
                text: 'No',
                role: 'cancel',
              }
            ],
            position: 'top',
            color : color
    });
  }

}
