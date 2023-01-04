import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUsuarioService } from "../service/api-usuario.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private apiUsuarioService:ApiUsuarioService){

    }

    intercept(request:HttpRequest<any>,next:HttpHandler):
    Observable<HttpEvent<any>>{
        const usuario=this.apiUsuarioService.usuarioData;

        if(usuario){
            request=request.clone({
                setHeaders:{
                    Authorization:`Bearer ${usuario.token}`
                }
            });
        }
        return next.handle(request);
    }
}