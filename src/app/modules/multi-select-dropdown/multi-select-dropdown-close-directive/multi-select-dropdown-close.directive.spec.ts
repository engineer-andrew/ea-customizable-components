import { Component, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EaMultiSelectDropdownCloseDirective } from './multi-select-dropdown-close.directive';
import { EaMultiSelectDropdownService } from '../multi-select-dropdown-service/multi-select-dropdown.service';
import { MockEaMultiSelectDropdownService } from '../multi-select-dropdown-service/mock-multi-select-dropdown.service';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div eaMultiSelectDropdownClose></div>'
})
class MultiSelectDropdownCloseDirectiveTestComponent {}

class MockRenderer {
  listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void): () => void {
    return () => {
      console.log('fake listener');
    };
  }
}

describe('EaMultiSelectDropdownCloseDirective', () => {
  let component: MultiSelectDropdownCloseDirectiveTestComponent;
  let fixture: ComponentFixture<MultiSelectDropdownCloseDirectiveTestComponent>;
  let multiSelectDropdownService: EaMultiSelectDropdownService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiSelectDropdownCloseDirectiveTestComponent,
        EaMultiSelectDropdownCloseDirective
      ],
      providers: [
        {
          provide: EaMultiSelectDropdownService,
          useClass: MockEaMultiSelectDropdownService
        },
        {
          provide: Renderer2,
          useClass: MockRenderer
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectDropdownCloseDirectiveTestComponent);
    component = fixture.componentInstance;
    multiSelectDropdownService = TestBed.get(EaMultiSelectDropdownService);
    renderer = TestBed.get(Renderer2);
  });

  // it('should be true', () => {
  //   const listener = (evt: any) => {
  //     return true;
  //   };
  //   spyOn(renderer, 'listen');
  //   fixture.detectChanges();

  //   // this fails because the renderer is the instance provided to the testing component, not the directive
  //   // though that hardly makes sense if providers are singletons
  //   expect(renderer.listen).toHaveBeenCalledTimes(1);
  // });

  // describe('the event listener bound to the body of the document', () => {
  //   it('should check whether the target of the click event has a MultiSelectDropdown as an ancestor', () => {
  //     // arrange
  //     const component = new FakeEaMultiSelectDropdownComponent(service);
  //     component.id = 99;
  //     service.isBodyListenerRegistered = false;
  //     service.register(component);
  //     const button = document.createElement('button');
  //     const body = document.querySelector('body');
  //     body.appendChild(button);
  //     spyOn(service, 'findClosest');

  //     // act
  //     button.click();

  //     // assert
  //     expect(service.findClosest).toHaveBeenCalledTimes(1);
  //     expect(service.findClosest).toHaveBeenCalledWith(button);
  //   });

  //   it('should close all registered components when the target of the click event does not have a MultiSelectDropdown as an ancestor',
  //     () => {
  //       // arrange
  //       const first = new FakeEaMultiSelectDropdownComponent(service);
  //       first.id = 99;
  //       const second = new FakeEaMultiSelectDropdownComponent(service);
  //       second.id = 98;
  //       service.components.push(first);
  //       service.components.push(second);
  //       const component = new FakeEaMultiSelectDropdownComponent(service);
  //       component.id = 96;
  //       service.isBodyListenerRegistered = false;
  //       service.register(component);
  //       const button = document.createElement('button');
  //       document.body.appendChild(button);
  //       spyOn(service, 'findClosest').and.returnValue(null);
  //       spyOn(first, 'close');
  //       spyOn(second, 'close');
  //       spyOn(component, 'close');

  //       // act
  //       button.click();

  //       // assert
  //       expect(first.close).toHaveBeenCalledTimes(1);
  //       expect(second.close).toHaveBeenCalledTimes(1);
  //       expect(component.close).toHaveBeenCalledTimes(1);
  //     }
  //   );

  //   it('should not close all registered components when the target of the click event has a MultiSelectDropdown as an ancestor', () => {
  //     // arrange
  //     const first = new FakeEaMultiSelectDropdownComponent(service);
  //     first.id = 99;
  //     const second = new FakeEaMultiSelectDropdownComponent(service);
  //     second.id = 98;
  //     service.components.push(first);
  //     service.components.push(second);
  //     const component = new FakeEaMultiSelectDropdownComponent(service);
  //     component.id = 96;
  //     service.isBodyListenerRegistered = false;
  //     service.register(component);
  //     const dropdown = document.createElement('app-multi-select-dropdown');
  //     document.body.appendChild(dropdown);
  //     spyOn(service, 'findClosest').and.returnValue(document.querySelector('body'));
  //     spyOn(first, 'close');
  //     spyOn(second, 'close');
  //     spyOn(component, 'close');

  //     // act
  //     dropdown.click();

  //     // assert
  //     expect(first.close).not.toHaveBeenCalled();
  //     expect(second.close).not.toHaveBeenCalled();
  //     expect(component.close).not.toHaveBeenCalled();
  //   });
  // });
});
