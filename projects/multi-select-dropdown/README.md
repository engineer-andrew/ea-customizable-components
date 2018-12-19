# EaMultiSelectDropdown

A fully configurable, customizable, Angular 5+ multi-select dropdown

### Installation
```
$ npm install ea-multi-select-dropdown
```

### Code
The code is on [Github](https://github.com/engineer-andrew/ea-customizable-components/tree/master/projects/multi-select-dropdown).

### Quick Notes
The intention of this component is to provide a fully customizable, fully contained way to have a multi-select dropdown included in your Angular application. I wrote it to meet my needs so there's probably a lot of stuff it doesn't do, or doesn't do well. Feel free to open an issue or fork it and make changes.

### Usage
To use the multi-select-dropdown, follow these steps:
1. Import the `EaMultiSelectDropdownModule` in your module.
 * There is an option to import the module with `.forRoot()`, but that isn't necessary and provides no additional functionality or features.
2. Use `<ea-multi-select-dropdown {options}>` where `{options}` are defind in the Options section below
3. To instruct the multi-select-dropdowns to close when a specific element is clicked, apply the `eaMultiSelectDropdownClose` directive to that element with a value of true (e.g. `eaMultiSelectDropdownClose="true"`)
 * Using the `eaMultiSelectDropdownClose` with a value of true tells the directive to bind an event listener to the specified element instead of the document
4. To instruct the multi-select-dropdowns to close when another somewhere else on the document (DOM) is clicked, apply the `eaMultiSelectDropdownClose` directive to any form element (we know this isn't ideal and we're working on a better way in the future)
 * It's important to note that every time you apply the `eaMultiSelectDropdownClose` directive to an element, an event listener is bound to the root document so you should only add one for performance purposes

### Options On The `ea-multi-select-dropdown` Component
<h5 style="font-weight: 700; display: inline;">addSelectAllOption</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: grey;">Boolean</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Injects a special option in the dropdown to allow the user to select all options with one click. The default text displayed is (Select All), but can be configured using the `selectAllText` option described below. This option will be completely ignored if the `allowMultiple` is set to false or there are no options provided.

Since: 0.0.1

Default Value: `false`

<h5 style="font-weight: 700; display: inline;">allowMultiple</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: grey;">Boolean</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Specifies whether multiple values can be selected from the dropdown. As noted above, this value ***must*** be set to `true` (the default) in order for `addSelectAllOption` to be understood. When this value is set to `false` and an option is selected from the list, all other options in the list will be de-selected, and the list will close immediately.

Since: 0.0.1

Default Value: `true`

<h5 style="font-weight: 700; display: inline;">buttonClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to the button that toggles the dropdown list. Specifying a new array will have the effect of removing all defaults.

Since: 0.0.1

Default Value: `['btn', 'btn-default']`

<h5 style="font-weight: 700; display: inline;">buttonIconClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to the icon that is displayed on the right-side of the button that toggles the dropdown list. Specifying a new array will have the effect of removing all defaults.

Since: 0.0.1

Default Value: `['fa', 'fa-angle-down', 'align-self-center']`

<h5 style="font-weight: 700; display: inline;">buttonTextStyles</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: black;">Object</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any styles that should be applied to the &lt;span&gt; that contains the text displayed on the button that toggles the dropdown list.

Since: 0.0.1

Default Value: `{'flex': 1}`

<h5 style="font-weight: 700; display: inline;">buttonWrapperClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to the wrapper &lt;div&gt; that wraps the &lt;span&gt; and icon inside the button that toggles the dropdown list.

Since: 0.0.1

Default Value: `['d-flex']`

<h5 style="font-weight: 700; display: inline;">checkedClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to the icon that acts as the checkbox when the option is selected. This module was originally designed to be used with Font Awesome 4.7.0 so the "checkbox" is actually an &lt;i&gt; tag that uses classes to change its own appearance based on whether the option is selected. Specifying a new array will have the effect of removing all defaults.

Since: 0.0.1

Default Value: `['fa', 'fa-check-square-o']`

<h5 style="font-weight: 700; display: inline;">containerClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to the wrapper that sits around the entire multi-select-dropdown. For internal purposes, we style this wrapper &lt;div&gt; with a class named `ea-multi-select-dropdown-container`.

Since: 0.0.1

Default Value: None

<h5 style="font-weight: 700; display: inline;">label</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify the text that will appear on the button when there are no options to select.

Since: 1.0.4

Default Value: `&nbsp;`

<h5 style="font-weight: 700; display: inline;">id</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String</span> or <span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: blue;">Number</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>/<span style="border-radius: .25em; color: red; padding: .5em; margin-left: .5em; background-color: yellow;">Required</span>

Allows you to specify a unique identifier for the multi-select-dropdown. This identifier is used by the service to close other dropdowns when this dropdown is opened. For that reason, this property is<span style="border-radius: .25em; color: red; padding: .5em; background-color: yellow;">required</span>if you are using more than one multi-select-dropdown that will interact with each other. We recommend always specifying an id to be safe.

Since: 0.0.1

Default Value: None

<h5 style="font-weight: 700; display: inline;">label</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify the text that will appear above the button.

Since: 0.0.1

Default Value: None

<h5 style="font-weight: 700; display: inline;">listClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to the &lt;div&gt; that wraps the options (the part that shows/hides when the button is clicked).

Since: 0.0.1

Default Value: None

<h5 style="font-weight: 700; display: inline;">options</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: blue;">EaMultiSelectDropdownOption Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

The values that are displayed for the user to select. Each object provided ***must*** conform to the EaMultiSelectDropdownOption interface. For reference, that interface looks like this:
```
{
  display: string;
  id: number | string;
  isSelected: boolean;
  value: string;
}
```

Since: 0.0.1

Default Value: None

<h5 style="font-weight: 700; display: inline;">optionClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to each option in the list (including the (Select All) option if it is added). Specifying a new array will have the effect of removing all defaults.

Since: 0.0.1

Default Value: `['multi-select-option']`

<h5 style="font-weight: 700; display: inline;">selectAllByDefault</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: grey;">Boolean</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Indicates that when the dropdown first loads, all options should be selected. This option will be only be applied if the `addSelectAllOption` is set to true. 

Since: 0.0.1

Default Value: `false`

<h5 style="font-weight: 700; display: inline;">selectAllText</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

The text that will be displayed if the `addSelectAllOption` is used.

Since: 0.0.1

Default Value: `(Select All)`

<h5 style="font-weight: 700; display: inline;">selectAllText</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

The value that will be used when the (Select All) option is selected if the `addSelectAllOption` is used.

Since: 0.0.1

Default Value: `null`

<h5 style="font-weight: 700; display: inline;">checkedClasses</h5>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: red;">String Array</span>
<span style="border-radius: .25em; color: white; padding: .5em; margin-left: .5em; background-color: green;">Optional</span>

Allows you to specify any classes that should be applied to the icon that acts as the checkbox when the option is not selected. This module was originally designed to be used with Font Awesome 4.7.0 so the "checkbox" is actually an &lt;i&gt; tag that uses classes to change its own appearance based on whether the option is selected. Specifying a new array will have the effect of removing all defaults.

Since: 0.0.1

Default Value: `['fa', 'fa-square-o']`

### The `config` Object
In lieu of specifying each of these options individually, it is possible to use the special `config` object. The `config` object uses the following structure:
```
{
    addSelectAllOption?: boolean;
    allowMultiple?: boolean;
    buttonClasses?: string[];
    buttonIconClasses?: string[];
    buttonTextStyles?: object;
    buttonWrapperClasses?: string[];
    checkedClasses?: string[];
    containerClasses?: string[];
    emptyText?: string;
    id?: string | number;
    labelText?: string;
    listClasses?: string[];
    optionClasses?: string[];
    options?: EaMultiSelectDropdownOption[];
    selectAllByDefault?: boolean;
    selectAllText?: string;
    selectAllValue?: string;
    uncheckedClasses?: string[];
}
```
All of the properties on the `config` object are optional. When an option is specified on the `config` property ***and*** by its own name, the named value will be used. For example, if you specify on the `config` property that `addSelectAllOption` is true, but then you specify the `addSelectAllOption` directly on the component and set that value to false, false will be used. The `config` object is intended to be a shorthand way to specify global settings one time that can be overwritten on a per-instance basis using the individual properties.

### Styling
Because the component is intended to be fully customizable, there are not many styles applied internally. Those that are applied are listed as defaults in the Options section above. Our intention is that you will style the component on your own when you use it. However, we know that we often look for out-of-the-box components so below you'll find our "default" styling. You can either add these styles to the global css, or you can set your component that will contain the multi-select-dropdown instances to use `ViewEncapsulation.None`. Either way, we highly recommend you prefix your styles with the `.ea-multi-select-dropdown-container` class (as we've done below) to avoid accidentally restyling other parts of your application.
```
.ea-multi-select-dropdown-container .option-list {
  z-index: 999999;
  position: absolute;
  background-color: #fff;
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  background-color: #fff !important;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 1em;
}

.ea-multi-select-dropdown-container .option-list > div {
  cursor: pointer;
}

.ea-multi-select-dropdown-container {
  position: relative;
  width: 100%;
}

.ea-multi-select-dropdown-container button{
  width: 100%;
}

.ea-multi-select-dropdown-container button > div > span {
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

### Sample
Finally, we'll leave you with a simple sample implementation of this component.

#### The Markup
```
<div class="container mt-2" eaMultiSelectDropdownClose>
  <div class="row">
      <div class="col-3 mb-4">
          <ea-multi-select-dropdown
              [id]="1"
              (selected)="select($event)"
              [label]="'Princess'"
              [options]="princesses"
              [addSelectAllOption]="true"
              [allowMultiple]="false">
          </ea-multi-select-dropdown>
      </div>
      <div class="col-3 mb-4">
          <ea-multi-select-dropdown
              [id]="2"
              (selected)="select($event)"
              [label]="'Creatures'"
              [options]="fantasyCreatures"
              [addSelectAllOption]="true"
              [selectAllText]="'All Creatures'"
              [selectAllByDefault]="true">
          </ea-multi-select-dropdown>
      </div>
      <div class="col-3 mb-4">
          <ea-multi-select-dropdown
              [id]="3"
              (selected)="select($event)"
              [label]="'Kingdom'"
              [options]="kingdoms">
          </ea-multi-select-dropdown>
      </div>
  </div>
  <div class="row">
      Princess {{princess}} lives in {{kingdom}} with lots of creatures, like {{creatures}}.
  </div>
  <div class="row">
      <button class="btn btn-primary">Apply</button>
  </div>
</div>
```

#### The TypeScript
```
import { Component, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';

import {
  EaMultiSelectDropdownComponent,
  EaMultiSelectDropdownService,
  EaMultiSelectDropdownOption
} from './modules/multi-select-dropdown/multi-select-dropdown.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChildren(EaMultiSelectDropdownComponent) dropdowns: QueryList<EaMultiSelectDropdownComponent>;

  constructor(private multiSelectDropdownService: EaMultiSelectDropdownService) {}

  public creatures = '';
  public kingdom = '';
  public princess = '';

  public princesses: EaMultiSelectDropdownOption[] = [
    {id: 'cinderella', value: 'Princess.Cinderella', display: 'Cinderella', isSelected: false},
    {id: 'snow-white', value: 'Princess.Snow-White', display: 'Snow White', isSelected: false},
    {id: 'briar-rose', value: 'Princess.Briar-Rose', display: 'Sleeping Beauty', isSelected: false}
  ];

  public fantasyCreatures: EaMultiSelectDropdownOption[] = [
    {id: 'fairies', value: 'Creatures.Fairies', display: 'Fairies', isSelected: false},
    {id: 'trolls', value: 'Creatures.Trolls', display: 'Trolls', isSelected: false},
    {id: 'ogres', value: 'Creatures.Ogres', display: 'Ogres', isSelected: false}
  ];

  public kingdoms: EaMultiSelectDropdownOption[] = [
    {id: 'westeros', value: 'Kingdom.Westeros', display: 'Westeros', isSelected: false},
    {id: 'agartha', value: 'Kingdom.Agartha', display: 'Agartha', isSelected: false},
    {id: 'Shambhala', value: 'Kingdom.Shambhala', display: 'Shambhala', isSelected: false}
  ];

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
}

```