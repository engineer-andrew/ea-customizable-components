import { TestBed, inject } from '@angular/core/testing';
import { FakeEaMultiSelectDropdownComponent } from '../multi-select-dropdown-component/fake-multi-select-dropdown.component';

import { EaMultiSelectDropdownService } from './multi-select-dropdown.service';

describe('', () => {
  let service: EaMultiSelectDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EaMultiSelectDropdownService]
    });

    service = TestBed.get(EaMultiSelectDropdownService);
  });

  describe('MultiSelectDropdownService should define a function named', () => {
    it('closeAll', () => {
      // assert
      expect(service.closeAll).toBeDefined();
    });

    it('closeOthers', () => {
      // assert
      expect(service.closeOthers).toBeDefined();
    });

    it('register', () => {
      // assert
      expect(service.register).toBeDefined();
    });
  });

  describe('the open function on MultiSelectDropdownService', () => {
    it('should close all registered components except the selected component', () => {
      // arrange
      const first = new FakeEaMultiSelectDropdownComponent(service);
      first.id = 1;
      service.components.push(first);
      const second = new FakeEaMultiSelectDropdownComponent(service);
      second.id = 1;
      service.components.push(second);
      const component = new FakeEaMultiSelectDropdownComponent(service);
      component.id = 2;
      component.isOpen = false;
      service.components.push(component);
      spyOn(first, 'close');
      spyOn(second, 'close');
      spyOn(component, 'close');

      // act
      service.closeOthers(component);

      // assert
      expect(first.close).toHaveBeenCalledTimes(1);
      expect(second.close).toHaveBeenCalledTimes(1);
      expect(component.close).not.toHaveBeenCalled();
    });
  });

  describe('the register function on MultiSelectDropdownService', () => {
    it('should add the passed component to the components list', () => {
      // arrange
      const component = new FakeEaMultiSelectDropdownComponent(service);
      component.id = 99;
      service.components = [];

      // act
      service.register(component);

      // assert
      expect(service.components.length).toBe(1);
      expect(service.components[0].id).toBe(99);
    });
  });
});
