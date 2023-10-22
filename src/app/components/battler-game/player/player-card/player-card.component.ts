import { Component, Input } from '@angular/core';
import { CardStarship, CardPerson } from 'src/app/store/battler';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent {
  @Input() card: CardStarship | CardPerson | null = null;
  @Input() loader: boolean = true;
}
