import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Actividades } from 'src/app/api/actividades';
import { RegistroActividades } from 'src/app/api/registroActividades';
import { Trabajadores } from 'src/app/api/trabajadores';
import { dialogActividad } from 'src/app/common/actividades/dialogActividad.component';
import { DialogDeleteComponent } from 'src/app/common/delete/dialogdelete.component';
import { dialogAsignar } from 'src/app/common/dialogAsignar/dialogAsignar.component';
import { ApiActividadesService } from 'src/app/service/api-actividades.service';
import { ApiRegistroActividadesService } from 'src/app/service/api-registroactividades.service';
import { ApiTrabajadorService } from 'src/app/service/api-trabajadores.service';
import * as printJS from 'print-js';
import { ApiUsuarioService } from 'src/app/service/api-usuario.service';

@Component({
  templateUrl: './formlayout.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class FormLayoutComponent {

  rolId:number;

  public lst!: Actividades[];

  public lstT!: Trabajadores[];

  public actividadesOrden;


  selectedActividades: Actividades[];

  rowsPerPageOptions = [5, 10, 20];

  readonly width: string = '300px';

  public columnas: any[] = [
    { label: 'Código', value: 'idActividad' },
    { label: 'Nombre Actividad', value: 'idActividad' },
    { label: 'Área', value: 'idArea' },
    { label: 'Cód. Máquina', value: 'idMaquina' },
    { label: 'Recurso Humano', value: 'recursoHumano' },
    { label: 'Descripción', value: 'descripcion' },
    { label: 'Tiempo', value: 'tiempo' },
    { label: 'Periodo', value: 'periodo' },
    { label: 'Fecha Programada', value: 'fechaProgramada' },
    { label: 'Asignada', value: 'asignada' },
    { label: 'Acciones', value: 'actions' }
  ]
  ordenTrabajo="";
  idTrabajador=0;

  registroActividades:JSON;
  

  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private actividadesService: ApiActividadesService,
    private _registroService: ApiRegistroActividadesService,
    private messageService: MessageService,
    private _trabajadorService: ApiTrabajadorService,
    private confirmationService: ConfirmationService,
    private _userService:ApiUsuarioService) { }

  ngOnInit() {
    this.getActividades();
    this.getTrabajadores();
    this.getRol();
  }

  getActividades() {
    this.actividadesService.getActividades().subscribe(response => {
      this.lst = response.data;
      
    });
  }

  filtroOrden(){
    this._registroService.getActividades().subscribe(response =>{
      const actividadesData=response.data;
      const filtrado= actividadesData.filter(actividad=> actividad.idOrden === this.ordenTrabajo);
      this.registroActividades=filtrado;
      
    });

    
  }

  getRol(){
    this.rolId= this._userService.usuarioData.idRol;
  }
  getTrabajadores() {
    this._trabajadorService.getTrabajadores().subscribe(response => {
      this.lstT = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(dialogActividad, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getActividades();
    });
  }

  openEdit(actividad: Actividades) {
    const dialogRef = this.dialog.open(dialogAsignar, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getActividades();
    });
  }

  deleteActividades(actividad: Actividades) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.actividadesService.deleteActividades(actividad.idActividad).subscribe(response => {
          if (response.exito === 1) {
            this.snackBar.open('Actividad eliminada con éxito.', '', {
              duration: 2000
            })
            this.getActividades();
          }
        });
      }
    });
  }

  asignarActividad(actividad: Actividades, asignar) {
    if (this.idTrabajador>0 && this.ordenTrabajo!="" ) {
      actividad = {
        idActividad: actividad.idActividad,
        idArea: actividad.idArea,
        idMaquina: actividad.idMaquina,
        nombreActividad: actividad.nombreActividad,
        recursoHumano: actividad.recursoHumano,
        descripcion: actividad.descripcion,
        tiempo: actividad.tiempo,
        periodo: actividad.periodo,
        fechaProgramada: actividad.fechaProgramada,
        asignada: asignar
      };
      const registroActividades:RegistroActividades={
        id:0,
        idOrden:this.ordenTrabajo,
        idActividad:actividad.idActividad,
        idMaquina:actividad.idMaquina,
        idTrabajador:this.idTrabajador,
        fechaProgramada:actividad.fechaProgramada,
        fechaRealizacion:null,
        notas:null,
        idTrabajadorSupervisor:0
      };
      this.actividadesService.editActividades(actividad).subscribe(response => {         
      });

      this._registroService.addActividades(registroActividades).subscribe(response=>{
        if (response.exito === 1) {
          this.snackBar.open('Actividad asignada correctamente', '', {
            duration: 2000
          });
          this.getActividades();
        }
      });
    }
    else{
      this.snackBar.open('Por favor selecciona una orden de trabajo y un trabajador.', '', {
        duration: 2000
      });
    }
  }

  generarOrden() {
    let num = Math.round(Math.random() * 100000);
    this.ordenTrabajo = "RO" + num;

  }

  print(){
    printJS({printable: this.registroActividades, type: 'json', properties: [
      {field:'id', displayName:'Cód.Serial'},
      {field:'idOrden', displayName:'Cód. Orden'},
      {field:'idActividadNavigation.nombreActividad', displayName:'Actividad'},
      {field:'idActividadNavigation.descripcion', displayName:'Descripción'},
      {field:'idActividadNavigation.recursoHumano', displayName:'Número de Trabajadores'},
      {field:'fechaProgramada', displayName:'Fecha Programada'},
    ],
    gridHeaderStyle: 'color: black;  border: 2px solid #3971A5;',
	  gridStyle: 'border: 2px solid #3971A5;'
  });
  }
}
