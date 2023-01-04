import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { ApiUsuarioService } from 'src/app/service/api-usuario.service';
import { Usuario } from 'src/app/api/usuario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  

  valCheck: string[] = ['remember'];

  password: string;

  user:string;
  
  config: AppConfig;
  
  subscription: Subscription;

  usuario:Usuario;
  appMain: any;

  mensaje:string;

  constructor(public configService: ConfigService,
              public apiAuth:ApiUsuarioService,
              private router:Router,
              private snackBar:MatSnackBar){ 
                if(apiAuth.usuarioData){
                  this.router.navigate(['/']);
                }
              }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  login(){
    this.apiAuth.Login(this.user,this.password).subscribe(response=>{
      if(response.exito===1){
        this.router.navigate(['/']);
        this.snackBar.open('Bienvenido.','',{
          duration:3000
        });
      }
    });
    const form= document.forms.item(0);
    form.reset();
    this.snackBar.open('Usuario o contraseña incorrecta.','',{
      duration:2000
    });

  }
}
