package com.keystone.mapper;

import com.keystone.dto.UserDTO;
import com.keystone.entity.User;

public class UserMapper {

    // Entity -> DTO
    public static UserDTO toDTO(User user) {

        if (user == null) {
            return null;
        }

        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getActive()
        );
    }

    // DTO -> Entity
    public static User toEntity(UserDTO dto) {

        if (dto == null) {
            return null;
        }

        User user = new User();

        user.setId(dto.getId());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setRole(dto.getRole());
        user.setActive(dto.getActive());

        return user;
    }
}