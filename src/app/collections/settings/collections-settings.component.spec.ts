import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsSettingsComponent } from './collections-settings.component';

describe('CollectionsSettingsComponent', () => {
  let component: CollectionsSettingsComponent;
  let fixture: ComponentFixture<CollectionsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
