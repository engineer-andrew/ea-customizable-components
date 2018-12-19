import { NgModule } from '@angular/core';
import { KeyValueDifferStub } from './key-value-differ-stub';

export class KeyValueDifferFactoryStub {
  create(): any {
    return new KeyValueDifferStub();
  }

  supports(): boolean {
    return false;
  }
}

@NgModule({
  declarations: [KeyValueDifferFactoryStub]
})
export class KeyValueDifferFactoryStubModule {}
