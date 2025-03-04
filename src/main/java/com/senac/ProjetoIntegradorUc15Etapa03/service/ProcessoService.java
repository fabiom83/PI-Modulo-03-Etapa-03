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
        
        processo.setNrProcesso(processoRequest.getNrProcesso());
        processo.setVaraTramitacao(processoRequest.getVaraTramitacao());
        processo.setUfTramitacao(processoRequest.getUfTramitacao());
        processo.setAutorIdFk(processoRequest.getAutorIdFk());
        processo.setReuIdFk(processoRequest.getReuIdFk());
        processo.setAdvAutorIdFk(processoRequest.getAdvAutorIdFk());
        processo.setAdvReuIdFk(processoRequest.getAdvReuIdFk());
        
        processoRepository.save(processo);
        
        return processo;
    
    }


}//FIM PROCESSO SERVICE
