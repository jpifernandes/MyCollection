import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MyCollectionSettings } from '../../../models/my-collection-settings.model';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-collections-settings',
  templateUrl: './collections-settings.component.html',
  styleUrl: './collections-settings.component.css'
})
export class CollectionsSettingsComponent implements OnInit {

  settings!: MyCollectionSettings;

  @ViewChild('settingsJson') settingsJson!: ElementRef;
  @Output() onUpdateSettings = new EventEmitter<void>();

  constructor(private settingsService: SettingsService)
  {
  }
  
  ngOnInit(): void {
    this.settingsService.getSettings().then(s => {
      this.settings = s;
      this.settingsJson.nativeElement.value = JSON.stringify(this.settings, null, 2);
    }); 
  }

  async updateSettings(): Promise<void> {
    const json = this.settingsJson.nativeElement.value;

    if(!json || json.length <= 0) return;

    const parsedSettings = JSON.parse(json);
    Object.assign(this.settings, parsedSettings);

    await this.settingsService.updateSettings(this.settings);

    this.onUpdateSettings.emit();
  }
}
