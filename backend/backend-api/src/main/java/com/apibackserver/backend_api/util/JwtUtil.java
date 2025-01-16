package com.apibackserver.backend_api.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Set;

// Provider == JwtUtil

@Component
public class JwtUtil {

    private Key accessTokenKey;
    private Key refreshTokenKey;

    @Value("${jwt.access-token.expiration-time:120000}")
    private long accessTokenExpiration;
    
    @Value("${jwt.refresh-token.expiration-time:10800000}")
    private long refreshTokenExpiration;

    @Value("${jwt.access-token.secret-key}")
    private String accessTokenSecretKey; // Access Token 비밀키

    @Value("${jwt.refresh-token.secret-key}")
    private String refreshTokenSecretKey; // Refresh Token 비밀키

    private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();

    @PostConstruct
    public void init() {
        // Access Token Key 초기화
        this.accessTokenKey = createKey(accessTokenSecretKey);
        // Refresh Token Key 초기화
        this.refreshTokenKey = createKey(refreshTokenSecretKey);
    }

    private Key createKey(String secretKey) {
        if (secretKey == null || Base64.getDecoder().decode(secretKey).length < 64) {
            return Keys.secretKeyFor(SignatureAlgorithm.HS512); // 512비트 키 생성
        } else {
            return new SecretKeySpec(
                    Base64.getDecoder().decode(secretKey),
                    SignatureAlgorithm.HS512.getJcaName()
            );
        }
    }


    public String generateAccessToken(String id) {
        return Jwts.builder()
                .setSubject(id)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(accessTokenKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateRefreshToken(String id) {
        return Jwts.builder()
                .setSubject(id)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .signWith(refreshTokenKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims extractClaims(String token, boolean isAccessToken) {
        Key key = isAccessToken ? accessTokenKey : refreshTokenKey;
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token, boolean isAccessToken) {
        try {
            Key key = isAccessToken ? accessTokenKey : refreshTokenKey;
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            return !claims.getExpiration().before(new Date()) && !blacklistedTokens.contains(token);
        } catch (JwtException e) {
            return false; // 만료되거나 잘못된 토큰
        }
    }

    public long getAccessTokenExpirationTimeInSeconds() {
        return accessTokenExpiration / 1000;
    }

    public long getRefreshTokenExpirationTimeInSeconds() {
        return refreshTokenExpiration / 1000;
    }

    public void invalidateToken(String token) {
        blacklistedTokens.add(token);
    }
}