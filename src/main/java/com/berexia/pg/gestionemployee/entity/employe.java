package com.berexia.pg.gestionemployee.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "Employe")
public class employe implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "idEmploye")
    long idEmploye;
    @Column(name = "nomEmploye")
    String nomEmploye;
    @Column(name = "prenomEmploye")
    String prenomEmploye;
    @Column(name ="ville")
    String ville;

    public long getIdEmploye() {
        return idEmploye;
    }

    public void setIdEmploye(long idEmploye) {
        this.idEmploye = idEmploye;
    }

    public String getNomEmploye() {
        return nomEmploye;
    }

    public void setNomEmploye(String nomEmploye) {
        this.nomEmploye = nomEmploye;
    }

    public String getPrenomEmploye() {
        return prenomEmploye;
    }

    public void setPrenomEmploye(String prenomEmploye) {
        this.prenomEmploye = prenomEmploye;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public com.berexia.pg.gestionemployee.entity.departement getDepartement() {
        return departement;
    }

    public void setDepartement(com.berexia.pg.gestionemployee.entity.departement departement) {
        this.departement = departement;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    departement departement;
}
