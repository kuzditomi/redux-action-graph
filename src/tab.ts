export class Tabulator {
  private tab: string = "";

  public get Tab() {
    return this.tab;
  }

  public increaseTab = () => {
    this.tab += "\t";
  };

  public descreaseTab = () => {
    this.tab = this.tab.substr(0, this.tab.length - 1);
  };
}
