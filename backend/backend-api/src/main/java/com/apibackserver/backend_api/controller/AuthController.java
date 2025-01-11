package com.apibackserver.backend_api.controller;

import com.apibackserver.backend_api.service.UserService;
import com.apibackserver.backend_api.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String id = credentials.get("id");
        String password = credentials.get("password");

        if (userService.authenticate(id, password)) {
            String accessToken = jwtUtil.generateAccessToken(id);
            String refreshToken = jwtUtil.generateRefreshToken(id);

             // 헤더에 토큰 추가
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            headers.set("Refresh-Token", refreshToken);
            headers.set("access_expires_in", String.valueOf(jwtUtil.getAccessTokenExpirationTimeInSeconds()));
            headers.set("refresh_expires_in", String.valueOf(jwtUtil.getRefreshTokenExpirationTimeInSeconds()));

            // 응답 본문
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("success", true);
            responseBody.put("message", "Login successful");

            return ResponseEntity.ok()
                .headers(headers)
                .body(responseBody);
        }

        return ResponseEntity.status(401).body(Map.of(
            "success", false,
            "message", "Invalid username or password"
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> requestBody) {
        String refreshToken = requestBody.get("refresh_token");

        if (refreshToken == null || jwtUtil.validateToken(refreshToken, false)) {
            return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "Refresh Token is invalid or expired"
            ));
        }

        String username = jwtUtil.extractClaims(refreshToken, false).getSubject();
        String newAccessToken = jwtUtil.generateAccessToken(username);

        return ResponseEntity.ok(Map.of(
            "access_token", newAccessToken,
            "access_expires_in", jwtUtil.getAccessTokenExpirationTimeInSeconds()
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorizationHeader) {
        // 헤더에서 토큰 추출
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "유효하지 않은 Authorization 헤더입니다."
            ));
        }

        String token = authorizationHeader.substring(7); // "Bearer " 제거

        // 토큰 만료 여부 확인
        if (jwtUtil.validateToken(token, true)) {
            return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "토큰이 이미 만료되었습니다."
            ));
        }

        // 토큰 블랙리스트 추가
        jwtUtil.invalidateToken(token);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "로그아웃 성공"
        ));
    }
}
