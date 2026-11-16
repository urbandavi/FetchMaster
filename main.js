


document.addEventListener("DOMContentLoaded",  () =>{
    fetch("http://localhost:3000/users").then(responst => responst.json()).then(responst => loadTable(responst))
})




















function loadTable(data) {

    console.table(data)

    target.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        const row = template.content.cloneNode(true)
        const fields = row.getElementById("template-tr").getElementsByClassName("table-fields")
        
        
        

        target.appendChild(row)
    }

}

function comapcLoad(konyv, fields, index) {
    fields[0].textContent = konyv.cim
    fields[1].textContent = konyv.szerzo
    fields[2].textContent = konyv.kiadasiev
    fields[3].textContent = konyv.oldalszam
    fields[4].textContent = konyv.kolcsonozve ? "Kölcsönozve" : "Nincs kölcsönozve"

    const button = document.createElement("button")
    button.textContent = konyv.kolcsonozve ? "Visszavitel" : "Kölcsönzés"
    button.addEventListener("click", () => {
        if (konyv.kolcsonozve) {
            konyv.visszahoz()
        }
        else {
            konyv.kolcsonoz()

        }
        console.log(konyv.kolcsonozve, konyv.kolcsonoz)
        loadTableCompact()
    })
    const torles = document.createElement("button")
    torles.textContent = "Törlés"
    torles.addEventListener("click", () => {
        konyvek.splice(index, 1)
        loadTableCompact()
        writeStatistics(getStatistics())
    })


    fields[5].appendChild(button)
    fields[6].appendChild(torles)
    return fields
}