import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ RouterOutlet, RouterModule],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title : string = 'Arquitectura limpia Angular';  
}
