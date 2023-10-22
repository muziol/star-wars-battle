import { Component, Input } from '@angular/core';
import { PersonProps } from 'src/app/store/battler';

@Component({
  selector: 'app-people-props',
  templateUrl: './people-props.component.html',
  styleUrls: ['./people-props.component.scss'],
})
export class PeoplePropsComponent {
  @Input() properties!: PersonProps;
}
