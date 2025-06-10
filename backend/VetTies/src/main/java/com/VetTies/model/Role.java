package com.VetTies.model;


import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @UuidGenerator
    private UUID roleId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, name = "role_name")
    private ERole name;



    public UUID getId() {
        return roleId;
    }

    public Role setId(UUID id) {
        this.roleId = id;
        return this;
    }

    public ERole getName() {
        return name;
    }

    public Role setName(ERole name) {

        this.name = name;
        return this;

    }
}