let idsCampos = ["nome", "logradouro", "cidade", "email", "telefone", "celular"];
let hotel = ["saoPaulo", "rioDeJaneiro", "curitiba"];
let quarto = ["luxo", "simples", "duo", "triplo"];
let outrasPaginas = ["principal", "saoPaulo", "rioDeJaneiro", "curitiba"];
let sexo = ["sexoMasculino", "sexoFeminino", "outros"];
let data = "data";
let dataConfirmada = false;
let sexoConfirmado = false;
let formulario = false;
let confirmarEstadia = false;
let email = false;

window.onload = function(){
    trocaDeSelectHotelInicio();
    escolhaHotel();
}

function irFormulario() {
	document.getElementById("dados").style.display = 'block';
	document.getElementById("palavra").style.display = 'block';
	document.getElementById("nome").focus();
}

function valorPassado(){
  let url = window.location;
  url = url.toString();
  for (let i = 0; i < outrasPaginas.length; i++) {
   	if(url.indexOf(outrasPaginas[i]) > 0) {
   		return outrasPaginas[i];
   		break;
  	}
   }
}

function trocaDeSelectHotelInicio(){
	let selectHotel = document.getElementById("hoteis");
    let valorUrl = valorPassado();
	for (let i = 0; i < selectHotel.options.length; i++){
		if (selectHotel.options[i].value == valorUrl){
			selectHotel.options[i].selected = "true";
			break;
		}
	}
}

function Focus(recebeId){
	if(event.keyCode == 13) {
		document.getElementById(recebeId).focus();     
		return false; 
	}
}

function confirmar(){
  confirmarTamanhoDosCampos();
  confirmarEmail();
  confirmarData();
  confirmarSexo();
  confirmarDataEstadia();
  if(document.getElementById("hoteis").value == "opcaoHotel") {
    alert("Selecione um hotel");
  } else{ 
    if(document.getElementById("quarto").value == "opcao") {
      alert("Selecione um quarto");
    }else{
      if(dataConfirmada && sexoConfirmado && formulario && confirmarEstadia && email) {
        alert('Cadastro Confirmado');
      }      
    }
  }
}

function escolhaHotel(){
    let nomeHotel = document.getElementById("hoteis").value;
    for(let i = 0; i < hotel.length; i++){
      if(nomeHotel == hotel[i]){
		  document.getElementById("apresentacao").style.backgroundImage = 'url(img/'+ hotel[i] +'/fachada.jpg)';
		  break;
		}
	}
    if(document.getElementById("quarto") != "opcao") {

       escolhaQuarto();
    }
}

function escolhaQuarto(){
    let hotelSelecionado = document.getElementById("hoteis").value;
    let quartoSelecionado = document.getElementById("quarto").value;
    let certo = false;
    for (let i = 0; i < hotel.length; i++) {
    	for (let x = 0; x < quarto.length; x++) {
        	if(hotelSelecionado == hotel[i] && quartoSelecionado == quarto[x]) {
            	document.getElementById("apresentacao").style.backgroundImage = 'url(img/'+ hotel[i] +'/quarto/' + quarto[x]+'.jpg)';
            	certo = true;
            	break;
        	}
    	}
    	if(certo) {
    		break;
    	}
	}
}

function confirmarTamanhoDosCampos(){
  let cont = 0;
  formulario = false;
   for (let i = 0; i < idsCampos.length; i++) {
   	   if(document.getElementById(idsCampos[i]).value.length < 8) {
   	   	  alert("Componente '" + idsCampos[i].toUpperCase() + "' muito curto");
   	   	  break;
   	   } else{
        cont++;
       }
   }
   if(cont == idsCampos.length) {
    formulario = true;
   }
}

function confirmarSexo(){
 for (let i = 0; i < sexo.length; i++) {
 	if(document.getElementById(sexo[i]).checked == true) {
        sexoConfirmado = true;
        break;
 	}
 }
 if(!sexoConfirmado) {
 	alert("Selecione um sexo");
 }
}

function confirmarEmail(){
   email = false;
   if(document.getElementById(idsCampos[3]).value.indexOf("@") < 0) {
      alert("Está faltando um '@' no " + idsCampos[3].toUpperCase());
     	document.getElementById(idsCampos[3]).focus();
   }else{
      email = true;
   }
}

function confirmarData(){
	let conteudoData = document.getElementById(data).value.split("-");
	let tempoSistema = new Date();
	let ano = tempoSistema.getFullYear();
	let mes = tempoSistema.getMonth() + 1;
	let dia = tempoSistema.getDate();
	let anoData = parseInt(conteudoData[0]);
	let mesData = parseInt(conteudoData[1]);
	let diaData = parseInt(conteudoData[2]);
	if(document.getElementById(data).value == "") {
		alert("A data de Nascimento precisa está preenchida");
    dataConfirmada = false;
	}else{
		if((ano - anoData) >= 18) {
			if((((mes - mesData) < 0) && ((ano - anoData) == 18)) || (((mes - mesData) == 0) && ((dia - diaData) < 0) &&((ano - anoData) == 18))) {
        alert("Menores de 18 não podem fazer pre-cadastro");
        dataConfirmada = false;
			}
        dataConfirmada = true;
		} else{
			alert("Menores de 18 não podem fazer pre-cadastro");
      dataConfirmada = false;
		}
	}
}

function confirmarDataEstadia(){
  let entrada = document.getElementById("entrada").value.split("-");
  let saida = document.getElementById("saida").value.split("-");
  let tempoSistema = new Date();
  let ano = tempoSistema.getFullYear();
  let mes = tempoSistema.getMonth() + 1;
  let dia = tempoSistema.getDate();
  let anoDataEntrada = parseInt(entrada[0]);
  let mesDataEntrada = parseInt(entrada[1]);
  let diaDataEntrada = parseInt(entrada[2]);
  let anoDataSaida = parseInt(saida[0]);
  let mesDataSaida = parseInt(saida[1]);
  let diaDataSaida = parseInt(saida[2]);
  if(document.getElementById("entrada").value == "" || document.getElementById("saida").value == "") {
    alert("Os campos de Estadia precisam está preenchidos");
    confirmarEstadia = false;
  } else{
    if((anoDataEntrada < ano) || (anoDataEntrada > anoDataSaida) || ((anoDataEntrada == anoDataSaida) && (mesDataEntrada > mesDataSaida))) {
       alert('Erro na data de estadia, preencha corretamente');
       confirmarEstadia = false;
    } else{
      if(((mesDataEntrada == mesDataSaida) && (diaDataEntrada >= diaDataSaida)) || ((anoDataEntrada == ano) && (mesDataSaida < mes))) {
        alert('Erro na data de estadia, preencha corretamente');
        confirmarEstadia = false;
      }else{
        if(((mesDataSaida == mes) && (dia > diaDataEntrada)) || ((mesDataEntrada == mesDataEntrada) && (diaDataEntrada == diaDataSaida))) {
        alert('Erro na data de estadia, preencha corretamente');
        confirmarEstadia = false;
        }else{
          confirmarEstadia = true;
        }
      }
    }
  }

}