
$(document).ready(function(){
    
    $('#divDetalharPessoa').hide();
    $('#divEditarPessoa').hide();
    
    //VALIDAR CAMPO BUSCA NO PESSOA.HTML
    $('#campoBuscaPessoa').submit(function(event){
        event.preventDefault();
        if($('#buscaPessoa').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            $('#divDetalharPessoa').show();
        }
    });
    
    
    //VALIDAR FORMULÁRIO DE CADASTRO
    $('#formularioCadastrarPessoa').submit(function(){
        event.preventDefault();
        let nome = $('#nomePessoa').val();
        let cpf = $('#cpfPessoa').val();
        let endereco = $('#enderecoPessoa').val();
        let cidade = $('#cidadePessoa').val();
        let uf = $('#ufPessoa').val();
        
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((nome === '') || (cpf === '') || (endereco === '') || (cidade === '') || (uf === '')){
            alert("Preencha Todos os Campos para Cadastro!");
        }
        
        if(cpf.match(cpfRegex)){
            console.log("CPF  OK");
        }
        else{
            alert("Informe o CPF no formato XXX.XXX.XXX-XX");
        }
    });
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfPessoa').keypress(function (event){
        let inputlenght = $('#cpfPessoa').val().length;
        console.log("lenght: " + inputlenght);
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfPessoa').val();
            $('#cpfPessoa').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfPessoa').val();
            $('#cpfPessoa').val(traco + '-');
        }
    });
    
    //VALIDAR FORMULÁRIO EDITAR PESSOA
    $('#formularioEditarPessoa').submit(function(){
        event.preventDefault();
        let nome = $('#nomePessoaEditar').val();
        let cpf = $('#cpfPessoaEditar').val();
        let endereco = $('#enderecoPessoaEditar').val();
        let cidade = $('#cidadePessoaEditar').val();
        let uf = $('#ufPessoaEditar').val();
        
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((nome === '') || (cpf === '') || (endereco === '') || (cidade === '') || (uf === '')){
            alert("Preencha Todos os Campos para Edição!");
        }
        
        if(cpf.match(cpfRegex)){
            console.log("CPF  OK");
        }
        else{
            alert("Informe o CPF no formato XXX.XXX.XXX-XX");
        }
    });
    
    //MÁSCARA AUTOPREENCHIMENTO CPF NO FORMATO XXX.XXX.XXX-XX
    $('#cpfPessoaEditar').keypress(function (event){
        let inputlenght = $('#cpfPessoaEditar').val().length;
        console.log("lenght: " + inputlenght);
        if((inputlenght === 3) || (inputlenght === 7)){
            let ponto = $('#cpfPessoaEditar').val();
            $('#cpfPessoaEditar').val(ponto + '.');
        }
        else if(inputlenght === 11){
            let traco = $('#cpfPessoaEditar').val();
            $('#cpfPessoaEditar').val(traco + '-');
        }
    });
    
    $('#botaoEditarPessoa').click(function(){
        $('#divEditarPessoa').show();
    });
    
});//FIM DO DOCUMENT READY FUNCTION