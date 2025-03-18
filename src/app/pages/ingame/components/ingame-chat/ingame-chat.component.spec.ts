import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngameChatComponent } from './ingame-chat.component';

describe('IngameChatComponent', () => {
  let component: IngameChatComponent;
  let fixture: ComponentFixture<IngameChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngameChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngameChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
