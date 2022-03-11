let API = "http://localhost:8000/lists";
let search = $("#search");
let editFormName = $("#edit-form-name");
let editFormSurname = $("#edit-form-surname");
let editFormWeeklyKpi = $("#edit-form-weeklyKpi");
let editFormMonthlyKpi = $("#edit-form-monthlyKpi");
let editFormTestHtml = $("#edit-form-test-html");
let editFormTestCss = $("#edit-form-test-css");
let editFormTestForms = $("#edit-form-test-forms");
let tbody = $("#tbody");
let deleteBtn = $("#btn-delete");

let saveChangesBtn = $("#save-changes-btn");

saveChangesBtn.on("click", async function () {
  let studentList = {
    name: editFormName.val(),
    surname: editFormSurname.val(),
    weeklyKpi: editFormWeeklyKpi.val(),
    monthlyKpi: editFormMonthlyKpi.val(),
    testHtml: editFormTestHtml.val(),
    testCss: editFormTestCss.val(),
    testForms: editFormTestForms.val(),
  };
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(studentList),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  render();
});

async function render() {
  let data1 = await fetch(API).then((res) => res.json());
  data1.forEach((item) => {
    console.log(item);
    tbody.append(`  <tr>
    <td>${item.id}</td>
<td colspan="4">${item.name}</td>

<td>${item.surname}</td>
<td></td>
<td class="table-danger"></td>

<td>100</td>
<td></td>
<td class="table-danger"></td>

<td>100</td>
<td></td>
<td class="table-danger">${item.weeklyKpi}</td>

<td class="table-danger"></td>
<td></td>
<td class="table-dark">${item.monthlyKpi}</td>
</tr> `);
  });
}
render();

$("body").on("click", "#btn-delete", function (e) {
  let id = e.target.parentNode.id;
  fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((response) => render());
});
