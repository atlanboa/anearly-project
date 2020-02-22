package com.anearly.rest.db.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anearly.rest.db.dto.PersonDto;
import com.anearly.rest.db.mapper.PersonMapper;

@Service
public class PersonService {
	
	@Autowired
	private PersonMapper mapper;
	public PersonDto selectPersonData(int device) throws Exception{
		return mapper.selectPersonData(device);
	};
	public void insertPersonData(PersonDto dto) throws Exception{
		mapper.insertPersonData(dto);
	};
	public void updatePersonData(PersonDto dto) throws Exception{
		mapper.updatePersonData(dto);
	};
	public void deletePersonData(int device) throws Exception{
		mapper.deletePersonData(device);
	};
}
