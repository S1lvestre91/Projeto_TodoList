const url = "https://localhost:7161/api/Tarefas";

const tbody = document.querySelector("#t-body")

const buttonX = document.createElement("button")
buttonX.innerText = "Excluir"
buttonX.setAttribute("id","btnX")

const buttonE = document.createElement("button")
buttonE.innerText = "Editar"
buttonE.setAttribute("id","btnE")

const tes = (element)=>{
    
    const tr = document.createElement("tr")
    const tdid = document.createElement("td")
    const tdnome = document.createElement("td")
    const tddataI = document.createElement("td")
    const tddataF = document.createElement("td")
    const tdbuton = document.createElement("td")
    tdid.innerText = element
    tdnome.innerText = element
    tddataI.innerText = element
    tddataF.innerText = element
    tr.appendChild(tdid)
    tr.appendChild(tdnome)
    tr.appendChild(tddataI)
    tr.appendChild(tddataF)
    tr.appendChild(tdbuton)
    tdbuton.appendChild(buttonE)
    tdbuton.appendChild(buttonX)
    tbody.appendChild(tr)  
   
    
}

async function GetAll(){
    const response = await fetch(url)
    const data = await response.json()
    const tbl = JSON.stringify(data)
    await tbl.forEach(tes())
    console.log(tbl)
}   
GetAll()

/*const btnE = document.querySelector("#btnE")
btnE.addEventListener("click",()=>{
  console.log('teste')
})*/
