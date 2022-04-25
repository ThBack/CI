class Despesa {
	constructor(ano, mes, dia, pedidos, descricao, CodigoCI, qtdItens, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.pedidos = pedidos
		this.descricao = descricao
		this.CodigoCI = CodigoCI
		this.qtdItens = qtdItens
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {

		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			if(despesa === null) {
				continue
			}
			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa){

		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		console.log(despesasFiltradas);
		console.log(despesa)

		//ano
		if(despesa.ano != ''){
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
			
		//mes
		if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if(despesa.dia != ''){
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//pedidos
		if(despesa.pedidos != ''){
			console.log("filtro de pedidos");
			despesasFiltradas = despesasFiltradas.filter(d => d.pedidos == despesa.pedidos)
		}

		//descricao
		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//Quantidade de intens
		if(despesa.qtdItens != ''){
			console.log("filtro de qtdItens");
			despesasFiltradas = despesasFiltradas.filter(d => d.qtdItens == despesa.qtdItens)

		}

		
		return despesasFiltradas

	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let pedidos = document.getElementById('pedidos')
	let descricao = document.getElementById('descricao')
	let CodigoCI = document.getElementById('CodigoCI')
	let qtdItens = document.getElementById('qtdItens')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		pedidos.value,
		descricao.value, 
		CodigoCI.value,
		qtdItens.value,
		valor.value
	)


	if(despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//dialog de sucesso
		$('#modalRegistraDespesa').modal('show') 

		ano.value = '' 
		mes.value = ''
		dia.value = ''
		pedidos.value = ''
		descricao.value = ''
		CodigoCI.value = ''
		qtdItens.value = ''
		valor.value = ''
		
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraDespesa').modal('show') 
	}
	}

	function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros() 
	}
//variavel criada para fazer a soma do total abaixo no final
	var total = 0
	var contador = 0
	

	let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''
	despesas.forEach(function(d){

		//Criando a linha (tr)
		var linha = listaDespesas.insertRow();

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

		//Ajustar o tipo
		switch(d.pedidos){
			case '1': d.pedidos = 'ADM'
				break
			case '2': d.pedidos = 'Engenharia'
				break
			case '3': d.pedidos = 'Prefeitura'
				break
			case '4': d.pedidos = 'Locação'
				break
			case '5': d.pedidos = 'Secretaria'
				break
			case '6': d.pedidos = 'Veiculos'
				break
			case '7': d.pedidos = 'Compras'
				break
			case '8': d.pedidos = 'Diretoria'
				break
			case '9': d.pedidos = 'TV'
				break
			case '10': d.pedidos = 'Rádio'
				break
			case '11': d.pedidos = 'SGA/Consumo'
				break	
			case '12': d.pedidos = 'Estadual'
				break	
			case '13': d.pedidos = 'Patrimonio'
				break	
			case '14': d.pedidos = 'DTI'
				break	
			case '15': d.pedidos = 'RH'
			
				
		}

	
		linha.insertCell(1).innerHTML = d.pedidos
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.CodigoCI
		linha.insertCell(4).innerHTML = d.qtdItens 
		linha.insertCell(5).innerHTML = `R$ ${d.valor}`

		//Criar o botão de exclusão
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-trash"  ></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_despesa_','')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(6).append(btn)
		console.log(d)

//contardor pra a ultima página________________________________________________________
		contador++
	total += Number(d.valor);
	console.log(total)

	if (contador == despesas.length) {
		linha = listaDespesas.insertRow();
		linha.insertCell(0).innerHTML = `<b class="text-light">Total</b>`
		linha.insertCell(1).innerHTML = ``
		linha.insertCell(2).innerHTML = ``
		linha.insertCell(3).innerHTML = ``
		linha.insertCell(4).innerHTML = ``
		linha.insertCell(5).innerHTML = `<b class="text-light">R$ ${total.toFixed(2)}</b>`
		linha.insertCell(6).innerHTML = ``
	 
		$('tr').last().css('background', 'grey');
	}
	//registrar valor dentro do output (descoberta) valor extraido do valos acima
	document.getElementById("valorTotal").value =`## R$ ${total.toFixed(2)} ##`
	})

	//Contador de registro 
	let contadorDespesas = despesas.length
		if (contadorDespesas == 1) {
			document.getElementById("contador").innerText = `1 Cadastro`
		} else {
			document.getElementById("contador").innerText = `${contadorDespesas} Cadastros`
		}
		

 }

 
 function pesquisarDespesa(){
	 
	let ano  = document.getElementById("ano").value
	let mes = document.getElementById("mes").value
	let dia = document.getElementById("dia").value
	let pedidos = document.getElementById("pedidos").value
	let descricao = document.getElementById("descricao").value
	let CodigoCI = document.getElementById("CodigoCI").value
	let qtdItens = document.getElementById("qtdItens").value
	let valor = document.getElementById("valor").value

	let despesa = new Despesa(ano, mes, dia, pedidos, descricao,CodigoCI, qtdItens,valor)

	let despesas = bd.pesquisar(despesa)
	 
	this.carregaListaDespesas(despesas, true)

	

 }


        
          
        
  
      

 