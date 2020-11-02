import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GaugeChartModule } from 'angular-gauge-chart';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdenComponent } from './components/orden/orden.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DataTablesModule } from 'angular-datatables';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { EditOrdenComponent } from './components/edit-orden/edit-orden.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { InventarioComponent } from './components/inventario/inventario.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    LoginComponent,
    NavbarComponent,
    OrdenComponent,
    EditOrdenComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    GaugeChartModule,
    SignaturePadModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DataTablesModule,
    Ng2ImgMaxModule,
    AngularFireStorageModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
