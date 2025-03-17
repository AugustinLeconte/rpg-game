import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersConnectedComponent } from './players-connected.component';

describe('PlayersConnectedComponent', () => {
  let component: PlayersConnectedComponent;
  let fixture: ComponentFixture<PlayersConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersConnectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
