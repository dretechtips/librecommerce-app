import jsPDF from "jspdf";

type Unit = "mm" | "cm" | "m" | "in" | "px" | "pt";

type PageFormat =
  | "a0"
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "a10"
  | "b0"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5"
  | "b6"
  | "b7"
  | "b8"
  | "b9"
  | "b10"
  | "c0"
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "c10"
  | "dl"
  | "letter"
  | "government-letter"
  | "legal"
  | "junior-legal"
  | "ledger"
  | "tabloid"
  | "credit-card";

export class PDFService {
  public docs: jsPDF;
  private margin: number;
  private width: number;
  private height: number;
  private unit: Unit;
  private fontSize: number;
  private orientation: "portrait" | "landscape";
  private format: PageFormat;

  /**
   * Units are in term of pt
   */
  private pageFormat: { [K in PageFormat]: [number, number] } = {
    a0: [2383.94, 3370.39],
    a1: [1683.78, 2383.94],
    a2: [1190.55, 1683.78],
    a3: [841.89, 1190.55],
    a4: [595.28, 841.89],
    a5: [419.53, 595.28],
    a6: [297.64, 419.53],
    a7: [209.76, 297.64],
    a8: [147.4, 209.76],
    a9: [104.88, 147.4],
    a10: [73.7, 104.88],
    b0: [2834.65, 4008.19],
    b1: [2004.09, 2834.65],
    b2: [1417.32, 2004.09],
    b3: [1000.63, 1417.32],
    b4: [708.66, 1000.63],
    b5: [498.9, 708.66],
    b6: [354.33, 498.9],
    b7: [249.45, 354.33],
    b8: [175.75, 249.45],
    b9: [124.72, 175.75],
    b10: [87.87, 124.72],
    c0: [2599.37, 3676.54],
    c1: [1836.85, 2599.37],
    c2: [1298.27, 1836.85],
    c3: [918.43, 1298.27],
    c4: [649.13, 918.43],
    c5: [459.21, 649.13],
    c6: [323.15, 459.21],
    c7: [229.61, 323.15],
    c8: [161.57, 229.61],
    c9: [113.39, 161.57],
    c10: [79.37, 113.39],
    dl: [311.81, 623.62],
    letter: [612, 792],
    "government-letter": [576, 756],
    legal: [612, 1008],
    "junior-legal": [576, 360],
    ledger: [1224, 792],
    tabloid: [792, 1224],
    "credit-card": [153, 243]
  };
  constructor(
    orientation?: "portrait" | "landscape",
    format?: PageFormat,
    compressPDF?: number
  ) {
    this.docs = new jsPDF(orientation, "pt", format, compressPDF);
    this.docs.setFont("Times", "Roman");
    this.fontSize = 12;
    this.docs.setFontSize(this.fontSize);
    console.log(this.docs.getFontList());
    this.unit = "pt";
    this.format = format ? format : "a4";
    this.orientation = orientation ? orientation : "portrait";
    this.width = this.getFormat(format)[0];
    this.height = this.getFormat(format)[1];
    this.margin = 0;
  }
  public setPageFormat(format?: PageFormat): void {
    if (format) {
      this.width = this.pageFormat[format][0];
      this.height = this.pageFormat[format][1];
    } else {
      this.width = this.pageFormat["a4"][0];
      this.height = this.pageFormat["a4"][1];
    }
  }
  private getFormat(format?: PageFormat): [number, number] {
    return (format ? this.pageFormat[format] : this.pageFormat["a4"]) as [
      number,
      number
    ];
  }
  public setMargin(amount: number) {
    this.margin = amount;
  }
  public shiftDown() {}
  public shiftUp() {}
  public text(
    text: string | string[],
    x: number,
    y: number,
    flags?: any,
    angle?: any,
    align?: any
  ) {
    x += this.margin;
    y += this.margin;
    return this.docs.text(text, x, y, flags, angle, align);
  }
  private stringf(text: string): string[] {
    try {
      if (text.search("\n") !== -1) {
        let aText: string[] = [];
        text
          .split("\n")
          .map(cur => this.stringf(cur))
          .forEach(cur => aText.push(...cur));
        return aText;
      }
      const whitespace: number = this.width - this.margin - this.margin;
      const aString: string[] = text.split("");
      const aText: string[] = [];
      let string = "";
      for (let i = 0; i < aString.length; i++) {
        let cur: number = this.docs.getTextWidth(string);
        string += aString[i] ? aString[i] : " ";
        let next: number = this.docs.getTextWidth(string);
        if (cur <= whitespace && next > whitespace) {
          aText.push(string);
          string = "";
        }
      }
      if (aText.length === 0) aText.push(text);
      return aText;
    } catch (e) {
      return [];
    }
  }
  public textf(text: string | string[], y: number, flags?: any, align?: any) {
    let textf: string[] = [];
    if (typeof text === "string") {
      textf.push(...this.stringf(text));
    } else {
      for (let line of text) {
        console.log(line);
        textf.push(...this.stringf(line));
      }
    }
    let whitespace = this.height - this.margin * 2 - y;
    const firstPageTextLength: number = Math.ceil(
      whitespace / this.docs.getLineHeight()
    );
    const pageTextLength: number = Math.ceil(
      (whitespace + y) / this.docs.getLineHeight()
    );
    const firstPage: string[] = textf.slice(0, firstPageTextLength);
    console.log(firstPageTextLength);
    this.text(firstPage, 0, y, flags, 0, align);
    if (textf.length > firstPageTextLength) {
      let page: string[] = textf.slice(firstPageTextLength, pageTextLength);
      let count = 1;
      console.log(page);
      while (page.length !== 0) {
        this.docs.addPage();
        this.text(page, 0, 0, flags, 0, align);
        page = textf.slice(
          firstPageTextLength + pageTextLength * count,
          pageTextLength
        );
        count++;
      }
    }
    return this.docs;
  }
  public addImage(
    imageData: string | HTMLImageElement | HTMLCanvasElement | Uint8Array,
    format: "JPEG" | "PNG" | "WEBP",
    x: number,
    y: number,
    width: number,
    height: number,
    alias: string,
    compression: "NONE" | "FAST" | "MEDIUM" | "SLOW",
    rotation: number
  ) {
    x += this.margin;
    y += this.margin;
    return this.docs.addImage(
      imageData,
      format,
      x,
      y,
      width,
      height,
      alias,
      compression,
      rotation
    );
  }
  public addImagef(
    imageData: string | HTMLImageElement | HTMLCanvasElement | Uint8Array,
    format: "JPEG" | "PNG" | "WEBP",
    align: "left" | "center" | "right",
    y: number,
    width: number,
    height: number,
    alias: string,
    compression: "NONE" | "FAST" | "MEDIUM" | "SLOW"
  ) {
    let x: number;
    switch (align) {
      case "center":
        x = -this.margin + this.width / 2 - width / 2;
        break;
      case "left":
        x = 0;
        break;
      case "right":
        x = this.width - this.margin * 2 - width;
        break;
      default:
        x = 0;
        break;
    }
    return this.addImage(
      imageData,
      format,
      x,
      y,
      width,
      height,
      alias,
      compression,
      0
    );
  }
}

export default PDFService;
