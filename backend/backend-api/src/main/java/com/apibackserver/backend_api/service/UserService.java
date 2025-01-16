

package com.apibackserver.backend_api.service;
import com.apibackserver.backend_api.dto.UserDto;
import java.util.List;

public interface UserService{
    List<UserDto> getAllUsers();
    UserDto getUserById(String id);
    UserDto findByUsername(String username);
    boolean authenticate(String id, String rawPassword);
}