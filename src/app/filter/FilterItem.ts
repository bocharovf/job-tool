/**
 * Represents filter collection element
 */
export class FilterItem{

  /**
   * Create new FilterItem
   * @param name display name to show
   * @param id unique identifier
   * @param group display name of element group
   * @param level nested level of element
   */
  constructor(
    public name: string,
    public id: any,
    public group?: string,
    public level?: number) {
  }

  public toString = () : string => {
    return this.name;
  }
}
