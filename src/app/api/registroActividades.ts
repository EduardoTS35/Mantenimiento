export interface RegistroActividades{
    id?:number;
    idOrden?:string;
    idActividad?:number;
    idMaquina?:number;
    idTrabajador?:number;
    fechaProgramada?:Date;
    fechaRealizacion?:Date;
    notas?:string;
    idTrabajadorSupervisor?:any;

    idActividadNavigation?:{
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
    };
    
    descripcionM?:string;
 }