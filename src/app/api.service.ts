import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';

import { Repo } from './models/repo';
import {Observable} from "rxjs";
import {Readme} from "./models/readme";

const API_URL = environment.github_url
const GITHUB_USER = environment.github_user

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  public getRepos(): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${API_URL}/users/${GITHUB_USER}/repos`)
  }

  public getReadMe(repoName): Observable<Readme> {
    console.log(`Get Request to -> ${API_URL}/repos/${GITHUB_USER}/${repoName}/readme?ref=master`)
    return this.http.get<Readme>(`${API_URL}/repos/${GITHUB_USER}/${repoName}/readme?ref=master`)
  }


}


