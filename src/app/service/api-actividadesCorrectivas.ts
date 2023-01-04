import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ActividadesCorrectivas } from '../api/actividadesCorrectivas';
import { Response } from '../api/response';

const httpOption={
    headers: new HttpHeaders({
      'Contend-Type':'application/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })
  export class ApiActividadesCorrectivas {
  
    url:string = 'http://localhost:443/api/ActividadesCorrectivas';
    public actividadesCorrectivas:ActividadesCorrectivas;
  
    constructor(
      private _http : HttpClient
    ) { }
  
    getActividadesCorrectivas(): Observable<Response>{
      return this._http.get<Response>(this.url);
    }
    addActividadesCorrectivas(actividadesCorrectivas:ActividadesCorrectivas):Observable<Response>{
      return this._http.post<Response>(this.url, actividadesCorrectivas, httpOption);
    }
    
    editActividadesCorrectivas(actividadesCorrectivas:ActividadesCorrectivas):Observable<Response>{
      return this._http.put<Response>(this.url,actividadesCorrectivas,httpOption);
    }
  
    deleteActividadesCorrectivas(id:number):Observable<Response>{
      return this._http.delete<Response>(`${this.url}/${id}`);
    }
    getActividad(actividadesCorrectivas:ActividadesCorrectivas){
      this.actividadesCorrectivas=actividadesCorrectivas;
    }
}