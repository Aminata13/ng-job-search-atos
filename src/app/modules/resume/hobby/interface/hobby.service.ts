import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Hobby } from './hobby.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

    public url: string = environment.apiURL+"hobbies/";

  constructor(private http: HttpClient ) { }

  getHobbys() {
    return this.http.get(this.url);
  }

  getHobbyById(id: string) {
    return this.http.get(this.url+id);
  }

  deleteHobby(id: string | undefined) {
    return this.http.delete(this.url+id);
  }

  createHobby(hobby: Hobby) {
    return this.http.post(this.url,hobby);
  }

  updateHobby(id: string | null, hobby: Hobby) {
    return this.http.put(this.url+id,hobby);
  }
}