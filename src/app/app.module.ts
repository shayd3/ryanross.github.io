import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';

/* Material Angular Modules */
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatCardModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ReposComponent } from './repos/repos.component';

import { ApiService } from './api.service';
import { RepoDialogComponent } from './dialogs/repo-dialog/repo-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ReposComponent,
    RepoDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RepoDialogComponent,
    ErrorDialogComponent
  ]
})
export class AppModule { }
