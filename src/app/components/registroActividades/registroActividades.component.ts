import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageService, ConfirmationService } from "primeng/api";
import { Table } from "primeng/table";
import { Actividades } from "src/app/api/actividades";
import { RegistroActividades } from "src/app/api/registroActividades";
import { RegistroActividades2 } from "src/app/api/registroActividades2";
import { DialogDeleteComponent } from "src/app/common/delete/dialogdelete.component";
import { dialogRegistroActividades } from "src/app/common/dialogRegistroActividades/dialogRegistroActividades";
import { ApiActividadesService } from "src/app/service/api-actividades.service";
import { ApiRegistroActividadesService } from "src/app/service/api-registroactividades.service";
import { CustomerService } from "src/app/service/customerservice";
import { ProductService } from "src/app/service/productservice";

@Component({
    templateUrl: 'registroActividades.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss'],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class registroActividades implements OnInit{
    public lst!: RegistroActividades[];

    public actividad:RegistroActividades;

    selectedActividades:RegistroActividades[];

    rowsPerPageOptions = [5, 10, 20];

    readonly width: string='300px';

    actividades:Actividades[];

    actividad2:Actividades;

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

    constructor(public dialog:MatDialog,
                public snackBar:MatSnackBar,
                private actividadesService: ApiRegistroActividadesService, 
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private actividadService:ApiActividadesService,
                ) {}

    ngOnInit() {
        this.getActividades();

    }

    getActividades(){
        this.actividadesService.getActividades().subscribe( response=>{
          this.lst = response.data;
        });
      }

    getActividad(actividad:Actividades){
      this.actividadService.getActividad(actividad);
    }


    /*openAdd(){
    const dialogRef=this.dialog.open(dialogActividad,{
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getActividades();
    });
  }*/

  openEdit(actividad:RegistroActividades2){
    this.actividadesService.id=actividad.id;
    this.actividadesService.idOrden=actividad.idOrden;
    this.actividadesService.idActividad=actividad.idActividad;
    this.actividadesService.idMaquina=actividad.idMaquina;
    this.actividadesService.idTrabajador=actividad.idTrabajador;
    this.actividadesService.fechaProgramada=actividad.fechaProgramada;
    this.actividadesService.fechaRealizacion=actividad.fechaRealizacion;
    this.actividadesService.notas=actividad.notas;
    this.actividadesService.idTrabajadorSupervisor=actividad.idTrabajadorSupervisor;
    

    const dialogRef=this.dialog.open(dialogRegistroActividades,{
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getActividades();
    });
  }

    deleteActividades(actividad: RegistroActividades2) {
        /*const dialogRef=this.dialog.open(DialogDeleteComponent,{
            width:this.width
          });
          dialogRef.afterClosed().subscribe(result=>{
            if(result===true){
              this.actividadService.getActividades().subscribe( response=>{
                this.actividades = response.data;
              });
              const filtoActividad=this.actividades.filter(actividad=>
                actividad.idActividad===this.actividad.idActividad
                );

                filtoActividad.forEach(element => {
                  this.actividad2.idActividad=element.idActividad,
                  this.actividad2.idArea=element.idArea,
                  this.actividad2.idMaquina= element.idMaquina,
                  this.actividad2.nombreActividad=element.nombreActividad,  
                  this.actividad2.recursoHumano= element.recursoHumano,
                  this.actividad2.descripcion= element.descripcion,
                  this.actividad2.tiempo= element.tiempo,
                  this.actividad2.periodo= element.periodo,
                  this.actividad2.fechaProgramada= element.fechaProgramada,
                  this.actividad2.asignada= 0
                });

                this.actividadService.editActividades(this.actividad2).subscribe(response=>{
                  if(response.exito === 1){
                    this.snackBar.open('Actividad corregida con exito.','',{
                      duration:2000
                    })
                    this.getActividades();
                  }
                });

              this.actividadesService.deleteActividades(this.actividad.id).subscribe(response=>{
                if(response.exito === 1){
                  this.snackBar.open('Actividad corregida con exito.','',{
                    duration:2000
                  })
                  this.getActividades();
                }
              });
            }
          });  */
    }

    confirmDeleteSelected(){
       /* this.deleteProductsDialog = false;
        this.actividades = this.actividades.filter(val => !this.selectedActividades.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedActividades = null;*/
    }

    /*confirmDelete(){
        this.deleteProductDialog = false;
        this.actividad = this.actividad.filter(val => val.id !== this.actividad.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }*/

    hideDialog() {
       // this.productDialog = false;
    }

    saveProduct() {

        /*if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }*/
    }


}