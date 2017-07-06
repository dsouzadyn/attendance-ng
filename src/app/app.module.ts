import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

import { APISettings } from './services/API.settings';

import { BranchServiceService } from './services/branch-service.service';
import { RecordsServiceService } from './services/records-service.service';
import { RegistrationService } from './services/registration.service';
import { LoginService } from './services/login.service';

import { AuthGuard } from './_guards/auth.guard';
import { JwtHelper } from 'angular2-jwt';
import { DefaulterselectorComponent } from './defaulterselector/defaulterselector.component';
import { DefaulterrecordsComponent } from './defaulterrecords/defaulterrecords.component';

const appRoutes: Routes = [
  {path: 'records/:branch/:semester', component: RecordsComponent, canActivate: [AuthGuard]},
  {path: 'defaulter', component: DefaulterselectorComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    DefaulterselectorComponent,
    DefaulterrecordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    JwtHelper,
    LoginService,
    RegistrationService,
    BranchServiceService,
    RecordsServiceService,
    APISettings
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
