import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Skill } from './skill.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

    public url: string = environment.apiURL+"skills/";

  constructor(private http: HttpClient ) { }

  getSkills() {
    return this.http.get(this.url);
  }

  getSkillById(id: string) {
    return this.http.get(this.url+id);
  }

  deleteSkill(id: string | undefined) {
    return this.http.delete(this.url+id);
  }

  createSkill(skill: Skill) {
    return this.http.post(this.url,skill);
  }

  updateSkill(id: string | null, skill: Skill) {
    return this.http.put(this.url+id,skill);
  }
}