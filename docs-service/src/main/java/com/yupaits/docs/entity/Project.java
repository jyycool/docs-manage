package com.yupaits.docs.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "docs_project")
public class Project implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "owner_id")
    private Integer ownerId;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "visit_code")
    private String visitCode;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "create_at")
    private Date createdAt;

    @Column(name = "update_at")
    private Date updatedAt;
}