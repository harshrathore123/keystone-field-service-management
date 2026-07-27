package com.keystone.service;

import java.util.List;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UserDTO;

public interface UserService {

    UserDTO saveUser(UserDTO userDTO);

    List<UserDTO> getAllUsers();

    UserDTO getUser(Long id);

    UserDTO updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);
    
    String register(RegisterRequest request);
    
    AuthResponse login(LoginRequest request);

}