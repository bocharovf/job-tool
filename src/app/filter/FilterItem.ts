
export class FilterItem{
  constructor(public name: string, public id: any, public group?: string) {
  }

  public toString = () : string => {
    return this.name;
  }
}
