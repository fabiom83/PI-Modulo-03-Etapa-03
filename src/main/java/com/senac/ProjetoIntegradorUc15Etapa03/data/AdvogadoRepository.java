
package com.senac.ProjetoIntegradorUc15Etapa03.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvogadoRepository extends JpaRepository<AdvogadoEntity, Integer>{
    
    //BUSCA ADVOGADO POR CPF
    public AdvogadoEntity findByCpfAdvogado(String cpf);
    
}
