const target = document.getElementById("target-tbody")
const template = document.getElementById("table-template")





document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/users").then(responst => responst.json()).then(responst => loadTable(responst))
})


function loadTable(data) {

    console.table(data)

    target.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        const row = template.content.cloneNode(true)
        const fields = row.getElementById("template-tr").getElementsByClassName("table-fields")

        comapcLoad(data, fields, index)


        target.appendChild(row)
    }

}

function comapcLoad(data, fields, index) {

    
    fields[0].textContent = data[index].name
    fields[1].textContent = data[index].email
    fields[2].textContent = data[index].city
    fields[3].textContent = data[index].phone
    fields[4].textContent = data[index].role
    return fields
}