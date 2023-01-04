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
    templateUrl: 'dialogArea.component.html',
})
export class dialogArea implements OnInit{
    value8: any;
    value9: any;

	public idArea:number;
	public descripcion:string;
	public area:Areas;

    selectedDate:any;

    constructor(private snackBar:MatSnackBar, 
                private nodeService: NodeService,
                private _areaService:ApiAreaService,
                public dialogRef:MatDialogRef<dialogArea>,
				public pdialogRef:DialogModule,
				) {}

    ngOnInit() {
		  this.getArea();
    }
    close() {
        this.dialogRef.close();
        this._areaService.area=null;
    }

	getArea(){
		this.area=this._areaService.area;
	}


	addArea(){
		const area:Areas={
            idArea:0,
			descripcion:this.descripcion
		 };
		this._areaService.addAreas(area).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Área insertada correctamente','',{
					duration:2000
				});
				this._areaService.area=null;
			}
		});
	}

	editArea(){
		const area:Areas={
                            idArea:this.area.idArea,									
                            descripcion:this.descripcion
						 };

		this._areaService.editAreas(area).subscribe(response=>{
			if(response.exito===1){
				this.dialogRef.close();
				this.snackBar.open('Área editada correctamente','',{
					duration:2000
				});
			}
		});
	}
    
}