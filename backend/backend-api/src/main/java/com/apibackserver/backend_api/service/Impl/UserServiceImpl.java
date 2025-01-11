package com.apibackserver.backend_api.service.Impl;
import com.apibackserver.backend_api.dto.UserDto;
import com.apibackserver.backend_api.mapper.UserMapper;
import com.apibackserver.backend_api.service.UserService;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.apibackserver.backend_api.service.Impl.UserServiceImpl;

@Service
public class UserServiceImpl implements UserService{
  
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public List<UserDto> getAllUsers() {
        logger.debug("모든 사용자 정보를 조회합니다.");
        List<UserDto> users = userMapper.findAllUsers();
        logger.info("총 {}명의 사용자를 조회했습니다.", users.size());
        return users;
    }

    @Override
    public UserDto getUserById(String id) {
        logger.debug("ID가 {}인 사용자 정보를 조회합니다.", id);
        UserDto user = userMapper.findUserById(id);
        if (user != null) {
            logger.info("ID가 {}인 사용자 정보를 성공적으로 조회했습니다.", id);
        } else {
            logger.warn("ID가 {}인 사용자를 찾을 수 없습니다.", id);
        }
        return user;
    }

    @Override
    public UserDto findByUsername(String id) {
        return userMapper.findByUsername(id);
    }

    @Override
    public boolean authenticate(String id, String rawPassword) {
        UserDto user = findByUsername(id);

        if (user == null) {
            return false; // 사용자 없음
        }

        // 비밀번호 검증
        return passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }
}
