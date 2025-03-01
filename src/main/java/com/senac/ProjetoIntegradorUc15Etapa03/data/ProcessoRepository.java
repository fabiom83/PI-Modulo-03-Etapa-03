
package com.senac.ProjetoIntegradorUc15Etapa03.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessoRepository extends JpaRepository<ProcessoEntity, Integer>{
    
    //BUSCA PROCESSO POR NÚMERO
    public ProcessoEntity findByNrProcesso(String numeroProcesso);
    
}
