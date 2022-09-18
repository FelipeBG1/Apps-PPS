import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  form : FormGroup;
  contraseña : string = "admin123";
  activada : boolean = false;
  apagar : boolean = true;

  //Variables
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  subscription: any;


  audioIzquierda = "../../../assets/sonidos/¡Están hurtando el dispositivo!.wav";
  audioDerecha = "../../../assets/sonidos/Epa.wav";
  audioVertical = "../../../assets/sonidos/audioVertical.mp3";
  audioHorizontal = "../../../assets/sonidos/audioHorizontal.mp3";
  audio = new Audio();

  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;

  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior';


  constructor(private formBuilder : FormBuilder, 
              private as : AuthService, 
              private toastController : ToastController,
              private flashlight: Flashlight,
              private vibration: Vibration,
              private screenOrientation: ScreenOrientation,
              private deviceMotion: DeviceMotion) { 
    this.form = this.formBuilder.group({
      'password' : ['',[Validators.required]],  
    });
  }

  ngOnInit() {
  }

  logOut()
  {
    this.as.logOut();
  }

  encenderAlarma()
  {
    this.activada = true;
    this.comenzar();
  }

  apagarAlarma()
  {
    
    if(this.form.get('password')?.value == this.as.logeado.password)
    {
        this.activada = false;
        this.MostrarToastApagada('Alarma desactivada').then((toast : any) => {
          toast.present();
        });
        this.form.reset();
        this.subscription.unsubscribe();
        this.primerIngreso = true;
        this.audio.pause();
    }
    else
    {
      this.MostrarToast('La contraseña es incorrecta').then((toast : any) => {
        toast.present();
      });
    }
  }

  MostrarToast(message : string)
  {
    return this.toastController.create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: "danger"
    });
  }

  MostrarToastApagada(message : string)
  {
    return this.toastController.create({
            header: 'Desactivada',
            message: message,
            buttons: ['Ok'],
            position: 'top',
            color: "light"
    });
  }

  comenzar(){
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      if(acceleration.x > 5){
        //Inclinacion Izquierda
        
        this.posicionActualCelular = 'izquierda';
        this.movimientoIzquierda();
      }
      else if (acceleration.x < -5) {
        //Inclinacion Derecha
        
        this.posicionActualCelular = 'derecha';
        this.movimientoDerecha();        
      }
      else if (acceleration.y >= 9) {
        //encender flash por 5 segundos y sonido
        this.posicionActualCelular='arriba';
        
        if ((this.posicionActualCelular!=this.posicionAnteriorCelular)) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }
        this.audio.play();
        this.movimientoVertical();
      }

      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.posicionActualCelular='plano';
        this.movimientoHorizontal();
      }


    });
  }

  movimientoIzquierda(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!= this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical(){
    if(this.primerIngresoFlash){
      this.primerIngresoFlash ? this.flashlight.switchOn() : false;
      setTimeout(() => {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.primerIngreso = false;
    }
  }

  movimientoHorizontal(){
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular='plano';
      this.audio.src = this.audioHorizontal;
    }

    this.primerIngreso ? null : this.audio.play();
    this.primerIngreso ? null : this.vibration.vibrate(5000);
    this.primerIngreso = true;
    this.primerIngresoFlash = true;
  }

}

