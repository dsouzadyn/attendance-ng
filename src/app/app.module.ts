import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SemSelectorComponent } from './sem-selector/sem-selector.component';
import { RecordsComponent } from './records/records.component';

import { BranchServiceService } from './branch-service.service';
import { RecordsServiceService } from './records-service.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'signup', component: SignupComponent},
  {path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SemSelectorComponent,
    RecordsComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BranchServiceService,
    RecordsServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
