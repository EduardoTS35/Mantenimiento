import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Actividades } from 'src/app/api/actividades';
import { dialogActividad } from 'src/app/common/actividades/dialogActividad.component';
import { DialogDeleteComponent } from 'src/app/common/delete/dialogdelete.component';
import { ApiActividadesService } from 'src/app/service/api-actividades.service';
import { TagModule } from 'primeng/tag';
import { ApiActividadesCorrectivas } from 'src/app/service/api-actividadesCorrectivas';
import { ActividadesCorrectivas } from 'src/app/api/actividadesCorrectivas';
import { dialogActividadesCorrectivas } from 'src/app/common/dialogActividadesCorrectivas/dialogActividadesCorrectivas.component';
import { ApiUsuarioService } from 'src/app/service/api-usuario.service';


@Component({
    templateUrl: './actividadesCorrectivas.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class actividadesCorrectivas implements OnInit {

    public lst!: Actividades[];


    selectedActividades:Actividades[];

    rowsPerPageOptions = [5, 10, 20];

    readonly width: string='300px';

    public columnas:any[]=[
      {label: 'Código', value: 'idActividad'},
      {label: 'Nombre Actividad', value: 'idActividad'},
      {label: 'Área', value: 'idArea'},
      {label: 'Cód. Máquina', value: 'idMaquina'},
      {label: 'Recurso Humano', value: 'recursoHumano'},
      {label: 'Descripción', value: 'descripcion'},
      {label: 'Tiempo', value: 'tiempo'},
      {label: 'Periodo', value: 'periodo'},
      {label: 'Fecha Programada', value: 'fechaProgramada'},
      {label: 'Asignada', value: 'asignada'},
      {label: 'Acciones', value: 'actions'}
    ]
  rolId: number;

    constructor(public dialog:MatDialog,
                public snackBar:MatSnackBar,
                private actividadesService: ApiActividadesCorrectivas, 
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private _userService:ApiUsuarioService,
                ) {}

    ngOnInit() {
        this.getActividades();
        this.getRol();
    }
    getRol(){
      this.rolId= this._userService.usuarioData.idRol;
    }

    getActividades(){
        this.actividadesService.getActividadesCorrectivas().subscribe( response=>{
          this.lst = response.data;
        });
      }


    openAdd(){
    const dialogRef=this.dialog.open(dialogActividadesCorrectivas,{
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getActividades();
    });
  }

  openEdit(actividad:ActividadesCorrectivas){
    this.actividadesService.getActividad(actividad);
    this.actividadesService.actividadesCorrectivas=actividad;
    const dialogRef=this.dialog.open(dialogActividadesCorrectivas, {      
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.getActividades();
    });
  }

    deleteActividades(actividad: ActividadesCorrectivas) {
        
        const dialogRef=this.dialog.open(DialogDeleteComponent,{
            width:this.width
          });
          dialogRef.afterClosed().subscribe(result=>{
            if(result===true){
              this.actividadesService.deleteActividadesCorrectivas(actividad.id).subscribe(response=>{
                if(response.exito === 1){
                  this.snackBar.open('Actividad eliminada con éxito.','',{
                    duration:2000
                  })
                  this.getActividades();
                }
              });
            }
          });  
    }
}
