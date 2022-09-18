import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usuariosCollectionReference: any;
  usuarios: Observable<any>;

  usuariosArray : any = [];

  
  constructor(private angularF : AngularFirestore) 
  {
    this.usuariosCollectionReference = this.angularF.collection<any>('usuarios');
    this.usuarios = this.usuariosCollectionReference.valueChanges({idField: 'id'});

    this.traerUsuarios().subscribe(value => {
      this.usuariosArray = value;
    });
  }

  traerUsuarios()
  {
    return this.usuarios;
  }

  agregarUsuario(usuario : any)
  {
    this.usuariosCollectionReference.add({...usuario}); 
  }
}