import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year: number = moment().year();
}
