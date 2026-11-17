const usersRecource = "http://localhost:3000/users"




const target = document.getElementById("target-tbody")
const template = document.getElementById("table-template")
const nameInp = document.getElementById("name-input")
const emailInp = document.getElementById("email-input")
const varosInp = document.getElementById("city-input")
const telInp = document.getElementById("phone-input")
const szerepkorInp = document.getElementById("role-input")
const addUserBtn = document.getElementById("add-user")




function validateInputData() {
    try {
        if (nameInp.value === "" || emailInp.value === "" || varosInp.value === "" || telInp.value === "") {
            throw new Error("Hiányzik az egyik elvárt adat!")
        }

        let userRole = ""
        if (szerepkorInp.value == 1) {
            userRole = "vásárló"
        }
        else if (szerepkorInp.value == 2) {
            userRole = "eladó"
        }
        else {
            userRole = "admin"
        }

        const dataToPost = {
            name: nameInp.value,
            email: emailInp.value,
            city: varosInp.value,
            phone: telInp.value,
            role: userRole
        }


        postUser(dataToPost)
    } catch (error) {
        alert(error)
    }
}



function fetchUsers() {
    fetch(usersRecource).then(responst => responst.json()).then(responst => loadTable(responst)).then().catch(error => console.log(error))

}
function postUser(data) {
    var headers = {
        "Content-Type": "application/json",
    }
    fetch(usersRecource, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(function (response) {
            response.json();
        })
        .then(res => console.log(res))
        .then(() => fetchUsers())
        .catch((error) => {
            console.log(error);

        });

}

function deletUser(id) {
    fetch(`${usersRecource}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(res => console.log(res))
        .then(() => fetchUsers())
        .catch(error => console.log(error))
}


function loadTable(data) {

    console.table(data)

    target.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        const row = template.content.cloneNode(true)
        const fields = row.getElementById("template-tr").getElementsByClassName("table-fields")

        loadData(data, fields, index)


        target.appendChild(row)
    }

}

function loadData(data, fields, index) {
    fields[0].textContent = data[index].name
    fields[1].textContent = data[index].email
    fields[2].textContent = data[index].city
    fields[3].textContent = data[index].phone
    fields[4].textContent = data[index].role


    const modify = document.createElement("button")
    modify.textContent = "Módosítás"
    modify.addEventListener("click", () => {

    })
    const torles = document.createElement("button")
    torles.textContent = "Törlés"
    torles.addEventListener("click", () => {
        deletUser(data[index].id)
    })


    fields[5].appendChild(modify)
    fields[6].appendChild(torles)



    return fields
}


document.addEventListener("DOMContentLoaded", () => {
    fetchUsers()
})
addUserBtn.addEventListener("click", () => {
    validateInputData()
})