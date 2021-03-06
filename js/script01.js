var urlFilmes =
  "https://api.themoviedb.org/3/movie/popular?api_key=65055537b0e9cd2047962c066d94f925&language=pt-BR&page=";
var urlIMG = "https://image.tmdb.org/t/p/w500";

function carregar(pagina) {
  /*
    Para recepcionar e tratar os dados no formato JSON que vem da urlFilmes
    iremos usar uma estrutura em AJAX->Assincronum JavaScript XML
    sincrona -> ao mesmo tempo
    assincrôna -> uma tarefa após a outra.
    O objeto que iremos utilizar para carregar os dados será o 
    XMLHttpRequest
    */

  //Estamos passando todas as propriedades de XMLHTTPREQUEST para a variável
  var xmlhttp = new XMLHttpRequest();

  /*
        Quando houver a mundaça de estado de conteúdo da variável
        xmlhttp(onreadystatechange)nós iremos verificar em qual estado 
        a vatiável se encontra. Se o estado for igual a 4 e o status code for
        igual a 200, significa que está tudo carregado corretamente;
        Caso contrário pode ter havido um erro e, então iremos tratar.
    */

  xmlhttp.onreadystatechange = function () {
    //200 é status de sucesso ≠ de 400
    if (this.readyState == 4 && this.status == 200) {
      var dados = JSON.parse(this.responseText);

      var filme = "";
      for (var i = 0; i <= 19; i++) {
        filme += "<div>";
        filme += "<img src=" + urlIMG + dados.results[i].poster_path + ">";
        filme += "<h2>" + dados.results[i].title + "</h2>";
        filme +="<p class=data>Data de lançamento: " +dados.results[i].release_date +"</p>";
        filme += "<p class=sinopse>" + dados.results[i].overview + "</p>";
        filme += "</div>";
      }

      document.getElementById("conteudo").innerHTML = filme;

      console.log(dados);
    } else {
      console.log("Erro ao tentar carregar os dados");
    }
  };
  xmlhttp.open("GET", urlFilmes + pagina, true);

  //Realiza a execução de todo código escrito acima
  xmlhttp.send();
}

window.onload = function () {
  carregar(1);

  for (var p = 1; p <= 20; p++) {
    document.getElementById("paginas").innerHTML += 
    "<a href=# onclick='carregar("+p+")'> " + p + " </a>";
  }
};
