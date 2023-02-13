import { Component } from '@angular/core';
import {EventEmitter, Input, Output } from '@angular/core';
import { Langage } from '../interface/langage.interface';
import { LangageService } from '../interface/langage.service';


@Component({
  selector: 'app-langage-list',
  templateUrl: './langage-list.component.html',
  styleUrls: ['./langage-list.component.scss']
})
export class LangageListComponent {
  langages: Langage[] = [];
  @Input() langage: any;
  @Output() update: EventEmitter<number> = new EventEmitter();
  
  constructor(private langageService: LangageService) {
    this.getLangages();
  }

  getLangages() {
    this.langageService.getLangages().subscribe(
      (result) => {
        this.langages = result as Langage[];
      }
    );
  }

  deleteLangageById(id: string | undefined) {
    this.langageService.deleteLangage(id).subscribe(
      (result) => {
        this.getLangages();
      }
    )
  }
  updateLangage(id: any) {
    this.update.emit(id);
  }

}
