//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-atletas");
const modelo = document.querySelector("#modelo-atletas");

const apiKey="cv_vwqPIsAWltPd6H1CiEm6Hx4N0o1V-v91LZMMnAmrE653G5bc87iOkMfh0isQRkOC";
const apiUrl="https://api-ds.codeverse.dev.br/api/atletas";

//Funcao que busca todos os atletas da API

async function buscarAtletas() {
  resposta.textContent = "Carregando atletas..."

  try {
    //Fazer uma requisicao GET para buscar os atletas
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os atletas")
    }

    //converter para JSON
    const resultado = await retorno.json();

    console.log(resultado)
    //Percorrer todos os atletas e montar o atleta.

    for (const atleta of resultado.data) {

        console.log(resultado.data)
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = atleta.title;
      card.querySelector(".esporte").textContent = atleta.esporte;
      card.querySelector(".pais").textContent = atleta.pais;
      card.querySelector(".idade").textContent = atleta.idade;
      card.querySelector(".conquistas").textContent = atleta.conquistas;

      const imagem = card.querySelector("img");

      if(atleta.imageUrl){
        imagem.src = atleta.imageUrl;
        imagem.alt =  atleta.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os herois. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarAtletas();