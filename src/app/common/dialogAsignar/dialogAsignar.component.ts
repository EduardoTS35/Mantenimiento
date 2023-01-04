import { Component, Inject, OnInit } from '@angular/core';
import { NodeService } from '../../service/nodeservice';;
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
import { ApiTrabajadorService } from 'src/app/service/api-trabajadores.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as printJS from 'print-js';


@Component({
    templateUrl: 'dialogAsignar.component.html',
})
export class dialogAsignar implements OnInit{
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
    public asignada:number;

    public idTrabajador:number;
    public ordenTrabajo:string;
    
    public form:FormGroup;

    selectedDate:any;

    constructor(private snackBar:MatSnackBar, 
                private nodeService: NodeService,
                private _areaService:ApiAreaService,
                private _maquinariaService:ApiMaquinariaService,
				private _actividadService:ApiActividadesService,
                private _trabajadorService:ApiTrabajadorService,
                public dialogRef:MatDialogRef<dialogAsignar>,
				public pdialogRef:DialogModule,
                public formBiulder:FormBuilder,
				@Inject(MAT_DIALOG_DATA) public actividad:Actividades) {}

    ngOnInit() {     
        this._trabajadorService.getTrabajadores().subscribe( response=>{
            this.lst = response.data;
          });

    }
    close() {
        this.dialogRef.close();
		this._actividadService.Actividad=null;
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
				this.snackBar.open('Actividad se insertó correctamente','',{
					duration:2000
				});
			}
		});
	}

	editActividad(){
		const actividad:Actividades={idActividad: this.actividad.idActividad,
									idArea:this.actividad.idArea,
									idMaquina:this.actividad.idMaquina,
									nombreActividad:this.actividad.nombreActividad,
									recursoHumano:this.actividad.recursoHumano,
									descripcion:this.actividad.descripcion,
									tiempo:this.actividad.tiempo,
									periodo:this.actividad.periodo,
									fechaProgramada:this.actividad.fechaProgramada,
									asignada:this.asignada };

		this._actividadService.editActividades(actividad).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Actividad editada correctamente','',{
					duration:2000
				});
			}
		});
	}

    generarOrden(){
        let num = Math.round(Math.random()*1000);
		
        this.ordenTrabajo="RO"+num;
        
    }

	print(){
		
	}
    
}