package com.awe.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * 业务异常
 *
 * @author ruoyi
 */
public final class AuthenticationErrorException extends AuthenticationException {

    private static final long serialVersionUID = 2896288327987009222L;
    /**
     * 错误码
     */
    private Integer code;

    /**
     * 错误提示
     */
    private String message;


    public AuthenticationErrorException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public AuthenticationErrorException(String msg) {
        super(msg);
        message = msg;
    }

    public String getMessage(){
        return this.message;
    }
}