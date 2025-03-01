package com.senac.ProjetoIntegradorUc15Etapa03.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="processo")
public class ProcessoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idProcesso;
    private String nrProcesso;
    private String varaTramitacao;
    private String ufTramitacao;
    private int autorIdFk;
    private int reuIdFk;
    private int advAutorIdFk;
    private int advReuIdFk;

}
