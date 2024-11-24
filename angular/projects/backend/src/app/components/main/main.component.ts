import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
