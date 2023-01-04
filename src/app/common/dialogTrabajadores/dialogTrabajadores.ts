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
import { Trabajadores } from 'src/app/api/trabajadores';
import { ApiTrabajadorService } from 'src/app/service/api-trabajadores.service';

@Component({
    templateUrl: 'dialogTrabajadores.html',
})
export class dialogTrabajadores implements OnInit{
    value8: any;
    value9: any;
    public lst!: Areas[];

	public idActividad:number;
	public idArea:number;
	public nombre:string;
	public apellido:string;
	public puesto:string;
	public usuario:string;
	public pass:string;
	public trabajador:Trabajadores;

    selectedDate:any;

    constructor(private snackBar:MatSnackBar, 
                private nodeService: NodeService,
                private _areaService:ApiAreaService,
				private _trabajadoresService:ApiTrabajadorService,
                public dialogRef:MatDialogRef<dialogTrabajadores>,
				public pdialogRef:DialogModule,
				) {}

    ngOnInit() {
        this._areaService.getAreas().subscribe( response=>{
            this.lst = response.data;
          });
		  this.getTrabajador();
    }
    close() {
        this.dialogRef.close();
        this._trabajadoresService.trabajador=null;
    }

	getTrabajador(){
		this.trabajador=this._trabajadoresService.trabajador;
	}


	addTrabajador(){
		const trabajador:Trabajadores={
            idTrabajador:0,
            idArea: this.idArea,
            nombre:this.nombre,
			apellido:this.apellido,
			puesto:this.puesto,
			usuario:this.usuario,
			pass:this.pass,
		 };
		this._trabajadoresService.addTrabajadores(trabajador).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('El trabajador se insertó correctamente','',{
					duration:2000
				});
				this._trabajadoresService.trabajador=null;
			}
		});
	}

	editTrabajador(){
		const trabajador:Trabajadores={
            idTrabajador:this._trabajadoresService.trabajador.idTrabajador,
            idArea: this.idArea,
            nombre:this.nombre,
			apellido:this.apellido,
			puesto:this.puesto,
			usuario:this.usuario,
			pass:this.pass,
		 };

		this._trabajadoresService.editTrabajadores(trabajador).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Trabajador editado correctamente','',{
					duration:2000
				});
			}
		});
	}
    
}