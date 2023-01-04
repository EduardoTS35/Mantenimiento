import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from '../../service/productservice';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { ApiActividadesService } from 'src/app/service/api-actividades.service';
import { Actividades } from 'src/app/api/actividades';
import { ApiRegistroActividadesService } from 'src/app/service/api-registroactividades.service';
import { RegistroActividades } from 'src/app/api/registroActividades';
import { ApiTrabajadorService } from 'src/app/service/api-trabajadores.service';
import { Trabajadores } from 'src/app/api/trabajadores';
import { ApiActividadesCorrectivas } from 'src/app/service/api-actividadesCorrectivas';
 
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items: MenuItem[];


    chartData: any;

    chartOptions: any;

    subscription: Subscription;

    config: AppConfig;

    actividad:Actividades;

    actividades: any;

    actividadesDia:any;

    actividadesRealizadas:any;

    actividadesVencidas:any;

    totalActividadesDia:any;

    totalActividadesRelizadas:any;

    totalActividadesVencidas:any;

    porcentajeCumplimientoMensual:string;

    porcentajeCumplimientoSemanal:number;

    fecha:Date;

    fechaManana:Date;

    trabajadores:Trabajadores[];

    filtradoCMRealizado:RegistroActividades[];

    filtradoCM:RegistroActividades[];

    filtradoCMT:string;

    dataSet1:number;
    dataSet2:number;
    dataSet:number[];
    

    constructor(public configService: ConfigService,
                private _actividadService:ApiActividadesService,
                private _registroService:ApiRegistroActividadesService,
                private _trabajadorService:ApiTrabajadorService,
                private _actividadesCorrectivas:ApiActividadesCorrectivas) {
                    
                }

    ngOnInit() {
        this.getActividades();
        this.getActividadesVencidas();
        this.getRegistroActividades();
        this.getTrabajadores();
        this.getActividadesCorrectivas();
        
          
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });   
        
    }

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();

    }

    applyDarkTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
    }

    applyLightTheme() {
            this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };
    }

    formatDate(date) { 
        return date.toISOString().replace('T', '').substring(0, 10);
       }

    convertToDate(date){
        return new Date(date);
    }

    sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }

    obltenerPrimerDia(){
        const fechaInicio = new Date();
	// Iniciar en este año, este mes, en el día 1
	return new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
    }

    obtenerUltimoDia(){
        var today = new Date();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0)
	return new Date(lastDayOfMonth);
    }

    getTrabajadores(){
        this._trabajadorService.getTrabajadores().subscribe(response=>{
            const trabajadores=response.data;
            this.trabajadores=trabajadores;
        })
    }


    getActividades(){
        this.fecha= new Date();
        this.fechaManana=new Date();
        this.fechaManana=this.sumarDias(this.fechaManana,1);
        const horas=this.fecha.getHours();
        if(horas>=19){
            this.fecha=this.sumarDias(this.fecha,-1);
            this.fechaManana=this.sumarDias(this.fechaManana,-1);
        }


        this._actividadService.getActividades().subscribe( response=>{
            let filtradoActividadesDia2;
            const actividadesData=response.data;
            //Filtro Actividades Diarias
            const filtradoActividadesDia=actividadesData.filter(actividad=>
                actividad.fechaProgramada>=this.formatDate(this.fecha)+'T00:00:00'
            );
            if(new Date<this.fechaManana){
                filtradoActividadesDia2=actividadesData.filter(actividad=>
                    actividad.fechaProgramada===this.formatDate(this.fecha)+'T00:00:00'
                );
            }else{
                filtradoActividadesDia2=filtradoActividadesDia.filter(actividad=>
                    actividad.fechaProgramada<this.formatDate(this.fechaManana)+'T00:00:00'
                    );
            }

            this.actividadesDia=filtradoActividadesDia2;
            this.actividades=actividadesData;
            this.totalActividadesDia=filtradoActividadesDia2.length;
          });

    }

    getActividadesVencidas(){
        this._actividadService.getActividades().subscribe( response=>{
            const actividadesData=response.data;

            //Filtro Actividades Vencidas
            const filtradoActividadesVencidas=actividadesData.filter(actividad=>this.convertToDate(actividad.fechaProgramada)<this.convertToDate(this.formatDate(this.fecha)+'T00:00:00'));
            this.actividadesVencidas=filtradoActividadesVencidas;
            this.totalActividadesVencidas=filtradoActividadesVencidas.length;
          });
    }

    getRegistroActividades(){

        this._registroService.getActividades().subscribe( response=>{
            const actividadesData=response.data;
            //Filtro Actividades Realizadas
            const filtrado=actividadesData.filter(actividad=>actividad.fechaRealizacion===this.formatDate(this.fecha)+'T00:00:00');
            this.actividadesRealizadas=filtrado;
            this.totalActividadesRelizadas=filtrado.length;
            //Filtro Cumplimiento Mensual
            this.filtradoCM=actividadesData.filter(actividad=>
                this.convertToDate(actividad.fechaProgramada)>=this.obltenerPrimerDia() &&
                this.convertToDate(actividad.fechaProgramada)<this.convertToDate(this.obtenerUltimoDia())
                );

            this.filtradoCMRealizado=actividadesData.filter(actividad=>
                this.convertToDate(actividad.fechaProgramada)>=this.obltenerPrimerDia() &&
                this.convertToDate(actividad.fechaProgramada)<=this.convertToDate(this.obtenerUltimoDia()) &&
                 this.convertToDate(actividad.fechaRealizacion)>=this.obltenerPrimerDia() && 
                 actividad.fechaRealizacion!=null);
            
            this.porcentajeCumplimientoMensual=(this.filtradoCMRealizado.length*100/this.filtradoCM.length).toFixed(1);
            this.dataSet1=this.filtradoCMRealizado.length;    
            this.loadChart();    
          });

    }
    getActividadesCorrectivas(){

        this._actividadesCorrectivas.getActividadesCorrectivas().subscribe( response=>{
            const actividadesData=response.data;
            //Filtro Cumplimiento Mensual
            const filtradoCM=actividadesData.filter(actividad=>
                this.convertToDate(actividad.fecha)>=this.obltenerPrimerDia() &&
                this.convertToDate(actividad.fecha)<this.convertToDate(this.obtenerUltimoDia())
                );

            this.dataSet2=filtradoCM.length;     
            this.loadChart();
          });         

    }

    loadChart(){
        this.chartData = {
            labels: ['Correctivo','Preventivo'],
            datasets: [
                {
                    data: [this.dataSet2, this.dataSet1],
                    backgroundColor: [
                        "#990000",
                        "#073763",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#d94343",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };
    }

     seleccionarFechas(fechaActividad:Date){
        const tomorrow=this.sumarDias(new Date,1);
        if(fechaActividad<tomorrow){
            return true;
        }
        return false;
    }
    

}
