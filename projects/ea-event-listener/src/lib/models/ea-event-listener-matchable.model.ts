import { EaEventListenerMatcherTypes } from '../enums';

export interface EaEventListenerMatchable {
  matcher: EaEventListenerMatcherTypes;
  matchers: string[];
}
