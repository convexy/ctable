type DataType = "string" | "int" | "number" | "date" | "time" | "datetime";

export class CTableColumn {
  public readonly physicalName: string;
  public readonly name: string;
  public readonly dataType: DataType;
  public readonly onlyHalfWidthCharacter: boolean;
  private hidden: boolean;
  public digits: number | null;
  constructor(phyiscalName: string, name: string, dataType: DataType, options?: {
    digits?: number, onlyHalfWidthCharacter?: boolean, hidden?: boolean
  }) {
    this.physicalName = phyiscalName;
    this.name = name;
    this.dataType = dataType;
    switch (this.dataType) {
      case "string":
        this.digits = options?.digits ?? null;
        this.onlyHalfWidthCharacter = options?.onlyHalfWidthCharacter ?? false;
        break;
      case "int":
      case "number":
        this.digits = options?.digits ?? null;
        this.onlyHalfWidthCharacter = true;
        break;
      case "datetime":
        this.digits = "yyyy/mm/dd hh:mm:ss".length;
        this.onlyHalfWidthCharacter = true;
        break;
      case "date":
        this.digits = "yyyy/mm/dd".length;
        this.onlyHalfWidthCharacter = true;
        break;
      case "time":
        this.digits = "hh:mm:ss".length;
        this.onlyHalfWidthCharacter = true;
        break;
    }
    this.hidden = options?.hidden ?? false;
  }
}

export class CTable {
  private id: string;
  private table: HTMLTableElement;
  private tbody: HTMLTableSectionElement;
  private columns: CTableColumn[];
  public readonly data: { [key: string]: string | number | Date | null }[];
  private selectedArea: { start: { row: number, column: number }, end: { row: number, column: number } };
  constructor(tableElement: HTMLElement | HTMLTableElement | null, columns: CTableColumn[], options?: {
    caption?: string, displayRowNumber?: boolean
  }) {
    if (!tableElement || !(tableElement instanceof HTMLTableElement)) throw new Error("Table element not found!");
    this.id = tableElement.id.length > 0 ? tableElement.id : "ctable";
    this.table = tableElement as HTMLTableElement;
    this.table.classList.add("ctable");
    // const self = this;
    // this.table.addEventListener("dragenter", (event) => {
    //   const target = event.target as HTMLElement;
    //   const td = target.closest('td');
    //   console.log("drag", td);
    //   if (td && self.table.contains(td)) {
    //     const rowNumber = parseInt(td.getAttribute("ctable-row") ?? "1");
    //     const columnNumber = parseInt(td.getAttribute("ctable-column") ?? "1");
    //     self.selectedArea.start.row = rowNumber;
    //     self.selectedArea.start.column = columnNumber;
    //     self.selectedArea.end.row = rowNumber;
    //     self.selectedArea.end.column = columnNumber;
    //     const cells = self.tbody.getElementsByTagName("td");
    //     for (const cell of cells) {
    //       const rowNumber = parseInt(cell.getAttribute("ctable-row") ?? "1");
    //       const columnNumber = parseInt(cell.getAttribute("ctable-column") ?? "1");
    //       if (
    //         ((self.selectedArea.start.row <= rowNumber && rowNumber <= self.selectedArea.end.row) || (self.selectedArea.end.row <= rowNumber && rowNumber <= self.selectedArea.start.row)
    //           || (self.selectedArea.end.row <= rowNumber && rowNumber <= self.selectedArea.start.row) || (self.selectedArea.start.row <= rowNumber && rowNumber <= self.selectedArea.end.row))
    //         && ((self.selectedArea.start.column <= columnNumber && columnNumber <= self.selectedArea.end.column) || (self.selectedArea.end.column <= columnNumber && columnNumber <= self.selectedArea.start.column)
    //           || (self.selectedArea.end.column <= columnNumber && columnNumber <= self.selectedArea.start.column) || (self.selectedArea.start.column <= columnNumber && columnNumber <= self.selectedArea.end.column))
    //       ) {
    //         cell.classList.add("ctable-selected");
    //       }
    //       else {
    //         cell.classList.remove("ctable-selected");
    //       }
    //     }
    //   }
    // });
    // this.table.addEventListener("drag", function (event) {
    //   const target = event.target as HTMLElement;
    //   const td = target.closest('td');
    //   console.log("drag", td);
    //   if (td && self.table.contains(td)) {
    //     const rowNumber = parseInt(td.getAttribute("ctable-row") ?? "1");
    //     const columnNumber = parseInt(td.getAttribute("ctable-column") ?? "1");
    //     self.selectedArea.end.row = rowNumber;
    //     self.selectedArea.end.column = columnNumber;
    //     const cells = self.tbody.getElementsByTagName("td");
    //     for (const cell of cells) {
    //       const rowNumber = parseInt(cell.getAttribute("ctable-row") ?? "1");
    //       const columnNumber = parseInt(cell.getAttribute("ctable-column") ?? "1");
    //       if (
    //         ((self.selectedArea.start.row <= rowNumber && rowNumber <= self.selectedArea.end.row) || (self.selectedArea.end.row <= rowNumber && rowNumber <= self.selectedArea.start.row)
    //           || (self.selectedArea.end.row <= rowNumber && rowNumber <= self.selectedArea.start.row) || (self.selectedArea.start.row <= rowNumber && rowNumber <= self.selectedArea.end.row))
    //         && ((self.selectedArea.start.column <= columnNumber && columnNumber <= self.selectedArea.end.column) || (self.selectedArea.end.column <= columnNumber && columnNumber <= self.selectedArea.start.column)
    //           || (self.selectedArea.end.column <= columnNumber && columnNumber <= self.selectedArea.start.column) || (self.selectedArea.start.column <= columnNumber && columnNumber <= self.selectedArea.end.column))
    //       ) {
    //         cell.classList.add("ctable-selected");
    //       }
    //       else {
    //         cell.classList.remove("ctable-selected");
    //       }
    //     }
    //   }
    // });

    const div = document.createElement("div");
    (this.table.parentElement as HTMLElement).insertBefore(div, this.table);
    div.style.overflow = "auto";
    div.style.margin = "0px";
    div.style.padding = "0px";
    div.style.width = "100%";
    div.style.height = "100%";
    div.appendChild(this.table);


    this.columns = [new CTableColumn("#", "#", "int", { hidden: !(options?.displayRowNumber ?? false) }), ...columns];
    if (options?.caption) {
      const caption = document.createElement("caption");
      caption.textContent = options?.caption;
      this.table.appendChild(caption);
    }
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    this.columns.forEach(column => {
      const th = document.createElement("th");
      th.textContent = column.name;
      th.style.width = (column.digits ? column.digits * (!column.onlyHalfWidthCharacter ? 1 : 0.5) : 1).toString() + "em";
      tr.appendChild(th);
    })
    thead.appendChild(tr);
    this.table.appendChild(thead);

    const tbody = document.createElement("tbody");
    this.table.appendChild(tbody);
    this.tbody = tbody;

    this.data = [];
    this.selectedArea = { start: { row: 0, column: 0 }, end: { row: 0, column: 0 } };
  }
  addData(data: { [key: string]: string | number | Date | null }[]) {
    data.forEach(row => {
      this.data.push(row);
      const rowNumber = this.data.length;
      const tr = document.createElement("tr");
      this.columns.forEach(column => {
        const columnNumber = this.columns.indexOf(column);
        if (column.physicalName === "#") {
          const th = document.createElement("th");
          th.textContent = rowNumber.toString();
          tr.appendChild(th);
        }
        else {
          const td = document.createElement("td");
          let value = row[column.physicalName];
          if (value === null) {
            td.textContent = "";
          }
          else if (value === undefined) {
            td.textContent = "";
          }
          else if (typeof value === "string") {
            td.textContent = value;
          }
          else if (typeof value === "number") {
            if (column.dataType == "int") {
              td.textContent = value.toFixed(0);
            }
            else {
              td.textContent = value.toFixed(2);
            }
          }
          else if (value instanceof Date) {
            if (column.dataType === "datetime") {
              td.textContent = value.toLocaleString();
            }
            else if (column.dataType === "date") {
              td.textContent = value.toLocaleDateString();
            }
            else if (column.dataType === "time") {
              td.textContent = value.toLocaleTimeString();
            }
          }
          td.setAttribute("ctable-row", rowNumber.toString());
          td.setAttribute("ctable-column", columnNumber.toString());
          // td.id = this.id + "-r" + rowNumber.toString() + "-c" + columnNumber.toString();
          tr.appendChild(td);
        }
      });
      this.tbody.appendChild(tr);
    });
  }
  clearData() {
    this.data.length = 0;
    while (this.tbody.firstChild) {
      this.tbody.removeChild(this.tbody.firstChild);
    }
  }
  resetData(data: { [key: string]: string | number | Date | null }[]) {
    this.clearData();
    this.addData(data);
  }
}