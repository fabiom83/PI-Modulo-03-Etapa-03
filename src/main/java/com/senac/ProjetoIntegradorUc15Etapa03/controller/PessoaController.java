package com.senac.ProjetoIntegradorUc15Etapa03.controller;

import com.senac.ProjetoIntegradorUc15Etapa03.data.PessoaEntity;
import com.senac.ProjetoIntegradorUc15Etapa03.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/pessoa")
public class PessoaController {
    @Autowired
    PessoaService pessoaService;
    
    //CADASTRA NOVA PESSOA
    @PostMapping("/cadastrar")
    public ResponseEntity<PessoaEntity> addPessoa(@RequestBody PessoaEntity pessoa){
        
        var novaPessoa = pessoaService.criarPessoa(pessoa);
        
        return new ResponseEntity<>(novaPessoa, HttpStatus.CREATED);
    }
    
    
    //BUSCA PESSOA POR ID
    @GetMapping("/pesquisar/{id}")
    public ResponseEntity<PessoaEntity> getPessoaById(@PathVariable Integer id){
        
        PessoaEntity pessoa = pessoaService.getPessoaId(id);
        
        return new ResponseEntity<>(pessoa, HttpStatus.OK);
    }
    
    //BUSCA PESSOA POR CPF
    @GetMapping("/pesquisarCpf/{cpf}")
    public ResponseEntity<PessoaEntity> getPessoaByCpf(@PathVariable String cpf){
        
        PessoaEntity pessoa = pessoaService.getPessoaCpf(cpf);
        
        return new ResponseEntity<>(pessoa, HttpStatus.OK);
    }
    
    
    //ATUALIZA DADOS DA PESSOA
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<PessoaEntity> atualizarPessoa(@PathVariable Integer id, @RequestBody PessoaEntity pessoa){
        
        var pessoaAtualizada = pessoaService.atualizarPessoa(id, pessoa);
        
        return new ResponseEntity<>(pessoaAtualizada, HttpStatus.OK);
    }

}//FIM PessoaController
