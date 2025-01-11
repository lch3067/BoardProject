package com.apibackserver.backend_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/csrf")
public class CsrfController {

    @GetMapping
    public ResponseEntity<?> getCsrfToken(HttpServletRequest request) {
        // HttpServletRequest에서 CSRF 토큰 가져오기
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());

        if (csrfToken != null) {
            return ResponseEntity.ok(Map.of("token", csrfToken.getToken()));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                "message", "CSRF 토큰을 생성할 수 없습니다."
            ));
        }
    }
}