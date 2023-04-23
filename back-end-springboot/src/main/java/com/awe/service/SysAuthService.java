package com.awe.service;

import java.util.Map;

/**
 * 登录校验方法
 *
 * @author BionGo
 */
public interface SysAuthService {

     Map<String,String> login(String username, String password, String code, String uuid);

     void doRegister(String username, String password);
}
