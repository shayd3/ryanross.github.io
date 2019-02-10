import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Repo } from '../models/repo';
import {Readme} from "../models/readme";

import { ApiService } from '../api.service';
import { RepoDialogComponent } from "../dialogs/repo-dialog/repo-dialog.component";
import {ErrorDialogComponent} from "../dialogs/error-dialog/error-dialog.component";


@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  repos : Repo[];
  readMe : Readme;

    constructor(private apiService: ApiService, public dialog: MatDialog) {}

    openDialog(repoName): void {
      const dialogRef = this.dialog.open(RepoDialogComponent, {
        width: '55em',
        data: { title: repoName, description: this.readMe.content, url: this.readMe.url, markdown: this.readMe.markdown }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

  ngOnInit() {
    this.getRepos();
  }

  getRepos(): void {
    this.apiService.getRepos().subscribe((res)=> this.repos = res);
  }

  generateDialogContent(repoName): void {
    this.apiService.getReadMe(repoName).subscribe((res : Readme) =>{
      this.readMe = {
        content: res['content'],
        size: res['size'],
        url: res['download_url'],
        markdown: this.decodeBase64(res['content'])
      }
      console.log(this.readMe);
      this.openDialog(repoName);
    },
      error => {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '55em',
          data: { title: repoName, error: "No README.md found in repo or there was an error retrieving README.md." }
        });
      });
  }

  decodeBase64(content): string {
      return atob(content);
  }


}
