import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule}from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import { CookieService} from 'ngx-cookie-service';

import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatExpansionModule} from '@angular/material/expansion'
import { MatTreeModule} from '@angular/material/tree'
import { MatIconModule} from '@angular/material/icon'

import { ChartsModule } from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DialogActividadComponent } from './dialog-actividad/dialog-actividad.component';
import { PortafoliosNamePipe } from './pipes/portafolios-name.pipe';



@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    DialogActividadComponent,
    PortafoliosNamePipe,
    
  ],
  entryComponents:[DialogActividadComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatGridListModule,
    NgbModule,
    MatSelectModule,
    MatListModule,
    ChartsModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTreeModule,
    MatIconModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {



 }
