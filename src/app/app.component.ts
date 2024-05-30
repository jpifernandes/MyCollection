import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'MyCollection';
  
  constructor(private location: Location
  ) {}

  @HostListener('window:keydown', ['$event'])
  onBackToMainPageEvent(event: KeyboardEvent): void {
    if(event.key == ',')
      this.location.back();
  }
}
