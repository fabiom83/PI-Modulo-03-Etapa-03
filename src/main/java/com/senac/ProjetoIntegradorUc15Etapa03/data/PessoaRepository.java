
package com.senac.ProjetoIntegradorUc15Etapa03.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository extends JpaRepository<PessoaEntity, Integer>{
    
    //BUSCA PESSOA POR CPF
    public PessoaEntity findByCpfPessoa(String cpf);
    
}
