import { Component, OnInit } from '@angular/core';
import { Maquinas } from 'src/app/api/maquinas';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { ApiActividadesService } from 'src/app/service/api-actividades.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dialogActividad } from '../actividades/dialogActividad.component';
import { ApiTrabajadorService } from 'src/app/service/api-trabajadores.service';
import { Trabajadores } from 'src/app/api/trabajadores';
import { RegistroActividades } from 'src/app/api/registroActividades';
import { ApiRegistroActividadesService } from 'src/app/service/api-registroactividades.service';
import { RegistroActividades2 } from 'src/app/api/registroActividades2';
import { Actividades } from 'src/app/api/actividades';

@Component({
    templateUrl: 'dialogRegistroActividades.html',
})
export class dialogRegistroActividades implements OnInit{
    value8: any;
    value9: any;
    public lst!: Trabajadores[];
    public list!:Maquinas[];
	public list2!:Maquinas[];
	public actividad:Actividades;

	public id?:number;
    public idOrden?:string;
    public idActividad?:number;
    public idMaquina?:number;
    public idTrabajador?:number;
    public fechaProgramada?:Date;
    public notas?:string;
    public idTrabajadorSupervisor?:any;
	public fechaRealizacion:Date;
	public periodo?:number;
	fecha:Date;

    selectedDate:any;


    constructor(private snackBar:MatSnackBar, 
				private _trabajadorService:ApiTrabajadorService,
				private _registroActividadService:ApiRegistroActividadesService,
				private _actividadService:ApiActividadesService,
                public dialogRef:MatDialogRef<dialogActividad>,
				public pdialogRef:DialogModule,
				) {}

    ngOnInit() {
        this._trabajadorService.getTrabajadores().subscribe( response=>{
            this.lst = response.data;
          });
		  this.fechaRealizacion= new Date();
		  this.getActividad();
    }
    close() {
        this.dialogRef.close();
		this._actividadService.Actividad=null;
    }

	getActividad(){
		this.actividad=this._actividadService.Actividad;
	}

	editActividad(){
		
		const actividad:RegistroActividades2={
									id:this._registroActividadService.id,
									idOrden:this._registroActividadService.idOrden,
									idActividad: this._registroActividadService.idActividad,
									idMaquina:this._registroActividadService.idMaquina,
									idTrabajador:this._registroActividadService.idTrabajador,
									fechaProgramada:this._registroActividadService.fechaProgramada,
									fechaRealizacion:this.fechaRealizacion,
									notas:this.notas,
									idTrabajadorSupervisor:this.idTrabajadorSupervisor
								 };

		this._registroActividadService.editActividades(actividad).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Actividad revisada correctamente.','',{
					duration:2000
				});
			}else{
				this.dialogRef.close();
				this.snackBar.open('Surgió un error.','',{
					duration:2000
				});
			}
		});
	}

	addDaysToDate(date, days){
		this.fecha = new Date(date);
		this.fecha.setDate(this.fecha.getDate() + days);
		return this.fecha;
	}

	reprogramarActividad(){
		this.addDaysToDate(this.actividad.fechaProgramada,this.actividad.periodo);
		const actividad:Actividades={
								idActividad:this.actividad.idActividad,
								fechaProgramada: this.fecha,
								idArea:this.actividad.idArea,
								idMaquina:this.actividad.idMaquina,
								nombreActividad:this.actividad.nombreActividad,
								recursoHumano:this.actividad.recursoHumano,
								descripcion:this.actividad.descripcion,
								tiempo:this.actividad.tiempo,
								periodo:this.actividad.periodo,
								asignada:0
		};
		this._actividadService.editActividades(actividad).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Actividad actualizada correctamente.','',{
					duration:2000
				});
			}else{
				this.dialogRef.close();
				this.snackBar.open('Surgió un error.','',{
					duration:2000
				});
			}
		}
		);
	}
    
}