import { Formation } from '../interface/formation.interface';
import { FormationService } from '../interface/formation.service';
import {Component,EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent {
  formations: Formation[] = [];
  @Input() formation: any;
  @Output() update: EventEmitter<number> = new EventEmitter();
  
  constructor(private formationService: FormationService, public dialog: MatDialog) {
    this.getFormations();
  }

  getFormations() {
    this.formationService.getFormations().subscribe(
      (result) => {
        this.formations = result as Formation[];
      }
    );
  }

  deleteFormationById(id: string | undefined) {
    this.formationService.deleteFormation(id).subscribe(
      (result) => {
        this.getFormations();
      }
    )
  }
  updateFormation(id: any) {
    this.update.emit(id);
  }

}
