import { KeyValueDifferStub } from './key-value-differ.stub';

export class KeyValueDifferFactoryStub {
  create(): any {
    return new KeyValueDifferStub();
  }

  supports(): boolean {
    return false;
  }
}
