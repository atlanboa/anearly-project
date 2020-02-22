package com.anearly.rest.db.mapper;

import com.anearly.rest.db.dto.PersonDto;

public interface PersonMapper {

	PersonDto selectPersonData(int device) throws Exception;
	void insertPersonData(PersonDto dto) throws Exception;
	void updatePersonData(PersonDto dto) throws Exception;
	void deletePersonData(int device) throws Exception;

}
