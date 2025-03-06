
$(document).ready(function(){
    
   $('#divDetalharAdvogado').hide();
   $('#divEditarAdvogado').hide();
    
    //VALIDAR CAMPO BUSCA NO ADVOGADO.HTML
    $('#campoBuscaAdvogado').submit(function(event){
        event.preventDefault();
        
        let cpfBusca = $('#buscaAdvogado').val();
        
        if(cpfBusca === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            consultaAdvogadoCpfApi(cpfBusca);
        }
    });
    
    //FUNÇÃO PARA CONSULTAR ADVOGADO NA API
    function consultaAdvogadoCpfApi(cpf){
        $.ajax({
            url:'http://localhost:8080/advogado/pesquisarCpf/' + cpf,
            method: 'GET',
            success: function(data){
                
                let advogado = data;
                
                if(!advogado.nomeAdvogado){
                    alert("CPF Não Localizado!");
                }
                else{
                    $('#idAdvogadoDetalhes').text(advogado.idAdvogado);
                    $('#nomeAdvogadoDetalhes').text(advogado.nomeAdvogado);
                    $('#cpfAdvogadoDetalhes').text(advogado.cpfAdvogado);
                    $('#nrOabDetalhes').text(advogado.nrOab);
                    $('#ufOabDetalhes').text(advogado.ufOab);
                    
                    
                    $('#divDetalharAdvogado').show();
                    $('#divCadastroAdvogado').hide();
                }
            }
        });
    }
    
          //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#buscaAdvogado').keypress(function (event){
        let inputlenght = $('#buscaAdvogado').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#buscaAdvogado').val();
            $('#buscaAdvogado').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#buscaAdvogado').val();
            $('#buscaAdvogado').val(traco + '-');
        }
    });
    
    //===================================================================
    
    
    //VALIDAR FORMULÁRIO DE CADASTRO E CHAMAR API
    $('#formularioCadastrarAdvogado').submit(function(){
        event.preventDefault();
        
        let novoAdvogado = new Object();
        
        novoAdvogado.nomeAdvogado = $('#nomeAdvogado').val();
        novoAdvogado.cpfAdvogado = $('#cpfAdvogado').val();
        novoAdvogado.nrOab = $('#nrOab').val();
        novoAdvogado.ufOab = $('#ufOab').val();
                
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((novoAdvogado.nomeAdvogado === '') || (novoAdvogado.cpfAdvogado === '') || (novoAdvogado.nrOab === '') || (novoAdvogado.ufOab === '')){
            alert("Preencha Todos os Campos para Cadastro!");
        }
        
        if(novoAdvogado.cpfAdvogado.match(cpfRegex)){
            cadastrarAdvogadoApi(novoAdvogado);
        }
        else{
            alert("Informe o CPF no formato XXX.XXX.XXX-XX");
        }
    });
    
    //FUNÇÃO APRA CADASTRAR ADVOGADO COM API
    function cadastrarAdvogadoApi(novoAdvogado) { 
        $.ajax({ 
            url: 'http://localhost:8080/advogado/cadastrar', 
            method: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify(novoAdvogado),
            success: function(data){
                alert('Advogado Cadastrado com Sucesso!');
                limparCadastro();
            },
            error: function(){
                alert('Erro ao Cadastrar Advogado!')
            }
        });
    }
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfAdvogado').keypress(function (event){
        let inputlenght = $('#cpfAdvogado').val().length;
        console.log("lenght: " + inputlenght);
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAdvogado').val();
            $('#cpfAdvogado').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAdvogado').val();
            $('#cpfAdvogado').val(traco + '-');
        }
    });
    
    $('#botaoLimparCadastro').click(function(){
        limparCadastro();
    });
    
    function limparCadastro(){
        $('#nomeAdvogado').val('');
        $('#cpfAdvogado').val('');
        $('#nrOab').val('');
        $('#ufOab').val('');
    }
    
    //=====================================================================================
    
    //TRANSFERE DADOS DA CONSULTA PARA FORMULÁRIO DE EDIÇÃO    
    $('#botaoEditarAdvogado').click(function(){
        $('#idAdvogadoEditar').text($('#idAdvogadoDetalhes').text());
        $('#nomeAdvogadoEditar').val($('#nomeAdvogadoDetalhes').text());
        $('#cpfAdvogadoEditar').val($('#cpfAdvogadoDetalhes').text());
        $('#nrOabEditar').val($('#nrOabDetalhes').text());
        $('#ufOabEditar').val($('#ufOabDetalhes').text());
                
        $('#divEditarAdvogado').show();
    });
    
    //VALIDAR FORMULÁRIO EDITAR ADVOGADO E CHAMAR API
    $('#formularioEditarAdvogado').submit(function(){
        event.preventDefault();
        
        let id = parseInt($('#idAdvogadoEditar').text());
        let advogadoEditar = new Object();
        
        advogadoEditar.idAdvogado = id;
        advogadoEditar.nomeAdvogado = $('#nomeAdvogadoEditar').val();
        advogadoEditar.cpfAdvogado = $('#cpfAdvogadoEditar').val();
        advogadoEditar.nrOab = $('#nrOabEditar').val();
        advogadoEditar.ufOab = $('#ufOabEditar').val();
        
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((advogadoEditar.nomeAdvogado === '') || (advogadoEditar.cpfAdvogado === '') ||
                (advogadoEditar.nrOab === '') || (advogadoEditar.ufOab === '')){
            
            alert("Preencha Todos os Campos para Editar!");
        }
        
        if(advogadoEditar.cpfAdvogado.match(cpfRegex)){
            editarAdvogadoApi(advogadoEditar);
        }
        else{
            alert("Informe o CPF no formato XXX.XXX.XXX-XX");
        }
    });
    
    function editarAdvogadoApi(advogadoEditar){
        $.ajax({
            url: 'http://localhost:8080/advogado/atualizar/' + advogadoEditar.idAdvogado, 
            method: 'PUT', 
            contentType: 'application/json', 
            data: JSON.stringify(advogadoEditar),
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
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfAdvogadoEditar').keypress(function (event){
        let inputlenght = $('#cpfAdvogadoEditar').val().length;
        console.log("lenght: " + inputlenght);
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAdvogadoEditar').val();
            $('#cpfAdvogadoEditar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAdvogadoEditar').val();
            $('#cpfAdvogadoEditar').val(traco + '-');
        }
    });
    
    //LIMPA FORMULÁRIO DE EDIÇÃO
    function limparEdicao(){
        $('#idAdvogadoEditar').text('');
        $('#nomeAdvogadoEditar').val('');
        $('#cpfAdvogadoEditar').val('');
        $('#nrOabEditar').val('');
        $('#ufOabEditar').val('');
                
        $('#divEditarAdvogado').hide();       
    }
    
    $('#botaoCancelarEdicao').click(function(){
        limparEdicao(); 
    }); 
    
});//FIM DO DOCUMENT READY FUNCTION