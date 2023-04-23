package com.awe.config.handler;

import com.alibaba.fastjson.JSON;
import com.awe.model.other.AjaxResult;
import com.awe.utils.WebUtils;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       org.springframework.security.access.AccessDeniedException e) {
        AjaxResult result = AjaxResult.error("该接口只能匿名访问谢谢");
        String json = JSON.toJSONString(result);
        WebUtils.renderString(response,json);
    }
}

