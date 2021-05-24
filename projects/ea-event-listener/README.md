# EaEventListener

A directive that allows events to be listened for and some action taken when the event is heard.

### Installation
```
$ npm install ea-event-listener
```

### Code
The code is on [Github](https://github.com/engineer-andrew/ea-customizable-components/tree/master/projects/ea-event-listener).

### Quick Notes
The intention of this directive is to provide an easy way to listen on any element in the UI for standard JavaScript events. For example, you can listen for a click on the document and take some action when that event is "heard". I wrote it to meet my needs so there's probably a lot of stuff it doesn't do, or doesn't do well. Feel free to open an issue or fork it and make changes.

### Usage
To use the ea-event-listener, follow these steps:
1. Import the `EaEventListenerModule` in your module.
2. Use `(eaEventListener)="listener($event)` where `listener` is defined on your component and accepts an array of `HTMLElement`s
3. Use `[config]=listenerConfig` to specify the configuration that should be used by EaEventListener
 * The config options are detailed below

### Configurable Options
##### event
 * A string used to specify which event to listen for (e.g. 'click')
<h5 style="font-weight: 700; display: inline;">addSelectAllOption</h5>

##### listenOn
 * Either 'document', 'body', or 'window'
 * There is currently no support to listen on specific controls

##### matchables
 * An array of `EaEventListenerMatchable`s that allow you to specify controls in the tree leading to the event that was triggered, which can be used to avoid triggering the event in some instances, or to only trigger the event in some instances

 #### Build and Publish
To build, navigate to the root directory (ea-customizable-components) and run the command ```ng build ea-event-listener```. This will have the effect of generating an updated component in the dist folder

To publish the updated component, navigate to the dist directory (dist\ea-event-listener) and run the command ```npm publish```. You must be logged in to npm and have permissions to publish an update to this package, and be sure to update the package.json for ea-multi-select-dropdown or npm will reject the package.