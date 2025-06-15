package com.dentist.dentist.core.services;

import com.dentist.dentist.rest.DTO.HistoryRecordDTO;
import com.dentist.dentist.rest.DTO.UserDTO;
import com.dentist.dentist.core.models.User;
import com.dentist.dentist.core.interfaces.UserService;
import com.dentist.dentist.core.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getHistoryRecords().stream()
                                .map(record -> new HistoryRecordDTO(
                                        record.getId(),
                                        record.getTitle(),
                                        record.getDate(),
                                        record.getDescription()))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }
}


