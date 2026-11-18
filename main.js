

const usersRecource = "http://localhost:3000/users"


let toPut = false

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



        const data = {
            name: nameInp.value,
            email: emailInp.value,
            city: varosInp.value,
            phone: telInp.value,
            role: Number(szerepkorInp.value)
        }

        if (Number(addUserBtn.dataset.id) === 0) {
            postUser(data)
        }
        else {
            putUser(data, addUserBtn.dataset.id)

        }
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
            return response.json();
        })
        .then(res => console.log(res))
        .then(() => fetchUsers())
        .catch((error) => {
            console.log(error);

        });

}
function putUser(data, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch(`${usersRecource}/${id}`, requestOptions)
        .then(response => response.json())
        .then(()=> addUserBtn.dataset.id=0)
        .then(() => fetchUsers()).catch(error => console.log(error))

}

function deletUser(id) {
    fetch(`${usersRecource}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(res => console.log(res))
        .then(() => fetchUsers())
        .catch(error => console.log("huh" + error))
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


function loadDataToForm(data) {
    nameInp.value = ''
    emailInp.value = ''
    varosInp.value = ''
    telInp.value = ''
    szerepkorInp.value = ''
    nameInp.value = data.name
    emailInp.value = data.email
    varosInp.value = data.city
    telInp.value = data.phone
    szerepkorInp.value = data.role
}



function loadData(data, fields, index) {
    fields[0].textContent = data[index].name
    fields[1].textContent = data[index].email
    fields[2].textContent = data[index].city
    fields[3].textContent = data[index].phone

    let userRole = ""
    if (data[index].role == 1) {
        userRole = "vásárló"
    }
    else if (data[index].role == 2) {
        userRole = "eladó"
    }
    else {
        userRole = "admin"
    }

    fields[4].textContent = userRole


    const modify = document.createElement("button")
    modify.textContent = "Módosítás"
    modify.className = "btn-solid theme-secondary"
    modify.addEventListener("click", () => {
        loadDataToForm(data[index])
        addUserBtn.dataset.id = data[index].id
        console.log(addUserBtn.dataset.id);
        
    })
    const torles = document.createElement("button")
    torles.textContent = "Törlés"
    torles.className = "btn-solid theme-danger"
    torles.addEventListener("click", () => {
        deletUser(data[index].id)
    })


    fields[5].appendChild(modify)
    fields[6].appendChild(torles)



    return fields
}




document.addEventListener("DOMContentLoaded", () => {
    addUserBtn.dataset.id = 0
    console.log(addUserBtn.dataset.id);

    fetchUsers()
})
addUserBtn.addEventListener("click", () => {
    console.log(addUserBtn.dataset.id);
    validateInputData()
    nameInp.value = ''
    emailInp.value = ''
    varosInp.value = ''
    telInp.value = ''
    szerepkorInp.value = ''

})