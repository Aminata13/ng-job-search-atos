import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangageListComponent } from './langage-list.component';

describe('LangageListComponent', () => {
  let component: LangageListComponent;
  let fixture: ComponentFixture<LangageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
