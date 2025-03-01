package com.senac.ProjetoIntegradorUc15Etapa03.service;

import com.senac.ProjetoIntegradorUc15Etapa03.data.ProcessoEntity;
import com.senac.ProjetoIntegradorUc15Etapa03.data.ProcessoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcessoService {
    @Autowired
    ProcessoRepository processoRepository;
    
    //CRIA NOVO PROCESSO
    public ProcessoEntity criarProcesso(ProcessoEntity processo){
        processo.setIdProcesso(0);
        processoRepository.save(processo);
        
        return processo;        
    }
    
    
    //BUSCA PROCESSO POR ID
    public ProcessoEntity getProcessoId(Integer processoId){
        return processoRepository.findById(processoId).orElse(null);
    }
    
    
    //BUSCA PROCESSO POR NÚMERO
    public ProcessoEntity getProcessoNumero(String numeroProcesso){
        return processoRepository.findByNrProcesso(numeroProcesso);
    }
    
    public ProcessoEntity atualizarProcesso(Integer processoId, ProcessoEntity processoRequest){
        
        ProcessoEntity processo = getProcessoId(processoId);
        
        /* =========== TODO ================================
        
        pessoa.setNomePessoa(pessoaRequest.getNomePessoa());
        pessoa.setCpfPessoa(pessoaRequest.getCpfPessoa());
        pessoa.setCidade(pessoaRequest.getCidade());
        pessoa.setEndereco(pessoaRequest.getEndereco());
        pessoa.setUf(pessoaRequest.getUf());
        
        pessoaRepository.save(pessoa);

        ====================================================== */
        
        return processo;
    
    }


}//FIM PROCESSO SERVICE
