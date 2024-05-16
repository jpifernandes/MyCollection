import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsImportComponent } from './collections-import.component';

describe('CollectionsImportComponent', () => {
  let component: CollectionsImportComponent;
  let fixture: ComponentFixture<CollectionsImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
