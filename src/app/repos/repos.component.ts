import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Repo } from '../models/repo';
import { ApiService } from '../api.service';
import { RepoDialogComponent } from "../repo-dialog/repo-dialog.component";

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  repos : Repo[];

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RepoDialogComponent, {
      width: '250px',
      data: {title: "Test Title", description: "Test Description"}
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


}
