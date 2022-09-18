import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  perfiles: string[] = ['Administrador', 'Anónimo', 'Casual'];
  checkedInvi : boolean = false;
  checkedAdmin : boolean = false;
  checkedAnoni : boolean = false;
  email : string = "";
  password : string = "";
  form : FormGroup;

  constructor(private formBuilder : FormBuilder, private as : AuthService, private router : Router) 
  { 
    this.form = this.formBuilder.group({
      'email' : ['',[Validators.required,Validators.email]],
      'password' : ['',[Validators.required,Validators.minLength(6)]],  
    });
  }

  ngOnInit() {
  }

  login()
  {
    this.email = this.form.get('email')?.value,
    this.password = this.form.get('password')?.value 
    this.as.login(this.email,this.password);
    setTimeout(() => {
      this.form.reset();
      this.checkedAdmin = false;
      this.checkedAnoni = false;
      this.checkedInvi = false;
    }, 5000);
  }

  cargarDatos(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.email = "anonimo@anonimo.com";
          this.password = "anonimo123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 2:
          this.email = "invitado@invitado.com";
          this.password = "invitado123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case 3:
          this.email = "admin@admin.com";
          this.password = "admin123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
    }
  }

  onChangeAdmin(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.checkedAdmin = true;
      this.checkedAnoni = false;
      this.checkedInvi = false;
      this.cargarDatos(3);
    }
    else
    {
      this.checkedAdmin = false;
      this.email = "";
      this.password = "";
      this.form.get('email')?.setValue(this.email);
      this.form.get('password')?.setValue(this.password);
    }
  }

  onChangeAnonimo(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.checkedAnoni = true;
      this.checkedInvi = false;
      this.checkedAdmin = false;

      this.cargarDatos(1);
    }
    else
    {
      this.checkedAnoni = false;
      this.email = "";
      this.password = "";
      this.form.get('email')?.setValue(this.email);
      this.form.get('password')?.setValue(this.password);
    }
  }

  onChangeInvitado(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.checkedInvi = true;
      this.checkedAnoni = false;
      this.checkedAdmin = false;
      
      this.cargarDatos(2);
    }
    else
    { 
      this.checkedInvi = false;
      this.email = "";
      this.password = "";
      this.form.get('email')?.setValue(this.email);
      this.form.get('password')?.setValue(this.password);
    }
  }


  volverInicio()
  {  
    this.as.loading = true;

      setTimeout(() => {
        this.as.loading = false;
        this.router.navigate(['/home']);
        
      }, 1000);
    
  }

}

