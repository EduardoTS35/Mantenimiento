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
    templateUrl: 'dialogMaquinas.component.html',
})
export class dialogMaquinas implements OnInit{
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
	public maquina:Maquinas;
    modelo: string;
    numeroSerie: string;

    constructor(private snackBar:MatSnackBar, 
                private nodeService: NodeService,
                private _areaService:ApiAreaService,
                private _maquinariaService:ApiMaquinariaService,
                public dialogRef:MatDialogRef<dialogMaquinas>,
				public pdialogRef:DialogModule,
				) {}

    ngOnInit() {
        this._areaService.getAreas().subscribe( response=>{
            this.lst = response.data;
          });
		  this.getMaquina();
    }
    close() {
        this.dialogRef.close();
        this._maquinariaService.maquina=null;
    }

	getMaquina(){
		this.maquina=this._maquinariaService.maquina;
	}

	addMaquina(){
		const maquina:Maquinas={
            idMaquina:0,
            idArea: this.idArea,
			descripcion:this.descripcion,
			modelo:this.modelo,
            añoFabricacion:2000,
			numeroSerie:this.numeroSerie
		 };
		this._maquinariaService.addMaquinaria(maquina).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('La maquina se insertó correctamente','',{
					duration:2000
				});
				this._maquinariaService.maquina=null;
			}
		});
	}

	editMaquina(){
		const maquina:Maquinas={
            idMaquina:this.maquina.idMaquina,
            idArea: this.idArea,
			descripcion:this.descripcion,
			modelo:this.modelo,
            añoFabricacion:2000,
			numeroSerie:this.numeroSerie 
        };

		this._maquinariaService.editMaquinaria(maquina).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Maquina editada correctamente','',{
					duration:2000
				});
			}
		});
	}
    
}