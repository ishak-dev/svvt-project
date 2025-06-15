package com.dentist.dentist.core.interfaces;

import com.dentist.dentist.rest.DTO.UserDTO;
import com.dentist.dentist.core.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    List<UserDTO> getAllUsers();

}
