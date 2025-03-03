
$(document).ready(function(){
    
    $('#divDetalharPessoa').hide();
    $('#divEditarPessoa').hide();
    
    //VALIDAR CAMPO BUSCA E CHAMAR API 
    $('#campoBuscaPessoa').submit(function(event){
        event.preventDefault();
        
        let cpfBusca = $('#buscaPessoa').val();
        
        if(cpfBusca === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            consultaPessoaCpfApi(cpfBusca);
        }
    });
    
    //FUNÇÃO PARA CONSULTAR PESSOA NA API
    function consultaPessoaCpfApi(cpf){
        $.ajax({
            url:'http://localhost:8080/pessoa/pesquisarCpf/' + cpf,
            method: 'GET',
            success: function(data){
                
                let pessoa = data;
                
                if(!pessoa.nomePessoa){
                    alert("CPF Não Localizado!");
                }
                else{
                    $('#idPessoaDetalhes').text(pessoa.idPessoa);
                    $('#nomePessoaDetalhes').text(pessoa.nomePessoa);
                    $('#cpfPessoaDetalhes').text(pessoa.cpfPessoa);
                    $('#enderecoPessoaDetalhes').text(pessoa.endereco);
                    $('#cidadePessoaDetalhes').text(pessoa.cidade);
                    $('#ufPessoaDetalhes').text(pessoa.uf);
                    
                    $('#divDetalharPessoa').show();
                    $('#divCadastroPessoa').hide();
                   
                }
            }
        });
    }
    
    //===================================================================
         
    
    //VALIDAR FORMULÁRIO DE CADASTRO E CHAMAR API
    $('#formularioCadastrarPessoa').submit(function(){
        event.preventDefault();
        
        let novaPessoa = new Object();
        
        novaPessoa.nomePessoa = $('#nomePessoa').val();
        novaPessoa.cpfPessoa = $('#cpfPessoa').val();
        novaPessoa.endereco = $('#enderecoPessoa').val();
        novaPessoa.cidade = $('#cidadePessoa').val();
        novaPessoa.uf = $('#ufPessoa').val();
        
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((novaPessoa.nomePessoa  === '') || (novaPessoa.cpfPessoa === '') || (novaPessoa.endereco === '') ||
                (novaPessoa.cidade === '') || (novaPessoa.uf === '')){
            alert("Preencha Todos os Campos para Cadastro!");
        }
        
        if(novaPessoa.cpfPessoa.match(cpfRegex)){
            cadastrarPessoaApi(novaPessoa);
        }
        else{
            alert("Informe o CPF no formato XXX.XXX.XXX-XX");
        }
    });
    
    //FUNÇÃO APRA CADASTRAR PESSOA COM API
    function cadastrarPessoaApi(novaPessoa) { 
        $.ajax({ 
            url: 'http://localhost:8080/pessoa/cadastrar', 
            method: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify(novaPessoa),
            success: function(data){
                alert('Pessoa Cadastrada com Sucesso!');
                limparCadastro();
            },
            error: function(){
                alert('Erro ao Cadastrar Pessoa!')
            }
        });
    }
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfPessoa').keypress(function (event){
        let inputlenght = $('#cpfPessoa').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfPessoa').val();
            $('#cpfPessoa').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfPessoa').val();
            $('#cpfPessoa').val(traco + '-');
        }
    });
    
    $('#botaoLimparCadastro').click(function(){
        limparCadastro();
    });
    
    function limparCadastro(){
        $('#nomePessoa').val('');
        $('#cpfPessoa').val('');
        $('#enderecoPessoa').val('');
        $('#cidadePessoa').val('');
        $('#ufPessoa').val('');
    }
    
    //=====================================================================================
    
    //EDITAR DADOS DA PESSOA APÓS CONSULTAR
    
    //REPLICAR OS DADOS DA CONSULTA NO FORMULÁRIO DE EDIÇÃO
    $('#botaoEditarPessoa').click(function(){
        $('#idPessoaEditar').text($('#idPessoaDetalhes').text());
        $('#nomePessoaEditar').val($('#nomePessoaDetalhes').text());
        $('#cpfPessoaEditar').val($('#cpfPessoaDetalhes').text());
        $('#enderecoPessoaEditar').val($('#enderecoPessoaDetalhes').text());
        $('#cidadePessoaEditar').val($('#cidadePessoaDetalhes').text());
        $('#ufPessoaEditar').val($('#ufPessoaDetalhes').text());
        
        $('#divEditarPessoa').show();
    });
    
    //VALIDAR FORMULÁRIO EDITAR PESSOA E CHAMAR A API
    $('#formularioEditarPessoa').submit(function(){
        event.preventDefault();
        
        let id = parseInt($('#idPessoaEditar').text());
        
        let pessoaEditar = new Object();
        
        pessoaEditar.idPessoa = id;
        pessoaEditar.nomePessoa = $('#nomePessoaEditar').val();
        pessoaEditar.cpfPessoa = $('#cpfPessoaEditar').val();
        pessoaEditar.endereco = $('#enderecoPessoaEditar').val();
        pessoaEditar.cidade = $('#cidadePessoaEditar').val();
        pessoaEditar.uf = $('#ufPessoaEditar').val();
        
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((!pessoaEditar.nomePessoa) || (!pessoaEditar.cpfPessoa) || (!pessoaEditar.endereco) ||
                (!pessoaEditar.cidade) || (!pessoaEditar.uf)){
            
            alert("Preencha Todos os Campos para Edição!");
        }
        
        if(pessoaEditar.cpfPessoa.match(cpfRegex)){
            editarPessoaApi(pessoaEditar);
        
        }
        else{
            alert("Informe o CPF no formato XXX.XXX.XXX-XX");
        }
    });
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfPessoaEditar').keypress(function (event){
        let inputlenght = $('#cpfPessoaEditar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfPessoaEditar').val();
            $('#cpfPessoaEditar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfPessoaEditar').val();
            $('#cpfPessoaEditar').val(traco + '-');
        }
    });
    
    function editarPessoaApi(pessoaEditar){
        $.ajax({
            url: 'http://localhost:8080/pessoa/atualizar/' + pessoaEditar.idPessoa, 
            method: 'PUT', 
            contentType: 'application/json', 
            data: JSON.stringify(pessoaEditar),
            success: function(data){
                if(confirm('Dados Atualizados com Sucesso!')){
                    limparEdicao();
                    window.location.reload(true);  
                }
            },
            error: function(){
                alert('Erro ao Atualizar Dados!')
            }
        });
    }
    
    //LIMPA FORMULÁRIO DE EDIÇÃO
    function limparEdicao(){
        $('#idPessoaEditar').text('');
        $('#nomePessoaEditar').val('');
        $('#cpfPessoaEditar').val('');
        $('#enderecoPessoaEditar').val('');
        $('#cidadePessoaEditar').val('');
        $('#ufPessoaEditar').val('');
        
        $('#divEditarPessoa').hide();
        
    }
    
    $('#botaoCancelarEdicao').click(function(){
        limparEdicao(); 
    });
    

    
});//FIM DO DOCUMENT READY FUNCTION