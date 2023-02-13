import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Langage } from './langage.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangageService {

    public url: string = environment.apiURL+"langages/";

  constructor(private http: HttpClient ) { }

  getLangages() {
    return this.http.get(this.url);
  }

  getLangageById(id: string) {
    return this.http.get(this.url+id);
  }

  deleteLangage(id: string | undefined) {
    return this.http.delete(this.url+id);
  }

  createLangage(Langage: Langage) {
    return this.http.post(this.url,Langage);
  }

  updateLangage(id: string | null, Langage: Langage) {
    return this.http.put(this.url+id,Langage);
  }
}