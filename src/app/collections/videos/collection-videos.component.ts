import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-videos',
  templateUrl: './collection-videos.component.html',
  styleUrl: './collection-videos.component.css'
})
export class CollectionVideosComponent implements OnInit {

  @Input() videos: string[] = [];

  ngOnInit(): void { }

}
