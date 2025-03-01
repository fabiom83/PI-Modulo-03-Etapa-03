$(document).ready(function(){
    
    $('#divDetalharProcesso').hide();
    $('#divEditarPessoa').hide();
    $('#divCadastrarReuEditar').hide();
    $('#divCadastrarDadosProcessoEditar').hide();
    
    $('#divCadastrarReu').hide();
    $('#divCadastrarDadosProcesso').hide();
    
    
    //VALIDAR CAMPO BUSCA NO INDEX.HTML
    $('#campoBuscaProcesso').submit(function(event){
        event.preventDefault();
        let busca = $('#buscaProcesso').val();
        
        if(busca === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
          let retorno = consultaNumeroProcessoApi(busca);
          console.log("Resposta da API: " + retorno);
        }
    });
    
    //FUNÇÃO PARA CONSULTAR PROCESSO NA API
    function consultaNumeroProcessoApi(numeroProcesso){
        let resposta = 'Tudo Certo!';
        $.ajax({
            url:'http://localhost:8080/processo/pesquisarProcesso/' + numeroProcesso,
            method: 'GET',
            success: function(data){
                
                let processo = data;
                
                if(!processo.nrProcesso){
                    alert("Processo Não Localizado!");
                }
                else{
                    $('#processoDetalhes').text(processo.nrProcesso);
                    $('#nomeAutorDetalhes').text(processo.autorIdFk);
                    $('#advAutorDetalhes').text(processo.advAutorIdFk);
                    $('#nomeReuDetalhes').text(processo.reuIdFk);
                    $('#advReuDetalhes').text(processo.advReuIdFk);
                    $('#varaTramitacaoDetalhes').text(processo.varaTramitacao);
                    $('#ufTramitacaoDetalhes').text(processo.ufTramitacao);
                    
                    $('#divDetalharProcesso').show();
                    
                }
            }
        });
        return resposta;
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
    
    
});//FIM DO DOCUMENT READY FUNCTION