package com.senac.ProjetoIntegradorUc15Etapa03.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="advogado")
public class AdvogadoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)    
    private int idAdvogado;
    private String nomeAdvogado;
    private String cpfAdvogado;
    private String nrOab;
    private String ufOab;

}
