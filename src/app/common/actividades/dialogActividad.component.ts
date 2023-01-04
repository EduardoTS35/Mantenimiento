import { Component, Inject, OnInit } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { NodeService } from '../../service/nodeservice';
import { SelectItem } from 'primeng/api';
import { ApiAreaService } from 'src/app/service/api-areas.service';
import { Areas } from 'src/app/api/areas';
import { Maquinas } from 'src/app/api/maquinas';
import { ApiMaquinariaService } from 'src/app/service/api-maquinaria.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrimeTemplate } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Actividades } from 'src/app/api/actividades';
import { ApiActividadesService } from 'src/app/service/api-actividades.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivationStart } from '@angular/router';

@Component({
    templateUrl: 'dialogActividad.component.html',
    styleUrls: ['dialogActividad.component.scss']
})
export class dialogActividad implements OnInit{
    value8: any;
    value9: any;
    public lst!: Areas[];
    public list!:Maquinas[];
	public list2!:Maquinas[];

	public idActividad:number;
	public idArea:number;
	public idMaquina:number;
	public nombreActividad:string;
	public recursoHumano:number;
	public descripcion:string;
	public tiempo:number;
	public periodo:number;
	public fechaProgramada:Date;
	public actividad:Actividades;

    selectedDate:any;

    constructor(private snackBar:MatSnackBar, 
                private nodeService: NodeService,
                private _areaService:ApiAreaService,
                private _maquinariaService:ApiMaquinariaService,
				private _actividadService:ApiActividadesService,
                public dialogRef:MatDialogRef<dialogActividad>,
				public pdialogRef:DialogModule,
				) {}

    ngOnInit() {
        this._areaService.getAreas().subscribe( response=>{
            this.lst = response.data;
          });
		  this.getActividad();
    }


    close() {
        this.dialogRef.close();
		this._actividadService.Actividad=null;
    }

	getActividad(){
		this.actividad=this._actividadService.Actividad;
		if(this._actividadService.Actividad!=null){
			this.idArea=this._actividadService.Actividad.idArea;
			this.idMaquina=this._actividadService.Actividad.idMaquina;
			this.nombreActividad=this.actividad.nombreActividad;
			this.recursoHumano=this._actividadService.Actividad.recursoHumano;
			this.tiempo=this._actividadService.Actividad.tiempo;
			this.periodo=this._actividadService.Actividad.periodo;
			this.descripcion=this._actividadService.Actividad.descripcion;
			this.fechaProgramada=this._actividadService.Actividad.fechaProgramada;
		}
	}

	getMaquinaria(id:number){
		this._maquinariaService.getMaquinaria().subscribe( response=>{
            this.list = response.data;
          });
		  this.list2 = this.list.filter(item =>item.idArea === id);
	}

	addActividad(){
		const actividad:Actividades={idActividad:0,idArea: this.idArea, idMaquina:this.idMaquina,nombreActividad:this.nombreActividad,
			recursoHumano:this.recursoHumano,
			descripcion:this.descripcion,
			tiempo:this.tiempo,
			periodo:this.periodo,
			fechaProgramada:this.fechaProgramada
		 };
		this._actividadService.addActividades(actividad).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('La actividad se insertó correctamente','',{
					duration:2000
				});
				this._actividadService.Actividad=null;
			}
		});
	}

	editActividad(){
		const actividad:Actividades={idActividad: this.actividad.idActividad,
									idArea:this.idArea,
									idMaquina:this.idMaquina,
									nombreActividad:this.nombreActividad,
									recursoHumano:this.recursoHumano,
									descripcion:this.descripcion,
									tiempo:this.tiempo,
									periodo:this.periodo,
									fechaProgramada:this.fechaProgramada,
									asignada:this.actividad.asignada };

		this._actividadService.editActividades(actividad).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Actividad editada correctamente','',{
					duration:2000
				});
			}
		});
	}
    
}