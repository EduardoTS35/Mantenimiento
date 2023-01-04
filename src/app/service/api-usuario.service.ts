import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';
import { Response } from '../api/response';
import { Usuario } from '../api/usuario';

const httpOption={
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
};

  @Injectable({
    providedIn: 'root'
  })
  export class ApiUsuarioService {
  
    private usuarioSubject:BehaviorSubject<Usuario>;
    url:string = 'http://localhost:443/login';
    public get usuarioData():Usuario{
      return this.usuarioSubject.value;
    }
  
    constructor(
      private _http : HttpClient
    ) {
      this.usuarioSubject= new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
     }

  
    Login(usuario:string,pass:string):Observable<Response>{
      return this._http.post<Response>(this.url, {usuario,pass}, httpOption).pipe(
        map(res=>{
          if(res.exito===1){
            const usuario:Usuario=res.data;
            localStorage.setItem('usuario',JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
          }
          return res;
        })
      );
    }

    Logout(){
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null);
    }

}