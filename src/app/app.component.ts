import { Component, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';

import {
  EaMultiSelectDropdownComponent,
  EaMultiSelectDropdownService,
  EaMultiSelectDropdownOption
} from './modules/multi-select-dropdown/multi-select-dropdown.module';

@Component({
  selector: 'ea-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChildren(EaMultiSelectDropdownComponent) dropdowns: QueryList<EaMultiSelectDropdownComponent>;

  public creatures = '';
  public kingdom = '';
  public princess = '';

  public princesses: EaMultiSelectDropdownOption[];

  public fantasyCreatures: EaMultiSelectDropdownOption[];

  public kingdoms: EaMultiSelectDropdownOption[];

  public empty: EaMultiSelectDropdownOption[] = [];

  constructor(private multiSelectDropdownService: EaMultiSelectDropdownService) {
    this.princesses = [
      {id: 'cinderella', value: 'Princess.Cinderella', display: 'Cinderella', isSelected: false},
      {id: 'snow-white', value: 'Princess.Snow-White', display: 'Snow White', isSelected: false},
      {id: 'briar-rose', value: 'Princess.Briar-Rose', display: 'Sleeping Beauty', isSelected: false}
    ];

    this.fantasyCreatures = [
      {id: 'fairies', value: 'Creatures.Fairies', display: 'Fairies', isSelected: false},
      {id: 'trolls', value: 'Creatures.Trolls', display: 'Trolls', isSelected: false},
      {id: 'ogres', value: 'Creatures.Ogres', display: 'Ogres', isSelected: false}
    ];

    this.kingdoms = [
      {id: 'westeros', value: 'Kingdom.Westeros', display: 'Westeros', isSelected: false},
      {id: 'agartha', value: 'Kingdom.Agartha', display: 'Agartha', isSelected: false},
      {id: 'Shambhala', value: 'Kingdom.Shambhala', display: 'Shambhala', isSelected: false}
    ];
  }

  log($event) {
    console.log('log', $event);
  }

  select($event) {
    if (!!this.fantasyCreatures.find(c => c.isSelected)) {

      this.creatures = this.fantasyCreatures.map(c => {
        if (c.isSelected) {
          return c.display;
        }
      }).join(', ');
    }

    if (!!this.kingdoms.find(k => k.isSelected)) {
      this.kingdom = this.kingdoms.find(k => k.isSelected).display;
    }

    if (!!this.princesses.find(p => p.isSelected)) {
      this.princess = this.princesses.find(p => p.isSelected).display;
    }
  }

  switch() {
    this.princesses = [
      {id: 'ariel', value: 'Princess.Ariel', display: 'Ariel', isSelected: false},
      {id: 'tiana', value: 'Princess.Tiana', display: 'Tiana', isSelected: false},
      {id: 'anna', value: 'Princess.Anna', display: 'Anna', isSelected: false}
    ];

    this.fantasyCreatures = [
      {id: 'gnomes', value: 'Creatures.Gnomes', display: 'Gnomes', isSelected: false}
    ];
  }

  switchBack() {
    this.princesses = [
      {id: 'cinderella', value: 'Princess.Cinderella', display: 'Cinderella', isSelected: false},
      {id: 'snow-white', value: 'Princess.Snow-White', display: 'Snow White', isSelected: false},
      {id: 'briar-rose', value: 'Princess.Briar-Rose', display: 'Sleeping Beauty', isSelected: false}
    ];

    this.fantasyCreatures = [
      {id: 'fairies', value: 'Creatures.Fairies', display: 'Fairies', isSelected: false},
      {id: 'trolls', value: 'Creatures.Trolls', display: 'Trolls', isSelected: false},
      {id: 'ogres', value: 'Creatures.Ogres', display: 'Ogres', isSelected: false}
    ];
  }
}
