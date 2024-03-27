import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartographieComponent } from './cartographie/cartographie.component';
import { HttpClientModule} from '@angular/common/http';
import { DiaspraComponent } from './diaspra/diaspra.component';
import { EvolutionComponent } from './evolution/evolution.component';
import { DataTablesModule } from "angular-datatables";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CandidatComponent } from './candidat/candidat.component';
@NgModule({
  declarations: [
    AppComponent,
    DiaspraComponent,
    EvolutionComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    CanvasJSAngularChartsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
