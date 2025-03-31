import { Component } from '@angular/core';
import { InteractionService } from '../../../services/interaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interactions',
  imports: [CommonModule],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.scss',
})
export class InteractionsComponent {
  class: string = '';
  constructor(private readonly interactionService: InteractionService) {}

  canInteract(): boolean {
    let result = this.interactionService.canInteract();
    this.class = result.direction ? result.direction : '';
    return result.canInteract;
  }
}
