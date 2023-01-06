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



@RestController
@RequestMapping(value="/api")

@CrossOrigin(origins="*")
public class IcmsResource {
	
	@Autowired
	private IcmsRepository icmsRepository;
	
	@GetMapping("/icms")
	public List<Icms> listaIcms(){
		return icmsRepository.findAll();
	}
	
	@GetMapping("/icms/{id}")
	public Optional<Icms> listaIcmsId(@PathVariable(value="id") long id) {
		return icmsRepository.findById(id);
	}
	
	@PostMapping("/icms")
	public Icms salvaIcms(@RequestBody Icms icms) {
		return icmsRepository.save(icms);
	}

	@PutMapping("/icms")
	public Icms atualizarIcms(@RequestBody Icms icms) {
		return icmsRepository.save(icms);
	}
	
	@DeleteMapping("/icms")
	public void deletaIcms(@RequestBody Icms icms) {
		icmsRepository.delete(icms);
	}
	
	@DeleteMapping("/icms/{id}")
	public void deletaIcmsId(@PathVariable(value="id") long id) {
		icmsRepository.deleteById(id);
	}
	
	


}
