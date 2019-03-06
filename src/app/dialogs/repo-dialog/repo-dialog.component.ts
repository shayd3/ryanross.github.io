import {Component, Inject} from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";

import { RepoDialogData } from "../../interfaces/repo-dialog-data";

@Component({
  selector: 'app-repo-dialog',
  templateUrl: './repo-dialog.component.html',
  styleUrls: ['./repo-dialog.component.css']
})
export class RepoDialogComponent {
  public markdown = this.data.markdown;

  constructor(public dialogRef: MatDialogRef<RepoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RepoDialogData) { }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
