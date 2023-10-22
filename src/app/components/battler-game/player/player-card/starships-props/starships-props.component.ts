import { Component, Input } from '@angular/core';
import { StarshipProps } from 'src/app/store/battler';

@Component({
  selector: 'app-starships-props',
  templateUrl: './starships-props.component.html',
  styleUrls: ['./starships-props.component.scss'],
})
export class StarshipsPropsComponent {
  @Input() properties: Partial<StarshipProps> = {};
}
