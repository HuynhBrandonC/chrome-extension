const inputBtn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}

function render(Leads) {
    let listItems = ""
    for (let i = 0; i < Leads.length; i++) {
        listItems += 
        `<li>
            <a target=_blank href=${Leads[i]}>${Leads[i]}
            </a>
        </li>`
    }

    ulEl.innerHTML = listItems;
}

delBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);

})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

