import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Areas } from '../api/areas';
import { Maquinas } from '../api/maquinas';
import { Response } from '../api/response';

const httpOption={
    headers: new HttpHeaders({
      'Contend-Type':'application/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })
  export class ApiMaquinariaService {
  
    url:string = 'http://smantenimientosh-001-site1.htempurl.com/api/Maquinaria';
    maquina: Maquinas;
  
    constructor(
      private _http : HttpClient
    ) { }
  
    getMaquinaria(): Observable<Response>{
      return this._http.get<Response>(this.url);
    }
    addMaquinaria(area:Areas):Observable<Response>{
      return this._http.post<Response>(this.url, area, httpOption);
    }
    
    editMaquinaria(area:Areas):Observable<Response>{
      return this._http.put<Response>(this.url,area,httpOption);
    }
  
    deleteMaquinaria(id:number):Observable<Response>{
      return this._http.delete<Response>(`${this.url}/${id}`);
    }

    getMaquina(maquina:Maquinas){
      this.maquina=maquina;
    }
}