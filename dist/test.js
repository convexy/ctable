import { CTable, CTableColumn } from "./ctable";
document.addEventListener("DOMContentLoaded", function () {
    const columns = [
        new CTableColumn("id", "ID", "string", { digits: 5, onlyHalfWidthCharacter: true }),
        new CTableColumn("name", "Name", "string", { digits: 10 }),
        new CTableColumn("name2", "Name", "string", { digits: 10 }),
        new CTableColumn("name3", "Name", "string", { digits: 10 }),
        new CTableColumn("name4", "Name", "string", { digits: 10 }),
        new CTableColumn("name5", "Name", "string", { digits: 10 }),
        new CTableColumn("name6", "Name", "string", { digits: 10 }),
        new CTableColumn("name7", "Name", "string", { digits: 10 }),
        new CTableColumn("name8", "Name", "string", { digits: 10 }),
        new CTableColumn("name9", "Name", "string", { digits: 10 }),
        new CTableColumn("name10", "Name", "string", { digits: 10 }),
    ];
    const ctable = new CTable(document.getElementById("maintable"), columns);
    ctable.addData([
        { "id": "00001", "name": "foo" },
        { "id": "00002", "name": "bar" },
        { "id": "00003", "name": "あ".repeat(10), "name2": "い".repeat(10), "name3": "あ".repeat(10), "name4": "あ".repeat(10), "name5": "あ".repeat(10), "name6": "あ".repeat(10), "name7": "あ".repeat(10) },
        { "id": "00004", "name": "1234567890" },
        { "id": "00005", "name": "1234567890" },
        { "id": "00006", "name": "1234567890" },
        { "id": "00007", "name": "1234567890" },
        { "id": "00008", "name": "1234567890" },
        { "id": "00009", "name": "1234567890" },
        { "id": "00010", "name": "1234567890" },
        { "id": "00011", "name": "foo" },
        { "id": "00012", "name": "bar" },
        { "id": "00013", "name": "あ".repeat(10), "name2": "い".repeat(10), "name3": "あ".repeat(10), "name4": "あ".repeat(10), "name5": "あ".repeat(10), "name6": "あ".repeat(10), "name7": "あ".repeat(10) },
        { "id": "00014", "name": "1234567890" },
        { "id": "00015", "name": "1234567890" },
        { "id": "00016", "name": "1234567890" },
        { "id": "00017", "name": "1234567890" },
        { "id": "00018", "name": "1234567890" },
        { "id": "00019", "name": "1234567890" },
        { "id": "00020", "name": "1234567890" },
        { "id": "00021", "name": "foo" },
        { "id": "00022", "name": "bar" },
        { "id": "00023", "name": "あ".repeat(10), "name2": "い".repeat(10), "name3": "あ".repeat(10), "name4": "あ".repeat(10), "name5": "あ".repeat(10), "name6": "あ".repeat(10), "name7": "あ".repeat(10) },
        { "id": "00024", "name": "1234567890" },
        { "id": "00025", "name": "1234567890" },
        { "id": "00026", "name": "1234567890" },
        { "id": "00027", "name": "1234567890" },
        { "id": "00028", "name": "1234567890" },
        { "id": "00029", "name": "1234567890" },
        { "id": "00030", "name": "1234567890" },
        { "id": "00031", "name": "foo" },
        { "id": "00032", "name": "bar" },
        { "id": "00033", "name": "あ".repeat(10), "name2": "い".repeat(10), "name3": "あ".repeat(10), "name4": "あ".repeat(10), "name5": "あ".repeat(10), "name6": "あ".repeat(10), "name7": "あ".repeat(10) },
        { "id": "00034", "name": "1234567890" },
        { "id": "00035", "name": "1234567890" },
        { "id": "00036", "name": "1234567890" },
        { "id": "00037", "name": "1234567890" },
        { "id": "00038", "name": "1234567890" },
        { "id": "00039", "name": "1234567890" },
    ]);
    // let i = 1;
    // setInterval(() => {
    //   const lastclassname = "ctable" + ((i == 1) ? "" : i.toString());
    //   document.getElementById("maintable")?.classList.remove(lastclassname);
    //   i++;
    //   if (i == 8) i = 1;
    //   const nextclassname = "ctable" + ((i == 1) ? "" : i.toString());
    //   document.getElementById("maintable")?.classList.add(nextclassname);
    //   console.log(nextclassname);
    // }, 4000)
});
//# sourceMappingURL=test.js.map