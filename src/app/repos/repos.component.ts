import { Component, OnInit } from '@angular/core';

import { Repo } from '../models/repo';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  repos : Repo[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getRepos();
  }

  getRepos(): void {
    this.apiService.getRepos().subscribe((res)=> this.repos = res);
  }

}
