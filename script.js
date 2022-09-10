// declaring and assigning variables
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
let leads = [];
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromStorage = JSON.parse(localStorage.getItem("leads"));

if (leadsFromStorage) {
  leads = leadsFromStorage;
  render(leads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    leads.push(tabs[0].url);
    localStorage.setItem("leads", JSON.stringify(leads));
    render(leads);
  });
});

function render(lead) {
  let listItems = "";
  for (let i = 0; i < lead.length; i++) {
    listItems += `
    <li>
      <a href="${lead[i]}" target='_blank'>
        ${lead[i]}
      </a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  if (inputEl.value != "") {
    leads.push(inputEl.value);
    inputEl.value = "";
  }
  localStorage.setItem("leads", JSON.stringify(leads));
  render(leads);
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  leads = [];
  render(leads);
});
