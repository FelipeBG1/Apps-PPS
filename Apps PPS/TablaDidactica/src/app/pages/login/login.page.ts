import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  perfiles: string[] = ['Administrador', 'Anónimo', 'Invitado'];
  email : string = "";
  password : string = "";
  form : FormGroup;
  perfil : any = "";

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
      this.perfil = "";
    }, 4000);
  }

  cargarDatos(perfil : string)
  {
    switch(perfil)
    {
        case "Anónimo":
          this.email = "anonimo@anonimo.com";
          this.password = "anonimo123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
        case "Invitado":
            this.email = "invitado@invitado.com";
            this.password = "invitado123";
            this.form.get('email')?.setValue(this.email);
            this.form.get('password')?.setValue(this.password);
            break;
        case "Administrador":
          this.email = "admin@admin.com";
          this.password = "admin123";
          this.form.get('email')?.setValue(this.email);
          this.form.get('password')?.setValue(this.password);
          break;
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
