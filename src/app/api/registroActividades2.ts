export interface RegistroActividades2{
    id?:number;
    idOrden?:string;
    idActividad?:number;
    idMaquina?:number;
    idTrabajador?:number;
    fechaProgramada?:Date;
    fechaRealizacion?:Date;
    notas?:string;
    idTrabajadorSupervisor?:any;
    periodo?:number;
}