package com.senac.ProjetoIntegradorUc15Etapa03.controller;

import com.senac.ProjetoIntegradorUc15Etapa03.data.ProcessoEntity;
import com.senac.ProjetoIntegradorUc15Etapa03.service.ProcessoService;
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
@RequestMapping("/processo")
public class ProcessoController {
    @Autowired
    ProcessoService processoService;
    
    //CADASTRAR NOVO PROCESSO
    @PostMapping("/cadastrar")
    public ResponseEntity<ProcessoEntity> addProcesso(@RequestBody ProcessoEntity processo){
        
        var novoProcesso = processoService.criarProcesso(processo);
        
        return new ResponseEntity<>(novoProcesso, HttpStatus.CREATED);
    }
    
    
    //BUSCA PROCESSO POR ID
    @GetMapping("/pesquisar/{id}")
    public ResponseEntity<ProcessoEntity> getProcessoById(@PathVariable Integer id){
        
        ProcessoEntity processo = processoService.getProcessoId(id);
        
        return new ResponseEntity<>(processo, HttpStatus.OK);
    }
    
    
    //BUSCA PROCESSO POR NÚMERO
    @GetMapping("/pesquisarProcesso/{numeroProcesso}")
    public ResponseEntity<ProcessoEntity> getProcessoByNumeroProcesso(@PathVariable String numeroProcesso){
        
        ProcessoEntity processo = processoService.getProcessoNumero(numeroProcesso);
        
        return new ResponseEntity<>(processo, HttpStatus.OK);
    }
    
    
    //ATUALIZA DADOS DO PROCESSO
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<ProcessoEntity> atualizarProcesso(@PathVariable Integer id, @RequestBody ProcessoEntity processo){
        
        var processoAtualizado = processoService.atualizarProcesso(id, processo);
        
        return new ResponseEntity<>(processoAtualizado, HttpStatus.OK);
    }

}// FIM PESSOA CONTROLLER
