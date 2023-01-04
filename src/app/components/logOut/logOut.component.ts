import { Component } from '@angular/core';
import { ApiUsuarioService } from 'src/app/service/api-usuario.service';

@Component({
  selector: 'app-error',
  templateUrl: './logOut.component.html',
  
})
export class LogOutComponent {

    constructor(
        private apiUsuarioService:ApiUsuarioService
    ){  
        this.logOut();
      }

    logOut(){
        this.apiUsuarioService.Logout();

    }
}