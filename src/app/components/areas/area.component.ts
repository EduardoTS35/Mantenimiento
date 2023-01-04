import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Actividades } from 'src/app/api/actividades';
import { dialogActividad } from 'src/app/common/actividades/dialogActividad.component';
import { DialogDeleteComponent } from 'src/app/common/delete/dialogdelete.component';
import { ApiActividadesService } from 'src/app/service/api-actividades.service';
import { TagModule } from 'primeng/tag';
import { Areas } from 'src/app/api/areas';
import { ApiAreaService } from 'src/app/service/api-areas.service';
import { dialogArea } from 'src/app/common/dialogAreas/dialogArea.component';


@Component({
    templateUrl: './area.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class AreaComponent implements OnInit {

    public lst!: Areas[];


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

    constructor(public dialog:MatDialog,
                public snackBar:MatSnackBar,
                private areasService: ApiAreaService, 
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                ) {}

    ngOnInit() {
        this.getAreas();

    }

    getAreas(){
        this.areasService.getAreas().subscribe( response=>{
          this.lst = response.data;
        });
      }


    openAdd(){
    const dialogRef=this.dialog.open(dialogArea,{
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getAreas();
    });
  }

  openEdit(area:Areas){
    this.areasService.getArea(area);
    const dialogRef=this.dialog.open(dialogArea,{      
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.getAreas();
    });
  }

    deleteActividades(area: Areas) {
        
        const dialogRef=this.dialog.open(DialogDeleteComponent,{
            width:this.width
          });
          dialogRef.afterClosed().subscribe(result=>{
            if(result===true){
              this.areasService.deleteAreas(area.idArea).subscribe(response=>{
                if(response.exito === 1){
                  this.snackBar.open('Area eliminada con éxito.','',{
                    duration:2000
                  })
                  this.getAreas();
                }
              });
            }
          });  
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
