import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ReposComponent } from './repos/repos.component';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';

import { ApiService } from './api.service';


@NgModule({
  declarations: [
    AppComponent,
    ReposComponent,
    RepoDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
