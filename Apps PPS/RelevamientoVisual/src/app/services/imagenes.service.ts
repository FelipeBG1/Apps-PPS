import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getStorage, ref, uploadString } from "firebase/storage"
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(public as : AuthService, private afs : AngularFireStorage, private fs : FirestoreService) { }

  public async addNewToGallery(foto : any, tema : number) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true
    });

    let storage = getStorage();
    let date = new Date().getTime();
    let nombre = `${this.as.logeado.email} ${date}`;

    let fecha = new Date();

    let fechaFinal = String(fecha.getDate()).padStart(2, '0') + '/' + String(fecha.getMonth() + 1).padStart(2, '0') + '/' + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    
    foto.hora = fechaFinal;
    let storageRef = ref(storage, nombre);

    let url = this.afs.ref(nombre);


    uploadString(storageRef,capturedPhoto.dataUrl, 'data_url').then(()=>{
      url.getDownloadURL().subscribe((url1 : any)=>{
        foto.pathFoto = url1;
        this.fs.agregarFoto(foto,tema);
      })
    });
    
  }

}