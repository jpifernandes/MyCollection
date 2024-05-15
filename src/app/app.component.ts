import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'MyCollection';
  
  constructor(private router: Router) {}

  @HostListener('window:keydown', ['$event'])
  onBackToMainPageEvent(event: KeyboardEvent) {
    if(event.key == ',')
      this.router.navigate(['/collections']);
  }
}
