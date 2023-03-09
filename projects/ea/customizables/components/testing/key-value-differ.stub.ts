export class KeyValueDifferStub {
  diff(): any {
    return {
      forEachItem(fn: (r: any) => void): void {},
      forEachPreviousItem(fn: (r: any) => void): void {},
      forEachChangedItem(fn: (r: any) => void): void {},
      forEachAddedItem(fn: (r: any) => void): void {},
      forEachRemovedItem(fn: (r: any) => void): void {}
    };
  }
}
