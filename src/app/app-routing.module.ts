import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/asignacion/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { registroActividades } from './components/registroActividades/registroActividades.component';
import { actividadesCorrectivas } from './components/actividadesCorrectivas/actividadesCorrectivas.component';
import { AreaComponent } from './components/areas/area.component';
import { MaquinaComponent } from './components/maquinas/maquina.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { AuthGuard } from './security/auth.guard';
import { LogOutComponent } from './components/logOut/logOut.component';
import { RolGuardSupervisor } from './security/role.guard.supervisor';
import { RolGuardAdmin } from './security/role.guard.admin';
import { RolGuardAux } from './security/role.guard.aux';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent,canActivate:[AuthGuard]},
                    {path: 'asignacion', component: FormLayoutComponent,canActivate:[AuthGuard]},
                    {path: 'registroActividades', component: registroActividades,canActivate:[RolGuardSupervisor]},
                    {path: 'Actividades', component: CrudComponent,canActivate:[RolGuardAdmin]},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'ActividadesCorrectivas', component: actividadesCorrectivas,canActivate:[AuthGuard]},
                    {path: 'Areas', component: AreaComponent,canActivate:[RolGuardAdmin]},
                    {path: 'Maquinas', component: MaquinaComponent,canActivate:[RolGuardAdmin]},
                    {path: 'Trabajadores', component: TrabajadoresComponent,canActivate:[RolGuardAdmin]},
                ],
            },
            {path:'pages/login', component: LoginComponent},
            {path:'logOut',component:LogOutComponent,canActivate:[AuthGuard]},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
