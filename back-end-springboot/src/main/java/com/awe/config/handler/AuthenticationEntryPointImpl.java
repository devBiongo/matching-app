package com.awe.config.handler;

import com.alibaba.fastjson.JSON;
import com.awe.model.other.AjaxResult;
import com.awe.utils.WebUtils;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e){
        AjaxResult result = AjaxResult.error(1001,e.getMessage());
        String json = JSON.toJSONString(result);
        WebUtils.renderString(response,json);
    }
}

