import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ApiUsuarioService } from '../service/api-usuario.service';

@Injectable({ providedIn: 'root' })
export class RolGuardSupervisor implements CanActivate {

    constructor(private route: Router,
                private apiUsuarioService:ApiUsuarioService) {

    }

    canActivate(route: ActivatedRouteSnapshot) {
        const usuario=this.apiUsuarioService.usuarioData;

        if(usuario.idRol===2 || usuario.idRol===1){
            return true;
        }
        this.route.navigate(['/pages/login'])
        return false;
    }
}