
export interface Actividades{
   idActividad?:number;
   idArea?:number;
   idMaquina?:number;
   nombreActividad?:string;
   recursoHumano?:number;
   descripcion?:string;
   tiempo?:number;
   periodo?:number;
   fechaProgramada?:Date;
   asignada?:number;
   
   idMaquinaNavigation?:{
      idMaquina:number,
      idArea:number,
      descripcion:string,
      modelo:string,
      añoFabricacion:number,
      numeroSerie:string

   }
}