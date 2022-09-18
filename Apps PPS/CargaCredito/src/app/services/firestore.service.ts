import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  perfilesCollectionReference: any;
  perfiles: Observable<any>;

  perfilesArray : any = [];

  
  constructor(private angularF : AngularFirestore) 
  {
    this.perfilesCollectionReference = this.angularF.collection<any>('perfiles');
    this.perfiles = this.perfilesCollectionReference.valueChanges({idField: 'id'});

    this.traerPerfiles().subscribe(value => {
      this.perfilesArray = value;
    });
  }

  traerPerfiles()
  {
    return this.perfiles;
  }

  modificarPerfil(perfil : any,id : any)
  {
    return this.angularF.collection('perfiles').doc(id).update(perfil);
  }

}