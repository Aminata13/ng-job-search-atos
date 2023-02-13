import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Experience } from './experience.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

    public url: string = environment.apiURL+"experiences/";

  constructor(private http: HttpClient ) { }

  getExperiences() {
    return this.http.get(this.url);
  }

  getExperienceById(id: string) {
    return this.http.get(this.url+id);
  }

  deleteExperience(id: string | undefined) {
    return this.http.delete(this.url+id);
  }

  createExperience(experience: Experience) {
    return this.http.post(this.url,experience);
  }

  updateExperience(id: string | null, experience: Experience) {
    return this.http.put(this.url+id,experience);
  }
}