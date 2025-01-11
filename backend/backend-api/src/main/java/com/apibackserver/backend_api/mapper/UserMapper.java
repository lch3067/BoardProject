package com.apibackserver.backend_api.mapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

import com.apibackserver.backend_api.dto.UserDto;

@Mapper
public interface UserMapper {
    List<UserDto> findAllUsers();
    UserDto findUserById(@Param("id") String id);
    UserDto findByUsername(@Param("id") String id);
}