import { EaEventListenerDirective } from './ea-event-listener.directive';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ea-test-component',
  template: '<div (eaEventListener)="callback($event)" [config]="listenerConfig"></div>'
})
class TestComponent {}

describe('EventListenerDirective', () => {
  let component: TestComponent;
  let directive: EaEventListenerDirective;
  let fixture: ComponentFixture<TestComponent>;
  let renderer: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        EaEventListenerDirective
      ],
      providers: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      const directiveDebugElement = fixture.debugElement.query(By.directive(EaEventListenerDirective));

      directive = directiveDebugElement.injector.get(EaEventListenerDirective);
      renderer = directiveDebugElement.injector.get(Renderer2);

      spyOn(renderer, 'listen').and.callThrough();
    });
  }));

  it('should listen for the configured event', () => {
    directive.config = {
      event: 'click',
      listenOn: 'document',
      matchables: [{
        matcher: 'class',
        matchers: ['ea-multi-select-dropdown-container']
      }]
    };

    directive.ngOnInit();

    expect(renderer.listen).toHaveBeenCalledTimes(1);
    expect(renderer.listen['calls'].mostRecent().args[1]).toBe('click');
  });

  it('should listen on the configured element', () => {
    directive.config = {
      event: 'click',
      listenOn: 'document',
      matchables: [{
        matcher: 'class',
        matchers: ['ea-multi-select-dropdown-container']
      }]
    };

    directive.ngOnInit();

    expect(renderer.listen).toHaveBeenCalledTimes(1);
    expect(renderer.listen['calls'].mostRecent().args[0]).toBe('document');
  });

  it('should emit its event when the configured element encounters the configured event', () => {
    spyOn(directive.eaEventListener, 'emit');
    directive.config = {
      event: 'click',
      listenOn: 'document',
      matchables: [{
        matcher: 'class',
        matchers: ['ea-multi-select-dropdown-container']
      }]
    };
    directive.ngOnInit();

    document.body.click();

    expect(directive.eaEventListener.emit).toHaveBeenCalledTimes(1);
  });
});
