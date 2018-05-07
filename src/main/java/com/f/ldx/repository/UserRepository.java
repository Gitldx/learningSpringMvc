package com.f.ldx.repository;

import com.f.ldx.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;



public interface UserRepository extends CrudRepository<User, Long> {

}
