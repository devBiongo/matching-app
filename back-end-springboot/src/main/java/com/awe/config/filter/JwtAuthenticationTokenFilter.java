package com.awe.config.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.awe.config.context.AuthenticationContextHolder;
import com.awe.constant.CacheConstant;
import com.awe.config.component.RedisCache;
import com.awe.exception.AuthenticationErrorException;
import com.awe.model.other.LoginUser;
import com.awe.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * token过滤器
 *
 * @author BionGo
 */
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String token = JwtUtil.getJWT(request);
        if (StringUtils.hasText(token)) {
            LoginUser loginUser = null;
            try {
                Claims claims = JwtUtil.parseJWT(token);
                loginUser = redisCache.getCacheObject(CacheConstant.LOGIN_KEY + claims.getId());
            } catch (Exception e) {
                AuthenticationContextHolder.clearContext();
                String message = e.getMessage();
                if(e instanceof ExpiredJwtException) message = "令牌已过期，请重新登录";
                if(e instanceof MalformedJwtException||e instanceof SignatureException) message = "令牌非法";
                authenticationEntryPoint.commence(request, response, new AuthenticationErrorException(message));
                return;
            }
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        chain.doFilter(request, response);
    }
}
