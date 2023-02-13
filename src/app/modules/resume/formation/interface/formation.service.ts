import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Formation } from './formation.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

    public url: string = environment.apiURL+"formations/";

  constructor(private http: HttpClient ) { }

  getFormations() {
    return this.http.get(this.url);
  }

  getFormationById(id: string) {
    return this.http.get(this.url+id);
  }

  deleteFormation(id: string | undefined) {
    return this.http.delete(this.url+id);
  }

  createFormation(formation: Formation) {
    return this.http.post(this.url,formation);
  }

  updateFormation(id: string | null, formation: Formation) {
    return this.http.put(this.url+id,formation);
  }
}