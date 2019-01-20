import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Material Angular Modules */
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatCardModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ReposComponent } from './repos/repos.component';

import { ApiService } from './api.service';
import { RepoDialogComponent } from './repo-dialog/repo-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ReposComponent,
    RepoDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RepoDialogComponent
  ]
})
export class AppModule { }
