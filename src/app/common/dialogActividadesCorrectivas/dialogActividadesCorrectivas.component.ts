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
import { ApiActividadesCorrectivas } from 'src/app/service/api-actividadesCorrectivas';
import { ActividadesCorrectivas } from 'src/app/api/actividadesCorrectivas';
import { ApiUsuarioService } from 'src/app/service/api-usuario.service';

@Component({
	templateUrl: 'dialogActividadesCorrectivas.component.html',

})
export class dialogActividadesCorrectivas implements OnInit {
	value8: any;
	value9: any;
	public lst!: Areas[];
	public list!: Maquinas[];
	public list2!: Maquinas[];

	public idActividad: number;


	public nombreActividad: string;
	public recursoHumano: number;
	public tiempo: number;
	public periodo: number;
	public fechaProgramada: Date;
	public actividad: ActividadesCorrectivas;

	//Variables a usar
	idArea: number;
	idOrden: number;
	idMaquina: number;
	idTrabajador: number;
	tiempoParo: number;
	descripcion: string;
	selectedDate: Date;

	constructor(private snackBar: MatSnackBar,
		private nodeService: NodeService,
		private _areaService: ApiAreaService,
		private _maquinariaService: ApiMaquinariaService,
		private _actividadCorrectivaService:ApiActividadesCorrectivas,
		public dialogRef: MatDialogRef<dialogActividadesCorrectivas>,
		public pdialogRef: DialogModule,
		private usuarioService:ApiUsuarioService
	) { }

	ngOnInit() {
		this._areaService.getAreas().subscribe(response => {
			this.lst = response.data;
		});
		this.getActividad();
		this.selectedDate=new Date();
	}
	close() {
		this.dialogRef.close();
		this._actividadCorrectivaService.actividadesCorrectivas = null;
	}

	getActividad() {
		this.actividad = this._actividadCorrectivaService.actividadesCorrectivas;
	}

	getMaquinaria(id: number) {
		this._maquinariaService.getMaquinaria().subscribe(response => {
			this.list = response.data;
		});
		this.list2 = this.list.filter(item => item.idArea === id);
	}

	addActividad() {
		const usuario=this.usuarioService.usuarioData.idUsuario;
		const actividadCorrectiva: ActividadesCorrectivas = {
			id: 0, idOrden: "1", 
			idMaquina: this.idMaquina,
			idTrabajador:usuario, 
			tiempoParo: this.tiempoParo,
			descripcion: this.descripcion,
			fecha: this.selectedDate,
			
		};
		this._actividadCorrectivaService.addActividadesCorrectivas(actividadCorrectiva).subscribe(response => {
			if (response.exito === 1) {
				this.dialogRef.close();
				this.snackBar.open('La actividad se insertó correctamente', '', {
					duration: 2000
				});
				this._actividadCorrectivaService.actividadesCorrectivas = null;
			}
		});
	}

	editActividad() {
		const usuario=this.usuarioService.usuarioData.idUsuario;
		const actividadCorrectiva: ActividadesCorrectivas = {
			id: this.actividad.id,
			idOrden: "1",
			idMaquina: this.idMaquina,
			idTrabajador:usuario,  
			tiempoParo: this.tiempoParo,
			descripcion: this.descripcion,
			fecha: this.selectedDate,
		};

		this._actividadCorrectivaService.editActividadesCorrectivas(actividadCorrectiva).subscribe(response => {
			if (response.exito === 1) {
				this.dialogRef.close();
				this.snackBar.open('Actividad editada correctamente', '', {
					duration: 2000
				});
			}
		});
	}

}