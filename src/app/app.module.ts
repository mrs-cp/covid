import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import { ChartComponent } from './app/chart/chart.component';
import { MapComponent } from './app/map/map.component';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    MapComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerImmediately'
        }),
        ChartModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
