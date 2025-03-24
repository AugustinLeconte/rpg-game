import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcesWindowComponent } from './ressources-window.component';

describe('RessourcesWindowComponent', () => {
  let component: RessourcesWindowComponent;
  let fixture: ComponentFixture<RessourcesWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourcesWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourcesWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
