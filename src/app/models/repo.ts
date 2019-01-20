export class Repo {
  private imgs : string[]
  private readMeContent : string;

  constructor(
    public name : string,
    public description: string
  ) {}

  /*
    array of img urls
   */
  public setImgs(imgs : string[]) {
    this.imgs = imgs;
  }

  public getImgs() {
    return this.imgs;
  }

  public setReadMeContent(readMeContent : string) {
    this.readMeContent = readMeContent;
  }

  public getReadMeContent() {
    return this.readMeContent;
  }
}
