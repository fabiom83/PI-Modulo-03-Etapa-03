$(document).ready(function(){
    
    //***FUNÇÕES PARA PESSOAS E ADVOGADOS NO FIM DO SCRIPT
    
    //ESCONDE DIV AO ABRIR PÁGINA
    $('#divDetalharProcesso').hide();
    $('#divEditarProcessoTodos').hide();
    $('#divCadastrarReuEditar').hide();
    $('#divCadastrarDadosProcessoEditar').hide();
    
    $('#divCadastrarReu').hide();
    $('#divCadastrarDadosProcesso').hide();
    
    //VARIÁVEIS GLOBAIS PARA CADASTRO, CONSULTAS E EDIÇÕES
    
    let autorNovo;
    let reuNovo;
    let advAutorNovo;
    let advReuNovo;
    let processoNovo = new Object();
    
    let processoConsultado;
    let autorConsultado;
    let reuConsultado;
    let advAutorConsultado;
    let advReuConsultado;
    
    let processoEditado;
    let autorEditado;
    let reuEditado;
    let advAutorEditado;
    let advReuEditado;
   
    
    
    /* =================================================================
                            CONSULTAR PROCESSOS
    ==================================================================*/
       
    //VALIDA, BUSCA E EXIBE DADOS DO PROCESSO COM CONSULTAS EM FOREIGN KEYS PESSOAS E ADVOGADOS
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
    
    /*============================================================================
     *                                CADASTRAR PROCESSOS
    =============================================================================*/
    
    //VALIDAR CAMPOS  CADASTRAR
    $('#formularioBuscarAutor').submit(async function(event){
        event.preventDefault();
        if($('#cpfAutorBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            autorNovo = await consultaPessoaCpfApi($('#cpfAutorBuscar').val());
            $('#spanNomeAutor').text(autorNovo.nomePessoa);
        }
    });
    
    $('#formularioBuscarAdvAutor').submit(async function(event){
        event.preventDefault();
        if($('#cpfAdvAutorBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            advAutorNovo = await consultaAdvogadoCpfApi($('#cpfAdvAutorBuscar').val());
            $('#spanNomeAdvAutor').text(advAutorNovo.nomeAdvogado);
        }
    });
    
     $('#formularioBuscarReu').submit(async function(event){
        event.preventDefault();
        if($('#cpfReuBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            reuNovo = await consultaPessoaCpfApi($('#cpfReuBuscar').val());
            $('#spanNomeReu').text(reuNovo.nomePessoa);
        }
    });
    
    $('#formularioBuscarAdvReu').submit(async function(event){
        event.preventDefault();
        if($('#cpfAdvReuBuscar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            advReuNovo = await consultaAdvogadoCpfApi($('#cpfAdvReuBuscar').val());
            $('#spanNomeAdvReu').text(advReuNovo.nomeAdvogado);
        }
    });
    
    $('#formularioProcesso').submit(function(event){
        event.preventDefault();
        let processo = $('#nrProcesso').val();
        let tramitacao = $('#varaTramitacao').val();
        let ufTramitacao = $('#UfVaraTramitacao').val();
               
        if((processo === '') || (tramitacao === '') || (ufTramitacao === '') || (!autorNovo) || (!reuNovo)
                || (!advAutorNovo) || (!advReuNovo)){
            alert("Preencha Todos os Campos para Cadastrar");
        }
        else{
            processoNovo.nrProcesso = processo;
            processoNovo.varaTramitacao = tramitacao;
            processoNovo.ufTramitacao = ufTramitacao;
            processoNovo.autorIdFk = parseInt(autorNovo.idPessoa);
            processoNovo.reuIdFk = parseInt(reuNovo.idPessoa);
            processoNovo.advAutorIdFk = parseInt(advAutorNovo.idAdvogado);
            processoNovo.advReuIdFk = parseInt(advReuNovo.idAdvogado);
            
            cadastrarProcessoApi(processoNovo);
            
        }
        
    });
    
    //FUNÇÃO APRA CADASTRAR PROCESSO COM API
    function cadastrarProcessoApi(processoNovo) { 
        $.ajax({ 
            url: 'http://localhost:8080/processo/cadastrar', 
            method: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify(processoNovo),
            success: function(data){
                alert('Processo Cadastrado com Sucesso!');
                limparCadastro();
            },
            error: function(){
                alert('Erro ao Cadastrar Processo!')
            }
        });
    }
    
    $('#botaoLimparCadastro').click(function(){
       limparCadastro(); 
    });
    
    function limparCadastro(){
        $('#nrProcesso').val('');
        $('#varaTramitacao').val('');
        $('#UfVaraTramitacao').val('');
        $('#cpfAutorBuscar').val('');
        $('#cpfReuBuscar').val('');
        $('#cpfAdvAutorBuscar').val('');
        $('#cpfAdvReuBuscar').val('');
        $('#spanNomeAutor').text('');
        $('#spanNomeReu').text('');
        $('#spanNomeAdvAutor').text('');
        $('#spanNomeAdvReu').text('');
        
        let reset;
        
        autorNovo = reset;
        reuNovo = reset;
        advAutorNovo = reset;
        advReuNovo = reset;
        
        $('#divCadastrarReu').hide();
        $('#divCadastrarDadosProcesso').hide();
    }
    
   /*============================================================================
    *                             EDITAR PROCESSOS
   ============================================================================*/
           
    //BOTÃO EDITAR AUTOR E ADVOGADO AUTOR - APRESENTA DADOS E FORMULÁRIO
    $('#botaoEditarAutor').click(function(){
        
        processoEditado = processoConsultado;
        autorEditado = autorConsultado;
        advAutorEditado = advAutorConsultado;
        
        $('#spanAutorAtual').text(autorConsultado.nomePessoa);
        $('#spanAdvAutorAtual').text(advAutorConsultado.nomeAdvogado);
                
        $('#divEditarProcessoTodos').show();
        $('#divEditarAutor').show();
        $('#divEditarReu').hide();
        $('#divEditarDadosProcesso').hide();
        
    });
    
    //BOTÃO ALTERAR AUTOR
    $('#botaoAlterarAutor').click(function(){
        processoEditado.autorIdFk = autorEditado.idPessoa;
        processoEditado.advAutorIdFk = advAutorEditado.idAdvogado;
        
        editarProcessoApi(processoEditado);
        
    });
    
    //BOTÃO CANCELAR EDIÇÃO AUTOR
    $('#botaoCancelarEdicaoAutor').click(function(){
        $('#cpfAutorBuscarEditar').val('');
        $('#cpfAdvAutorBuscarEditar').val('');
        $('#spanNovoAutor').text('');
        $('#spanNovoAdvAutor').text('');
        $('#divEditarProcessoTodos').hide();
    });
    
    //BOTÃO BUSCAR AUTOR - PARA EDIÇÃO
    $('#formularioBuscarAutorEditar').submit(async function(event){
        event.preventDefault();
               
        if($('#cpfAutorBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            autorEditado = await consultaPessoaCpfApi($('#cpfAutorBuscarEditar').val());
            $('#spanNovoAutor').text(autorEditado.nomePessoa);
        }
        
    });
    
    //BOTÃO BUSCAR ADVOGADO AUTOR - PARA EDIÇÃO
    $('#formularioBuscarAdvAutorEditar').submit(async function(event){
        event.preventDefault();
               
        if($('#cpfAdvAutorBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            advAutorEditado = await consultaAdvogadoCpfApi($('#cpfAdvAutorBuscarEditar').val());
            $('#spanNovoAdvAutor').text(advAutorEditado.nomeAdvogado);
        }
    });
    
    //*******************************************************************
        
    //BOTÃO EDITAR RÉU E ADVOGADO RÉU - APRESENTA DADOS E FORMULÁRIO
    $('#botaoEditarReu').click(function(){
        
        processoEditado = processoConsultado;
        reuEditado = reuConsultado;
        advReuEditado = advReuConsultado;
        
        $('#spanReuAtual').text(reuConsultado.nomePessoa);
        $('#spanAdvReuAtual').text(advReuConsultado.nomeAdvogado);
                
        $('#divEditarProcessoTodos').show();
        $('#divEditarAutor').hide();
        $('#divEditarReu').show();
        $('#divEditarDadosProcesso').hide();
        
    });
    
    //BOTÃO ALTERAR RÉU
    $('#botaoAlterarReu').click(function(){
        processoEditado.reuIdFk = reuEditado.idPessoa;
        processoEditado.advReuIdFk = advReuEditado.idAdvogado;
        
        editarProcessoApi(processoEditado);
        
    });
    
    //BOTÃO CANCELAR EDIÇÃO RÉU
    $('#botaoCancelarEdicaoReu').click(function(){
        $('#cpfReuBuscarEditar').val('');
        $('#cpfAdvReuBuscarEditar').val('');
        $('#spanNovoReu').text('');
        $('#spanNovoAdvReu').text('');
        $('#divEditarProcessoTodos').hide();
        
    });
    
    //BOTÃO BUSCAR RÉU - PARA EDIÇÃO
    $('#formularioBuscarReuEditar').submit(async function(event){
        event.preventDefault();
               
        if($('#cpfReuBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            reuEditado = await consultaPessoaCpfApi($('#cpfReuBuscarEditar').val());
            $('#spanNovoReu').text(reuEditado.nomePessoa);
        }
    });
    
    //BUSCAR ADVOGADO RÉU - PARA EDIÇÃO  
    $('#formularioBuscarAdvReuEditar').submit(async function(event){
        event.preventDefault();
               
        if($('#cpfAdvReuBuscarEditar').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            advReuEditado = await consultaAdvogadoCpfApi($('#cpfAdvReuBuscarEditar').val());
            $('#spanNovoAdvReu').text(advReuEditado.nomeAdvogado);
        }
    });
    
    //****************************************************************************
    
    //BOTÃO EDITAR DADOS PROCESSO - MOSTRA DIV E PREENCHE DADOS DO FORMULÁRIO
    $('#botaoEditarProcesso').click(function(){
        processoEditado = processoConsultado;
        $('#nrProcessoEditar').val(processoConsultado.nrProcesso);
        $('#varaTramitacaoEditar').val(processoConsultado.varaTramitacao);
        $('#UfVaraTramitacaoEditar').val(processoConsultado.ufTramitacao);
        $('#divEditarProcessoTodos').show();
        $('#divEditarAutor').hide();
        $('#divEditarReu').hide();
        $('#divEditarDadosProcesso').show();
    });
    
    //BOTÃO EDITAR PROCESSO COMPLETO
    $('#formularioProcessoEditar').submit(function(event){
        event.preventDefault();
        
        let processo = $('#nrProcessoEditar').val();
        let tramitacao = $('#varaTramitacaoEditar').val();
        let ufTramitacao = $('#UfVaraTramitacaoEditar').val();
                       
        if((processo === '') || (tramitacao === '') || (ufTramitacao === '')){
            alert("Preencha Todos os Campos para Edição");
        }
        else{
            processoEditado.nrProcesso = processo;
            processoEditado.varaTramitacao = tramitacao;
            processoEditado.ufTramitacao = ufTramitacao;
            
            editarProcessoApi(processoEditado);
        }
    });
    
    $('#botaoCancelarEdicaoDados').click(function(){
        $('#nrProcessoEditar').val('');
        $('#varaTramitacaoEditar').val('');
        $('#UfVaraTramitacaoEditar').val('');
        $('#divEditarDadosProcesso').hide();
    });
        
    
    $('#botaoProsseguir1').click(function(){
        $('#divCadastrarReu').show();
    });
    
    $('#botaoProsseguir2').click(function(){
        $('#divCadastrarDadosProcesso').show();
    });
    
   function editarProcessoApi(processoEditado){
        $.ajax({
            url: 'http://localhost:8080/processo/atualizar/' + processoEditado.idProcesso,
            method: 'PUT', 
            contentType: 'application/json', 
            data: JSON.stringify(processoEditado),
            success: function(data){
                if(confirm('Dados Atualizados com Sucesso!')){
                    
                    window.location.reload(true);  
                }
            },
            error: function(){
                alert('Erro ao Atualizar Dados!')
            }
        });
    }
    
    /*=================================================================================================
    ********** FUNÇÕES PARA CONSULTAS COM RETORNOS DE PESSOAS E ADVOGADOS - POR ID E POR CPF **********
    =================================================================================================*/
    
    //FUNÇÃO PARA CONSULTAR PESSOA POR ID COM RETORNO
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
    
    
     //FUNÇÃO PARA CONSULTAR ADVOGADO POR ID COM RETORNO
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
     
     //FUNÇÃO PARA CONSULTAR PESSOA POR CPF COM RETORNO
    async function consultaPessoaCpfApi(cpf){
        let pessoa;
        await $.ajax({
            url:'http://localhost:8080/pessoa/pesquisarCpf/' + cpf,
            method: 'GET',
            success: function(data){
                
                pessoa = data;
                
                if(!pessoa.nomePessoa){
                    alert("CPF Não Localizado!");
                }
                
            }
        });
        return pessoa;
    }
    
    
    //FUNÇÃO PARA CONSULTAR ADVOGADO POR CPF COM RETORNO
    async function consultaAdvogadoCpfApi(cpf){
        let advogado;
        await $.ajax({
            url:'http://localhost:8080/advogado/pesquisarCpf/' + cpf,
            method: 'GET',
            success: function(data){
                
                advogado = data;
                
                if(!advogado.nomeAdvogado){
                    alert("CPF Não Localizado!");
                }
            }
        });
        return advogado;
    }
    
    /*=================================================================================================
    ********** FUNÇÕES PARA MELHORIAS DE CPF **********
    =================================================================================================*/
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX -- CAMPOS EDIÇÃO
    $('#cpfAutorBuscarEditar').keypress(function (event){
        let inputlenght = $('#cpfAutorBuscarEditar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAutorBuscarEditar').val();
            $('#cpfAutorBuscarEditar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAutorBuscarEditar').val();
            $('#cpfAutorBuscarEditar').val(traco + '-');
        }
    });
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfAdvAutorBuscarEditar').keypress(function (event){
        let inputlenght = $('#cpfAdvAutorBuscarEditar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAdvAutorBuscarEditar').val();
            $('#cpfAdvAutorBuscarEditar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAdvAutorBuscarEditar').val();
            $('#cpfAdvAutorBuscarEditar').val(traco + '-');
        }
    });
    
     //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfReuBuscarEditar').keypress(function (event){
        let inputlenght = $('#cpfReuBuscarEditar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfReuBuscarEditar').val();
            $('#cpfReuBuscarEditar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfReuBuscarEditar').val();
            $('#cpfReuBuscarEditar').val(traco + '-');
        }
    });
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfAdvReuBuscarEditar').keypress(function (event){
        let inputlenght = $('#cpfAdvReuBuscarEditar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAdvReuBuscarEditar').val();
            $('#cpfAdvReuBuscarEditar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAdvReuBuscarEditar').val();
            $('#cpfAdvReuBuscarEditar').val(traco + '-');
        }
    });
    
    //************************************************************************
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX - CAMPOS CADASTRAMENTO
    $('#cpfAutorBuscar').keypress(function (event){
        let inputlenght = $('#cpfAutorBuscar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAutorBuscar').val();
            $('#cpfAutorBuscar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAutorBuscar').val();
            $('#cpfAutorBuscar').val(traco + '-');
        }
    });
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfAdvAutorBuscar').keypress(function (event){
        let inputlenght = $('#cpfAdvAutorBuscar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAdvAutorBuscar').val();
            $('#cpfAdvAutorBuscar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAdvAutorBuscar').val();
            $('#cpfAdvAutorBuscar').val(traco + '-');
        }
    });
    
     //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfReuBuscar').keypress(function (event){
        let inputlenght = $('#cpfReuBuscar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfReuBuscar').val();
            $('#cpfReuBuscar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfReuBuscar').val();
            $('#cpfReuBuscar').val(traco + '-');
        }
    });
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfAdvReuBuscar').keypress(function (event){
        let inputlenght = $('#cpfAdvReuBuscar').val().length;
        
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfAdvReuBuscar').val();
            $('#cpfAdvReuBuscar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfAdvReuBuscar').val();
            $('#cpfAdvReuBuscar').val(traco + '-');
        }
    });
       
    
});//FIM DO DOCUMENT READY FUNCTION