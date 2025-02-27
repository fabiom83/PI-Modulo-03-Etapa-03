package com.senac.ProjetoIntegradorUc15Etapa03.service;

import com.senac.ProjetoIntegradorUc15Etapa03.data.PessoaEntity;
import com.senac.ProjetoIntegradorUc15Etapa03.data.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PessoaService {
    @Autowired
    PessoaRepository pessoaRepository;
    
    //CRIA NOVA PESSOA
    public PessoaEntity criarPessoa(PessoaEntity pessoa){
        pessoa.setIdPessoa(0);
        pessoaRepository.save(pessoa);
        
        return pessoa;        
    }
    
    //BUSCA PESSOA POR ID
    public PessoaEntity getPessoaId(Integer pessoaId){
        return pessoaRepository.findById(pessoaId).orElse(null);
    }
    
    //BUSCA PESSOA POR CPF
    public PessoaEntity getPessoaCpf(String pessoaCpf){
        return pessoaRepository.findByCpfPessoa(pessoaCpf);
    }
    
    public PessoaEntity atualizarPessoa(Integer pessoaId, PessoaEntity pessoaRequest){
        
        PessoaEntity pessoa = getPessoaId(pessoaId);
        
        pessoa.setNomePessoa(pessoaRequest.getNomePessoa());
        pessoa.setCpfPessoa(pessoaRequest.getCpfPessoa());
        pessoa.setCidade(pessoaRequest.getCidade());
        pessoa.setEndereco(pessoaRequest.getEndereco());
        pessoa.setUf(pessoaRequest.getUf());
        
        pessoaRepository.save(pessoa);
        
        return pessoa;
    
    }

}//FIM PessoaService
