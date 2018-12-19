import { EaEventListenerMatchable } from './';

export interface EaEventListenerConfig {
  event: string;
  listenOn: 'window' | 'document' | 'body';
  matchables: EaEventListenerMatchable[];
}
