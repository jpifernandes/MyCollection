import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionImagesComponent } from './collection-images.component';

describe('CollectionImagesComponent', () => {
  let component: CollectionImagesComponent;
  let fixture: ComponentFixture<CollectionImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
