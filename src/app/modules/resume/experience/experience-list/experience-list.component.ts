import { Component } from '@angular/core';
import { Experience } from '../interface/experience.interface';
import { ExperienceService } from '../interface/experience.service';
import {EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent {

  experiences: Experience[] = [];
  @Input() experience: any;
  @Output() update: EventEmitter<number> = new EventEmitter();
  
  constructor(private experienceService: ExperienceService) {
    this.getExperiences();
  }

  getExperiences() {
    this.experienceService.getExperiences().subscribe(
      (result) => {
        this.experiences = result as Experience[];
      }
    );
  }

  deleteExperienceById(id: string | undefined) {
    this.experienceService.deleteExperience(id).subscribe(
      (result) => {
        this.getExperiences();
      }
    )
  }
  updateExperience(id: any) {
    this.update.emit(id);
  }
}
