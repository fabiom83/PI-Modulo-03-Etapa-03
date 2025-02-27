
$(document).ready(function(){
    
   $('#divDetalharAdvogado').hide();
   $('#divEditarAdvogado').hide();
    
    //VALIDAR CAMPO BUSCA NO ADVOGADO.HTML
    $('#campoBuscaAdvogado').submit(function(event){
        event.preventDefault();
        if($('#buscaAdvogado').val() === ''){
            alert("Preencha o Campo para Busca");
        }
        else{
            ('#divDetalharAdvogado').show();
        }
    });
    
    
    //VALIDAR FORMULÁRIO DE CADASTRO
    $('#formularioCadastrarAdvogado').submit(function(){
        event.preventDefault();
        let nome = $('#nomeAdvogado').val();
        let cpf = $('#cpfAdvogado').val();
        let nrOab = $('#nrOab').val();
        let ufOab = $('#ufOab').val();
                
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((nome === '') || (cpf === '') || (nrOab === '') || (ufOab === '')){
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
    
    //VALIDAR FORMULÁRIO EDITAR PESSOA
    $('#formularioEditarAdvogado').submit(function(){
        event.preventDefault();
        let nome = $('#nomeAdvogadoEditar').val();
        let cpf = $('#cpfAdvogadoEditar').val();
        let nrOab = $('#nrOabEditar').val();
        let ufOab = $('#ufOabEditar').val();
        
        let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        
        if((nome === '') || (cpf === '') || (nrOab === '') || (ufOab === '')){
            alert("Preencha Todos os Campos para Editar!");
        }
        
        if(cpf.match(cpfRegex)){
            console.log("CPF  OK");
        }
        else{
            alert("Informe o CPF no formato XXX.XXX.XXX-XX");
        }
    });
    
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
    
    $('#botaoEditarAdvogado').click(function(){
        $('#divEditarAdvogado').show();
    });
    
});//FIM DO DOCUMENT READY FUNCTION