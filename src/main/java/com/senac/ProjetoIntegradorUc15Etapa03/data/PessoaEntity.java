package com.senac.ProjetoIntegradorUc15Etapa03.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="pessoa")
public class PessoaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)    
    private int idPessoa;
    private String nomePessoa;
    private String cpfPessoa;
    private String endereco;
    private String cidade;
    private String uf;

}
