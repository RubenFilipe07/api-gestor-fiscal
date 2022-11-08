package com.rubenfilipe07.api.resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubenfilipe07.api.models.Icms;
import com.rubenfilipe07.api.repository.IcmsRepository;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;



@RestController
@RequestMapping(value="/api")
@Api(value="API REST")
@CrossOrigin(origins="*")
public class IcmsResource {
	
	@Autowired
	private IcmsRepository icmsRepository;
	
	@GetMapping("/icms")
	@ApiOperation(value="Retorna a lista de imcs cadastrados")
	public List<Icms> listaIcms(){
		return icmsRepository.findAll();
	}
	
	@GetMapping("/icms/{id}")
	@ApiOperation(value="Retorna um imcs único de acordo com seu id")
	public Optional<Icms> listaIcmsId(@PathVariable(value="id") long id) {
		return icmsRepository.findById(id);
	}
	
	@PostMapping("/icms")
	@ApiOperation(value="Salva o icms")
	public Icms salvaIcms(@RequestBody Icms icms) {
		return icmsRepository.save(icms);
	}

	@PutMapping("/icms")
	@ApiOperation(value="Atualiza o imcs")
	public Icms atualizarIcms(@RequestBody Icms icms) {
		return icmsRepository.save(icms);
	}
	
	@DeleteMapping("/icms")
	@ApiOperation(value="Deleta o imcs")
	public void deletaIcms(@RequestBody Icms icms) {
		icmsRepository.delete(icms);
	}
	


}
