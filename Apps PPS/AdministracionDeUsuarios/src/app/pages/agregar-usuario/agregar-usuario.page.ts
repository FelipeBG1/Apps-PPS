import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { uploadString } from "firebase/storage"
import { ScannerService } from 'src/app/services/scanner.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  email : string = "";
  password : string = "";
  password2 : string = "";
  nombre : string = "";
  apellido : string = "";
  dni : number = 0;
  imagen : any;
  form : FormGroup;
  foto : any;
  capturedPhoto : any = "";
  url : any = "";
  storage : any;
  usuario : any;
  fotoSubida : boolean;
  passwordAConfirmar : string;
  confirmada : boolean;
  confirmada2 : boolean;
  passwordFlag : boolean;
  urlFoto : string = "";
  webPath : any = "";
  foco : boolean = false;

  @Output() atrasEvent = new EventEmitter<boolean>();


  
  constructor(private formBuilder : FormBuilder, private as : AuthService, private router : Router, 
    private imageStore : ImagenesService, private afs : AngularFireStorage, 
    private fs : FirestoreService, private sf : ScannerService, private toastController : ToastController) 
  { 
    this.form = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],  
      'nombre' : ['',[Validators.required,Validators.minLength(2)]],
      'apellido' : ['',[Validators.required,Validators.minLength(2)]],
      'dni' : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
    });

    this.fotoSubida = false;
    this.confirmada2 = false;
  }

  ngOnInit() {
  }

  /* agregarUsuario()
  {
    this.as.loading = true;
    uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{
      
      this.url.getDownloadURL().subscribe((url1 : any)=>{
        
        this.usuario.pathFoto = url1;
        this.urlFoto = url1;
        this.as.registro(this.usuario).then(async res =>{
         
          setTimeout(() => {
            this.as.loading = false;
            this.as.MostrarToastSuccess('Se registro el usuario').then((toast : any) => {
              toast.present();
            })
            this.form.reset(); 
            this.fs.agregarUsuario(this.usuario);
            this.fotoSubida = false;
            this.confirmada = false;
            this.passwordAConfirmar = "";
          }, 500);
        })
        .catch((error : any)=>{
          if(error.code == 'auth/email-already-exists' || error.code == 'auth/email-already-in-use')
          {
            this.as.loading = false;
            this.as.MostrarToast("Ese usuario ya esta registrado");
          }
        });
      })
    }); 
  }

  agregarFoto()
  {
    this.usuario = {
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      dni : this.form.get('dni')?.value,
      email : this.form.get('email')?.value,
      password : this.form.get('password')?.value,
      pathFoto : ""
    };
    this.imageStore.addNewToGallery(this.usuario).then((data) =>{
      this.storage = data.storage;
      this.url = data.url;
      this.capturedPhoto = data.capturedPhoto;
      this.webPath = data.web;
      this.fotoSubida = true;
    })
  } */

  agregarUsuario()
  {
    this.as.loading = true;
        this.as.registro(this.usuario).then(async res =>{        
          setTimeout(() => {
            this.as.loading = false;
            this.MostrarToast('Se registro el usuario',"Registrado","success").then((toast : any) => {
              toast.present();
            })
            this.form.reset(); 
            this.webPath = "";
            this.fs.agregarUsuario(this.usuario);
            this.fotoSubida = false;
            this.confirmada = false;
            this.passwordAConfirmar = "";
          }, 500);
        })
        .catch((error : any)=>{
          if(error.code == 'auth/email-already-exists' || error.code == 'auth/email-already-in-use')
          {
            this.as.loading = false;
            this.MostrarToast("Ese usuario ya esta registrado","Error","danger").then((toast : any) => {
              toast.present();
            })
          }
        }); 
  }

  agregarFoto()
  {
    
    this.usuario = {
      nombre : this.form.get('nombre')?.value,
      apellido : this.form.get('apellido')?.value,
      dni : this.form.get('dni')?.value,
      email : this.form.get('email')?.value,
      password : this.form.get('password')?.value,
      pathFoto : ""
    };
    this.imageStore.addNewToGallery(this.usuario).then((data) =>{
      this.as.loading = true;
      this.storage = data.storage;
      this.url = data.url;
      this.capturedPhoto = data.capturedPhoto;
      this.fotoSubida = true;
      uploadString(this.storage,this.capturedPhoto.dataUrl, 'data_url').then((data) =>{    
        this.url.getDownloadURL().subscribe((url1 : any)=>{
          this.webPath = url1;
          this.usuario.pathFoto = url1;
          setTimeout(() => {
            this.as.loading = false;
          }, 2000);
        });
      });
    });

  }

  MostrarToast(message : string,header : string, color : string)
  {
    return this.toastController.create({
            header: header,
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color : color
    });
  }


  logOut()
  {
    this.as.logOut();
  }

 
  volverAtras(value: boolean) {
    
    this.atrasEvent.emit(value);
  }

  confirmar()
  {
    let passwordPrincipal = this.form.get("password")?.value;

    if(passwordPrincipal == this.passwordAConfirmar)
    {
      this.confirmada = false;
      this.confirmada2 = true;
    }
    else
    {
      this.confirmada = true;
    }
  }

  leerDNI()
  {
    let datos : any = [];
    let nombre : string;
    let apellido : string;
    let nombreFinal : string;
    let apellidoFinal : string;
    this.sf.test().then((data) => {
      
      datos = data.split('@');
      nombre = datos[2];
      apellido = datos[1];
      nombreFinal = nombre[0];
      apellidoFinal = apellido[0];
      
      for(let i = 1; i < nombre.length; i++)
      {
        if(nombre[i-1] == " ")
        {
          nombreFinal = nombreFinal + nombre[i].toUpperCase();
        }
        else
        {
          nombreFinal = nombreFinal + nombre[i].toLowerCase();
        }

      }

      for(let i = 1; i < apellido.length; i++)
      {
        if(apellido[i-1] == " ")
        {
          apellidoFinal = apellidoFinal + apellido[i].toUpperCase();
        }
        else
        {
          apellidoFinal = apellidoFinal + apellido[i].toLowerCase();
        }
      }


      this.form.get('apellido')?.setValue(apellidoFinal);
      this.form.get('nombre')?.setValue(nombreFinal);
      this.form.get('dni')?.setValue(datos[4]);
      this.sf.stopScan();
    })
  }

  cambiarFoco(dato : number)
  {
    console.log(dato);
    if(dato == 1)
    {
      this.foco = true;
    }
    else
    {
        this.foco = false;
    }
  }
}
