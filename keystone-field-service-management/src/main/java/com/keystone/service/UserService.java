package com.keystone.service;

import java.util.List;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.ChangePasswordRequest;
import com.keystone.dto.CreateTechnicianRequest;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UpdateTechnicianRequest;
import com.keystone.dto.UserDTO;

public interface UserService {

	UserDTO saveUser(UserDTO userDTO);

	List<UserDTO> getAllUsers();

	UserDTO getUser(Long id);

	UserDTO updateUser(Long id, UserDTO userDTO);

	void deleteUser(Long id);

	String register(RegisterRequest request);

	AuthResponse login(LoginRequest request);

	List<UserDTO> getAllTechnicians();

	UserDTO updateTechnician(Long id, UpdateTechnicianRequest request);

	void deleteTechnician(Long id);

	UserDTO createTechnician(CreateTechnicianRequest request);
	
	void changePassword(ChangePasswordRequest request);

}