package com.awe.model.vo;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * 用户登录对象
 * 
 * @author BionGo
 */
@Data
public class LoginVO {
    /**
     * 用户名
     */
    @NotBlank
    @Length(min = 5,max = 15)
    private String username;

    /**
     * 用户密码
     */
    @NotBlank
    @Length(min = 5,max = 15)
    private String password;

    /**
     * 验证码
     */
    private String code;

    /**
     * 唯一标识
     */
    private String uuid;
}
