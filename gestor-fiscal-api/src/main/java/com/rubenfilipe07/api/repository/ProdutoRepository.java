package com.rubenfilipe07.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rubenfilipe07.api.models.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

}
