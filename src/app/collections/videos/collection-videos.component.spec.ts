import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionVideosComponent } from './collection-videos.component';

describe('CollectionVideosComponent', () => {
  let component: CollectionVideosComponent;
  let fixture: ComponentFixture<CollectionVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
