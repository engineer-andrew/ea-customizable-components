import { KeyValueDifferFactoryStub } from './key-value-differ-factory.stub';

export class KeyValueDiffersStub {
  find(): any {
    return new KeyValueDifferFactoryStub();
  }
}
