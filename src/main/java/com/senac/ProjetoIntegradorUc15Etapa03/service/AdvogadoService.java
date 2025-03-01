package com.senac.ProjetoIntegradorUc15Etapa03.service;

import com.senac.ProjetoIntegradorUc15Etapa03.data.AdvogadoEntity;
import com.senac.ProjetoIntegradorUc15Etapa03.data.AdvogadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdvogadoService {
    @Autowired
    AdvogadoRepository advogadoRepository;
    
    //CRIA NOVO ADVOGADO
    public AdvogadoEntity criarAdvogado(AdvogadoEntity advogado){
        
        advogado.setIdAdvogado(0);
        advogadoRepository.save(advogado);
        
        return advogado;        
    }
    
    //BUSCA ADVOGADO POR ID
    public AdvogadoEntity getAdvogadoId(Integer advogadoId){
        return advogadoRepository.findById(advogadoId).orElse(null);
    }
    
    //BUSCA ADVOGADO POR CPF
    public AdvogadoEntity getAdvogadoCpf(String advogadoCpf){
        
        return advogadoRepository.findByCpfAdvogado(advogadoCpf);
    }
    
    public AdvogadoEntity atualizarAdvogado(Integer advogadoId, AdvogadoEntity advogadoRequest){
        
        AdvogadoEntity advogado = getAdvogadoId(advogadoId);
        
        advogado.setNomeAdvogado(advogadoRequest.getNomeAdvogado());
        advogado.setCpfAdvogado(advogadoRequest.getCpfAdvogado());
        advogado.setNrOab(advogadoRequest.getNrOab());
        advogado.setUfOab(advogadoRequest.getUfOab());
               
        advogadoRepository.save(advogado);
        
        return advogado;
    }

}// FIM ADVOGADO SERVICE
