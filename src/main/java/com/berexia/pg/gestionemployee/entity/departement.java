package com.berexia.pg.gestionemployee.entity;

import lombok.Data;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Departement")
public class departement implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id_depart")
    long idDepart;
    @Column(name ="nomDepart")
    String nomDepart;

    public long getIdDepart() {
        return idDepart;
    }

    public void setIdDepart(long idDepart) {
        this.idDepart = idDepart;
    }

    public String getNomDepart() {
        return nomDepart;
    }

    public void setNomDepart(String nomDepart) {
        this.nomDepart = nomDepart;
    }

    public long getCapacite() {
        return Capacite;
    }

    public void setCapacite(long capacite) {
        Capacite = capacite;
    }

    public List<employe> getEmployes() {
        return employes;
    }

    public void setEmployes(List<employe> employes) {
        this.employes = employes;
    }

    @Column(name = "Capacite")
    long Capacite;
    @OneToMany(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    List<employe> employes = new ArrayList<employe>();
}
