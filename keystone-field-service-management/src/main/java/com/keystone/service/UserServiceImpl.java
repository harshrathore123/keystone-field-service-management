package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.ChangePasswordRequest;
import com.keystone.dto.CreateTechnicianRequest;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UpdateTechnicianRequest;
import com.keystone.dto.UserDTO;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.UserMapper;
import com.keystone.repository.UserRepository;
import com.keystone.security.jwt.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    
    @Override
    public UserDTO saveUser(UserDTO userDTO) {

        User user = UserMapper.toEntity(userDTO);

        User savedUser = userRepository.save(user);

        return UserMapper.toDTO(savedUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id : " + id));

        return UserMapper.toDTO(user);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id : " + id));

        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        existingUser.setRole(userDTO.getRole());
        existingUser.setActive(userDTO.getActive());

        User updatedUser = userRepository.save(existingUser);

        return UserMapper.toDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id : " + id));

        userRepository.delete(user);
    }

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone Number already exists");
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());
        user.setActive(true);

        userRepository.save(user);

        return "User Registered Successfully";
    }
    
    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                "Login Successful",
                user.getRole(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
    
    @Override
    public List<UserDTO> getAllTechnicians() {

        return userRepository.findByRole(Role.TECHNICIAN)
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public UserDTO createTechnician(CreateTechnicianRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone Number already exists");
        }

        User technician = new User();

        technician.setFirstName(request.getFirstName());
        technician.setLastName(request.getLastName());
        technician.setEmail(request.getEmail());
        technician.setPassword(passwordEncoder.encode(request.getPassword()));
        technician.setPhoneNumber(request.getPhoneNumber());
        technician.setRole(Role.TECHNICIAN);
        technician.setActive(request.getActive());

        User savedTechnician = userRepository.save(technician);

        return UserMapper.toDTO(savedTechnician);
    }
    
    @Override
    public UserDTO updateTechnician(Long id, UpdateTechnicianRequest request) {

        User technician = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Technician not found with id : " + id));

        technician.setFirstName(request.getFirstName());
        technician.setLastName(request.getLastName());
        technician.setEmail(request.getEmail());
        technician.setPhoneNumber(request.getPhoneNumber());
        technician.setActive(request.getActive());

        technician.setRole(Role.TECHNICIAN);

        User updatedTechnician = userRepository.save(technician);

        return UserMapper.toDTO(updatedTechnician);
    }
    
    @Override
    public void deleteTechnician(Long id) {

        User technician = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Technician not found with id : " + id));

        userRepository.delete(technician);
    }
    
    @Override
    public void changePassword(ChangePasswordRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect.");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New password and confirm password do not match.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

}