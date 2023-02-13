import { Skill } from '../interface/skill.interface';
import {Component,EventEmitter, Input, Output } from '@angular/core';
import { SkillService } from '../interface/skill.service';


@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent {
  disabled = false;
  max = 5;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 1;

  skills: Skill[] = [];
  @Input() skill: any;
  @Output() update: EventEmitter<number> = new EventEmitter();
  
  constructor(private skillService: SkillService) {
    this.getSkills();
}


  getSkills() {
    this.skillService.getSkills().subscribe(
      (result) => {
        this.skills = result as Skill[];
       this.skills.map(skill => this.value=skill.level)        
      }
    );
  }

  deleteSkillById(id: string | undefined) {
    this.skillService.deleteSkill(id).subscribe(
      (result) => {
        this.getSkills();
      }
    )
  }
  updateSkill(id: any) {
    this.update.emit(id);
  }

}
