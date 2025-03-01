package com.senac.ProjetoIntegradorUc15Etapa03.controller;

import com.senac.ProjetoIntegradorUc15Etapa03.data.AdvogadoEntity;
import com.senac.ProjetoIntegradorUc15Etapa03.service.AdvogadoService;
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
@RequestMapping("/advogado")
public class AdvogadoController {
    
    @Autowired
    AdvogadoService advogadoService;
    
    //CADASTRA NOVO ADVOGADO
    @PostMapping("/cadastrar")
    public ResponseEntity<AdvogadoEntity> addAdvogado(@RequestBody AdvogadoEntity advogado){
        
        var novoAdvogado = advogadoService.criarAdvogado(advogado);
        
        return new ResponseEntity<>(novoAdvogado, HttpStatus.CREATED);
    }
    
    
    //BUSCA ADVOGADO POR ID
    @GetMapping("/pesquisar/{id}")
    public ResponseEntity<AdvogadoEntity> getAdvogadoById(@PathVariable Integer id){
        
        AdvogadoEntity advogado = advogadoService.getAdvogadoId(id);
        
        return new ResponseEntity<>(advogado, HttpStatus.OK);
    }
    
    //BUSCA ADVOGADO POR CPF
    @GetMapping("/pesquisarCpf/{cpf}")
    public ResponseEntity<AdvogadoEntity> getAdvogadoByCpf(@PathVariable String cpf){
        
        AdvogadoEntity advogado = advogadoService.getAdvogadoCpf(cpf);
        
        return new ResponseEntity<>(advogado, HttpStatus.OK);
    }
    
    
    //ATUALIZA DADOS DE ADVOGADO
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<AdvogadoEntity> atualizarAdvogado(@PathVariable Integer id, @RequestBody AdvogadoEntity advogado){
        
        var advogadoAtualizado = advogadoService.atualizarAdvogado(id, advogado);
        
        return new ResponseEntity<>(advogadoAtualizado, HttpStatus.OK);
    }


}//FIM ADVOGADO CONTROLLER
