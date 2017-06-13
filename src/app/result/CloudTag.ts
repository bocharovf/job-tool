/**
 * Created by bocharovf on 13.06.17.
 */
/**
 * Represents jqCloud tag
 */
export class CloudTag {

  constructor (
    public text: string,
    public weight: number = 1,
    public html: any = null,
    public handlers: any = null) {

  }
}
