$(document).ready(function(){
    
    $('#divDetalharProcesso').hide();
    $('#divEditarPessoa').hide();
    $('#divCadastrarReuEditar').hide();
    $('#divCadastrarDadosProcessoEditar').hide();
    
    $('#divCadastrarReu').hide();
    $('#divCadastrarDadosProcesso').hide();
    
    let processoConsultado;
    let autorConsultado;
    let reuConsultado;
    let advAutorConsultado;
    let advReuConsultado;
       
    //VALIDAR CAMPO BUSCA NO INDEX.HTML
    $('#campoBuscaProcesso').submit(async function(event){
        event.preventDefault();
        let busca = $('#buscaProcesso').val();
        
        if(busca === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            processoConsultado = await consultaNumeroProcessoApi(busca);
            autorConsultado = await consultaPessoaId(processoConsultado.autorIdFk);
            reuConsultado = await consultaPessoaId(processoConsultado.reuIdFk);
            advAutorConsultado = await consultaAdvogadoId(processoConsultado.advAutorIdFk);
            advReuConsultado = await consultaAdvogadoId(processoConsultado.advReuIdFk);
            $('#processoDetalhes').text(processoConsultado.nrProcesso);
            $('#nomeAutorDetalhes').text(autorConsultado.nomePessoa);
            $('#advAutorDetalhes').text(advAutorConsultado.nomeAdvogado);
            $('#nomeReuDetalhes').text(reuConsultado.nomePessoa);
            $('#advReuDetalhes').text(advReuConsultado.nomeAdvogado);
            $('#varaTramitacaoDetalhes').text(processoConsultado.varaTramitacao);
            $('#ufTramitacaoDetalhes').text(processoConsultado.ufTramitacao);
           
            $('#divDetalharProcesso').show();
        }
    });
    
    //FUNÇÃO PARA CONSULTAR PROCESSO NA API COM RETORNO 
    async function consultaNumeroProcessoApi(numeroProcesso){
        let processo;
        await $.ajax({
            url:'http://localhost:8080/processo/pesquisarProcesso/' + numeroProcesso,
            method: 'GET',
            success: function(data){
                processo = data;
                if(!processo.nrProcesso){
                    alert("Processo Não Localizado!");
                }
            }
        });
        return processo;
    }
    
    //FUNÇÃO PARA CONSULTAR PESSOA NA API COM RETORNO
    async function consultaPessoaId(id){
        let pessoa;
        await $.ajax({
            url:'http://localhost:8080/pessoa/pesquisar/' + id,
            method: 'GET',
            success: function(data){
                
                pessoa = data;
                if(!pessoa.nomePessoa){
                
                }
            }
        });
        return pessoa;
    }
    
    
     //FUNÇÃO PARA CONSULTAR ADVOGADO NA API COM RETORNO
    async function consultaAdvogadoId(id){
        let advogado;
        await $.ajax({
            url:'http://localhost:8080/advogado/pesquisar/' + id,
            method: 'GET',
            success: function(data){
            
                advogado = data;
                if(!advogado.nomeAdvogado){
                
                }
            }
        });
        return advogado;
    }
     //===================================================================
     
     
     //VALIDAR CAMPOS  CADASTRAR
    $('#formularioBuscarAutor').submit(function(event){
        event.preventDefault();
        if($('#cpfAutorBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
    });
    
    $('#formularioBuscarAdvAutor').submit(function(event){
        event.preventDefault();
        if($('#cpfAdvAutorBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
    });
    
     $('#formularioBuscarReu').submit(function(event){
        event.preventDefault();
        if($('#cpfReuBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
    });
    
    $('#formularioBuscarAdvReu').submit(function(event){
        event.preventDefault();
        if($('#cpfAdvReuBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
    });
    
    $('#formularioProcesso').submit(function(event){
        event.preventDefault();
        let processo = $('#nrProcesso').val();
        let tramitacao = $('#varaTramitacao').val();
        let ufTramitacao = $('#UfVaraTramitacao').val();
               
        if((processo === '') || (tramitacao === '') || (ufTramitacao === '')){
            alert("Preencha Todos os Campos para Edição");
        }
    });
    
    //================================================================================
    
    //VALIDAR CAMPOS  EDITAR
    $('#formularioBuscarAutorEditar').submit(function(event){
        event.preventDefault();
               
        if($('#cpfAutorBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        
    });
    
    $('#formularioBuscarAdvAutorEditar').submit(function(event){
        event.preventDefault();
               
        if($('#cpfAdvAutorBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
    });
    
     $('#formularioBuscarReuEditar').submit(function(event){
        event.preventDefault();
               
        if($('#cpfReuBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
    });
    
    $('#formularioBuscarAdvReuEditar').submit(function(event){
        event.preventDefault();
               
        if($('#cpfAdvReuBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
    });
    
    $('#formularioProcessoEditar').submit(function(event){
        event.preventDefault();
        
        let processo = $('#nrProcessoEditar').val();
        let tramitacao = $('#varaTramitacaoEditar').val();
        let ufTramitacao = $('#UfVaraTramitacaoEditar').val();
               
        if((processo === '') || (tramitacao === '') || (ufTramitacao === '')){
            alert("Preencha Todos os Campos para Edição");
        }
    });
    
    $('#botaoEditarProcesso').click(function(){
        $('#divEditarPessoa').show();
    });
    
    $('#botaoProsseguirEditar1').click(function(){
        $('#divCadastrarReuEditar').show();
    });
    
    $('#botaoProsseguirEditar2').click(function(){
        $('#divCadastrarDadosProcessoEditar').show();
    });
    
    $('#botaoProsseguir1').click(function(){
        $('#divCadastrarReu').show();
    });
    
    $('#botaoProsseguir2').click(function(){
        $('#divCadastrarDadosProcesso').show();
    });
    
    
    //===========================================================================
    
    
    
    
       
    
});//FIM DO DOCUMENT READY FUNCTION