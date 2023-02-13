import {Component,EventEmitter, Input, Output } from '@angular/core';
import { Hobby } from '../interface/hobby.interface';
import { HobbyService } from '../interface/hobby.service';

@Component({
  selector: 'app-hobby-list',
  templateUrl: './hobby-list.component.html',
  styleUrls: ['./hobby-list.component.scss']
})
export class HobbyListComponent {
  hobbies: Hobby[] = [];
  @Input() hobby: any;
  @Output() update: EventEmitter<number> = new EventEmitter();
  
  constructor(private hobbyService: HobbyService) {
    this.getHobbys();
}


  getHobbys() {
    this.hobbyService.getHobbys().subscribe(
      (result) => {
        this.hobbies = result as Hobby[];
      }
    );
  }

  deleteHobbyById(id: string | undefined) {
    this.hobbyService.deleteHobby(id).subscribe(
      (result) => {
        this.getHobbys();
      }
    )
  }
  updateHobby(id: any) {
    this.update.emit(id);
  }
}
