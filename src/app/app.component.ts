import { Component, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';

import {
  EaMultiSelectDropdownComponent,
  EaMultiSelectDropdownConfig,
  EaMultiSelectDropdownChangedArgs
} from '../../projects/multi-select-dropdown/src/public_api';
import { EaEventListenerConfig } from '../../projects/event-listener/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChildren(EaMultiSelectDropdownComponent) dropdowns: QueryList<EaMultiSelectDropdownComponent>;

  public country: EaMultiSelectDropdownConfig;
  public county: EaMultiSelectDropdownConfig;
  public state: EaMultiSelectDropdownConfig;
  public zip: EaMultiSelectDropdownConfig;

  public listenerConfig: EaEventListenerConfig = {
    event: 'click',
    listenOn: 'document',
    matchables: [{
      matcher: 'class',
      matchers: ['ea-multi-select-dropdown-container']
    }, {
      matcher: 'id',
      matchers: ['zip']
    }]
  };

  public availableCounties = [
    { id: 'alameda', value: 'Counties.Alameda', display: 'Alameda', isSelected: false, state: 'CA' },
    { id: 'alpine', value: 'Counties.Alpine', display: 'Alpine', isSelected: false, state: 'CA' },
    { id: 'amador', value: 'Counties.Amador', display: 'Amador', isSelected: false, state: 'CA' },
    { id: 'butte', value: 'Counties.Butte', display: 'Butte', isSelected: false, state: 'CA' },
    { id: 'calaveras', value: 'Counties.Calaveras', display: 'Calaveras', isSelected: false, state: 'CA' },
    { id: 'colusa', value: 'Counties.Colusa', display: 'Colusa', isSelected: false, state: 'CA' },
    { id: 'contra-costa', value: 'Counties.Contra_Costa', display: 'Contra Costa', isSelected: false, state: 'CA' },
    { id: 'del-norte', value: 'Counties.Del_Norte', display: 'Del Norte', isSelected: false, state: 'CA' },
    { id: 'el-dorado', value: 'Counties.El_Dorado', display: 'El Dorado', isSelected: false, state: 'CA' },
    { id: 'fresno', value: 'Counties.Fresno', display: 'Fresno', isSelected: false, state: 'CA' },
    { id: 'glenn', value: 'Counties.Glenn', display: 'Glenn', isSelected: false, state: 'CA' },
    { id: 'humboldt', value: 'Counties.Humboldy', display: 'Humboldt', isSelected: false, state: 'CA' },
    { id: 'imperial', value: 'Counties.Imperial', display: 'Imperial', isSelected: false, state: 'CA' },
    { id: 'inyo', value: 'Counties.Inyo', display: 'Inyo', isSelected: false, state: 'CA' },
    { id: 'kern', value: 'Counties.Kern', display: 'Kern', isSelected: false, state: 'CA' },
    { id: 'kings', value: 'Counties.Kings', display: 'Kings', isSelected: false, state: 'CA' },
    { id: 'lake', value: 'Counties.Lake', display: 'Lake', isSelected: false, state: 'CA' },
    { id: 'lassen', value: 'Counties.Lassen', display: 'Lassen', isSelected: false, state: 'CA' },
    { id: 'los-angeles', value: 'Counties.Los_Angeles', display: 'Los Angeles', isSelected: false, state: 'CA' },
    { id: 'madera', value: 'Counties.Madera', display: 'Madera', isSelected: false, state: 'CA' },
    { id: 'marin', value: 'Counties.Marin', display: 'Marin', isSelected: false, state: 'CA' },
    { id: 'mariposa', value: 'Counties.Mariposa', display: 'Mariposa', isSelected: false, state: 'CA' },
    { id: 'mendocino', value: 'Counties.Mendocino', display: 'Mendocino', isSelected: false, state: 'CA' },
    { id: 'merced', value: 'Counties.Merced', display: 'Merced', isSelected: false, state: 'CA' },
    { id: 'modoc', value: 'Counties.Modoc', display: 'Modoc', isSelected: false, state: 'CA' },
    { id: 'mono', value: 'Counties.Mono', display: 'Mono', isSelected: false, state: 'CA' },
    { id: 'monterey', value: 'Counties.Monterey', display: 'Monterey', isSelected: false, state: 'CA' },
    { id: 'napa', value: 'Counties.Napa', display: 'Napa', isSelected: false, state: 'CA' },
    { id: 'nevada', value: 'Counties.Nevada', display: 'Nevada', isSelected: false, state: 'CA' },
    { id: 'orange', value: 'Counties.Orange', display: 'Orange', isSelected: false, state: 'CA' },
    { id: 'placer', value: 'Counties.Placer', display: 'Placer', isSelected: false, state: 'CA' },
    { id: 'plumas', value: 'Counties.Plumas', display: 'Plumas', isSelected: false, state: 'CA' },
    { id: 'riverside', value: 'Counties.Riverside', display: 'Riverside', isSelected: false, state: 'CA' },
    { id: 'sacramento', value: 'Counties.Sacramento', display: 'Sacramento', isSelected: false, state: 'CA' },
    { id: 'san-benito', value: 'Counties.San_Benito', display: 'San Benito', isSelected: false, state: 'CA' },
    { id: 'san-bernardino', value: 'Counties.San_Bernardino', display: 'San Bernardino', isSelected: false, state: 'CA' },
    { id: 'san-diego', value: 'Counties.San_Diego', display: 'San Diego', isSelected: false, state: 'CA' },
    { id: 'san-francisco', value: 'Counties.San_Francisco', display: 'San Francisco', isSelected: false, state: 'CA' },
    { id: 'san-jaoquin', value: 'Counties.San_Jaoquin', display: 'San Jaoquin', isSelected: false, state: 'CA' },
    { id: 'san-luis-obispo', value: 'Counties.San_Luis_Obispo', display: 'San Luis Obispo', isSelected: false, state: 'CA' },
    { id: 'san-mateo', value: 'Counties.San_Mateo', display: 'San Mateo', isSelected: false, state: 'CA' },
    { id: 'santa-barbara', value: 'Counties.Santa_Barbara', display: 'Santa Barbara', isSelected: false, state: 'CA' },
    { id: 'santa-clara', value: 'Counties.Santa_Clara', display: 'Santa Clara', isSelected: false, state: 'CA' },
    { id: 'santa-cruz', value: 'Counties.Santa_Cruz', display: 'Santa Cruz', isSelected: false, state: 'CA' },
    { id: 'shasta', value: 'Counties.Shasta', display: 'Shasta', isSelected: false, state: 'CA' },
    { id: 'sierra', value: 'Counties.Sierra', display: 'Sierra', isSelected: false, state: 'CA' },
    { id: 'siskiyou', value: 'Counties.Siskiyou', display: 'Siskiyou', isSelected: false, state: 'CA' },
    { id: 'solano', value: 'Counties.Solano', display: 'Solano', isSelected: false, state: 'CA' },
    { id: 'sonoma', value: 'Counties.Sonoma', display: 'Sonoma', isSelected: false, state: 'CA' },
    { id: 'stanislaus', value: 'Counties.Stanislaus', display: 'Stanislaus', isSelected: false, state: 'CA' },
    { id: 'sutter', value: 'Counties.Sutter', display: 'Sutter', isSelected: false, state: 'CA' },
    { id: 'tehama', value: 'Counties.Tehama', display: 'Tehama', isSelected: false, state: 'CA' },
    { id: 'trinity', value: 'Counties.Trinity', display: 'Trinity', isSelected: false, state: 'CA' },
    { id: 'tulare', value: 'Counties.Tulare', display: 'Tulare', isSelected: false, state: 'CA' },
    { id: 'tuolumne', value: 'Counties.Tuolomne', display: 'Tuolomne', isSelected: false, state: 'CA' },
    { id: 'ventura', value: 'Counties.Ventura', display: 'Ventura', isSelected: false, state: 'CA' },
    { id: 'yolo', value: 'Counties.Yolo', display: 'Yolo', isSelected: false, state: 'CA' },
    { id: 'yuba', value: 'Counties.Yuba', display: 'Yuba', isSelected: false, state: 'CA' },
    { id: 'carson-city', value: 'Counties.Carson_City', display: 'Carson City', isSelected: false, state: 'NV' },
    { id: 'churchill', value: 'Counties.Churchill', display: 'Churchill', isSelected: false, state: 'NV' },
    { id: 'clark', value: 'Counties.Carson_City', display: 'Clark', isSelected: false, state: 'NV' },
    { id: 'douglas', value: 'Counties.Douglas', display: 'Douglas', isSelected: false, state: 'NV' },
    { id: 'elko', value: 'Counties.Elko', display: 'Elko', isSelected: false, state: 'NV' },
    { id: 'esmeralda', value: 'Counties.Esmeralda', display: 'Esmeralda', isSelected: false, state: 'NV' },
    { id: 'eureka', value: 'Counties.Eureka', display: 'Eureka', isSelected: false, state: 'NV' },
    { id: 'humboldt', value: 'Counties.Humboldt', display: 'Humboldt', isSelected: false, state: 'NV' },
    { id: 'lander', value: 'Counties.Lander', display: 'Lander', isSelected: false, state: 'NV' },
    { id: 'lincoln', value: 'Counties.Lincoln', display: 'Lincoln', isSelected: false, state: 'NV' },
    { id: 'lyon', value: 'Counties.Lyon', display: 'Lyon', isSelected: false, state: 'NV' },
    { id: 'mineral', value: 'Counties.Mineral', display: 'Mineral', isSelected: false, state: 'NV' },
    { id: 'nye', value: 'Counties.Nye', display: 'Nye', isSelected: false, state: 'NV' },
    { id: 'pershing', value: 'Counties.Pershing', display: 'Pershing', isSelected: false, state: 'NV' },
    { id: 'storey', value: 'Counties.Storey', display: 'Storey', isSelected: false, state: 'NV' },
    { id: 'washoe', value: 'Counties.Washoe', display: 'Washoe', isSelected: false, state: 'NV' },
    { id: 'white-pine', value: 'Counties.White_Pine', display: 'White Pine', isSelected: false, state: 'NV' }
  ];

  public availableStates = [
    { id: 1, display: 'California', isSelected: false, value: 'CA', country: 'Country.United_States' },
    { id: 2, display: 'Nevada', isSelected: false, value: 'NV', country: 'Country.United_States' },
    { id: 3, display: 'Oregon', isSelected: false, value: 'OR', country: 'Country.United_States' },
    { id: 4, display: 'Arizona', isSelected: false, value: 'AZ', country: 'Country.United_States' },
    { id: 5, display: 'Washington', isSelected: false, value: 'WA', country: 'Country.United_States' }
  ];

  public availableZips = [
    { id: '85051', display: '85051', isSelected: false, value: '85051', state: 'State.Arizona' },
    { id: '85210', display: '85210', isSelected: false, value: '85210', country: 'State.Arizona' }
  ];

  constructor() {
    this.country = {
      allowMultiple: false,
      emptyText: 'Never Shown',
      labelText: 'Country',
      noneSelectedText: 'Select a Country',
      options: [
        { display: 'United States', id: 1, isSelected: false, value: 'Country.United_States' },
        { display: 'Canada', id: 2, isSelected: false, value: 'Country.Canada' },
        { display: 'Japan', id: 3, isSelected: false, value: 'Country.Japan' }
      ]
    };

    this.county = {
      addSelectAllOption: true,
      emptyText: 'Please select a state',
      labelText: 'Counties',
      noneSelectedText: 'Select a County',
      openWhenDataLoads: true,
      options: [],
      selectAllByDefault: true,
      selectAllText: 'All Counties'
    };

    this.state = {
      addSelectAllOption: true,
      emptyText: 'Select a Country',
      labelText: 'States',
      noneSelectedText: 'Select a State',
      options: [],
      selectAllText: 'All States',
      selectAllByDefault: false
    };

    this.zip = {
      addSelectAllOption: true,
      emptyText: 'Select a County',
      labelText: 'Zip Codes',
      noneSelectedText: 'Select a Zip Code',
      openWhenDataLoads: true,
      options: [],
      selectAllText: 'All Zip Codes',
      selectAllByDefault: true
    };
  }

  documentClickListener(matches: HTMLElement[]): void {
    if (!matches || !matches.length || matches.length === 0) {
      this.dropdowns.forEach(d => {
        d.closeList();
      });
    }
  }

  closed(id: number | string): void {
    // this.state.options = this.availableStates.filter(s => s.country === this.country.options.find(o => o.isSelected).value);
    console.log('closed', id);
  }

  changed(args: EaMultiSelectDropdownChangedArgs): void {
    console.log('changed', args);

    switch (args.id) {
      case 1:
        if (!!this.country.options.find(o => o.isSelected)) {
          this.state.options = this.availableStates.filter(s => s.country === this.country.options.find(o => o.isSelected).value);
        }
        break;
      case 2:
        this.county.emptyText = 'Please wait...';
        this.county.options = [];
        setTimeout(() => {
          if (!!this.state.options.find(o => o.isSelected)) {
            const counties = [];
            this.state.options.filter(o => o.isSelected).forEach(state => {
              this.availableCounties.forEach(county => {
                if (county.state === state.value) {
                  counties.push(county);
                }
              });
            });
            if (counties.length > 0) {
              this.county.options = counties;
            } else {
              this.county.emptyText = 'This state has no counties to select';
            }
          } else {
            this.county.emptyText = 'Select a State';
          }
          this.zip.options = this.availableZips;
        }, 2500);
        break;
    }
  }

  failedToOpen(id: number | string): void {
    this.opened(id);
  }

  opened(id: number | string): void {
    this.dropdowns.forEach(d => {
      if (d.id !== id) {
        d.closeList();
      }
    });
  }
}
