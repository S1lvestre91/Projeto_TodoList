//Consumindo uma api com javascript puro
//Pegando o url da api..
const url = "https://localhost:7206/api/Tarefas";
const tbl = document.querySelector('#tabela')
const tblbody = document.querySelector('#t-body')
//post...
let nome = document.querySelector("#nome")
let datai = document.querySelector("#datai")
let dataf = document.querySelector("#dataf")



const formulario = document.querySelector("#Formulario")

const buttonUpdate = document.querySelector(".btn")

const trTarefa = document.querySelector(".tr-Tarefa")

let output = ''

const rederizarTabela  = (posts)=>{

  posts.forEach(post => {
    output +=` 
    <tr id="tr-Tarefa" data-cod="${post.id}" >
      <td id="idpost">${post.id}</td>
      <td id="postnome" >${post.nome}</td>
      <td id="dataIni">${post.dataInicio}</td>
      <td id="dataFim">${post.dataFim}</td>
      <td class="tdButtons" data-id=${post.id}>
        <a id="ExcluirTarefa" class="card-link" href="#">Deletar</a>
        <a id="EditarTarefa" class="card-link" href="#">Editar</a>
      </td>
  </tr>`
  });
  tblbody.innerHTML = output
}

//Faz o Get de todos as tarefas
fetch(url)
  .then(response => response.json())
  .then(data => rederizarTabela(data))
  
tblbody.addEventListener("click", (e)=>{
  //Define em qual local foi clicado
  let DeletarTarefa = e.target.id == "ExcluirTarefa"
  let EditarTarefa = e.target.id == "EditarTarefa"
  //Capiturando o parente clicado
  let id = e.target.parentElement.dataset.id
  let ed = e.target.parentElement.parentElement.dataset.cod
  //Verificação de foi clicado
  if(DeletarTarefa){
     
    fetch(`${url}/Id?Id=${id}`,{
      method: 'DELETE',
    })
    .then(res => res)
    .then(()=> location.reload())
  }
 
  if(EditarTarefa){
    const parent = e.target.parentElement.parentElement
    
    let nomeed = parent.querySelector("#postnome")
    let dataI = parent.querySelector("#dataIni")
    let dataF = parent.querySelector("#dataFim")

    
    nome.value = nomeed.textContent
    datai.value = dataI.textContent
    dataf.value = dataF.textContent
  }
  buttonUpdate.addEventListener("click", (e)=>{
    e.preventDefault()
    fetch(`${url}/Id?Id=${ed}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: ed,
        nome: nome.value,
        dataInicio: datai.value,
        dataFim: dataf.value
      })
    })
    .then(res => res)
    .then(()=> location.reload())
  })

})

//Faz POST das tarefas
formulario.addEventListener("submit", ()=>{
  //e.preventDefault();
  
  fetch(url,{
    method: 'POST',
    body: JSON.stringify({
      nome: nome.value,
      dataInicio: datai.value,
      dataFim: dataf.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res =>  res)
    .then(data => {
      const atualizarTarefa = [];
      atualizarTarefa.push(data)
      rederizarTabela(atualizarTarefa)
    })
    .then(()=>location.reload())

      nome = ''
      datai =''
      dataf = ''
})





 






