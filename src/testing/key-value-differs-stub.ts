import { NgModule } from '@angular/core';
import { KeyValueDifferFactoryStub } from './';

export class KeyValueDiffersStub {
  find(): any {
    return new KeyValueDifferFactoryStub();
  }
}

@NgModule({
  declarations: [KeyValueDiffersStub]
})
export class KeyValueDiffersStubModule {}
