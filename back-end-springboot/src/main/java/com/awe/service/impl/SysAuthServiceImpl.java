package com.awe.service.impl;

import com.awe.config.context.AuthenticationContextHolder;
import com.awe.constant.CacheConstant;
import com.awe.config.component.RedisCache;
import com.awe.exception.ServiceException;
import com.awe.mapper.EventMapper;
import com.awe.mapper.SysUserMapper;
import com.awe.model.entity.EventInfoDO;
import com.awe.model.other.LoginUser;
import com.awe.service.SysAuthService;
import com.awe.utils.JwtUtil;
import com.awe.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * 登录校验方法
 *
 * @author BionGo
 */
@Service
public class SysAuthServiceImpl implements SysAuthService {

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SysUserMapper sysUserMapper;

    @Autowired
    private EventMapper eventMapper;

    /**
     * 登录验证
     *
     * @param username 用户名
     * @param password 密码
     * @param code     验证码
     * @param uuid     唯一标识
     * @return 结果
     */
    public Map<String,String> login(String username, String password, String code, String uuid) {
        Authentication authentication = null;
        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, password);
            AuthenticationContextHolder.setContext(authenticationToken);
            authentication = authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new ServiceException("密码错误！");
        } finally {
            AuthenticationContextHolder.clearContext();
        }
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        // 加载活动所需个人情报（可能为空）
        boolean isExist = this.loadCurrentUserEventInfo(loginUser);
        redisCache.setCacheObject(CacheConstant.LOGIN_KEY + loginUser.getUsername(), loginUser);
        Map<String,String> returnObj = new HashMap<>();
        returnObj.put("needFillEventInfo",isExist?"0":"1");
        returnObj.put("token",JwtUtil.createJWT(loginUser.getUsername()));
        return returnObj;
    }

    private boolean loadCurrentUserEventInfo(LoginUser loginUser) {
        if(!StringUtils.isBlank(loginUser.getEventId())){
            EventInfoDO personalEventInfo = eventMapper.selectPersonalEventInfoByEventId(loginUser.getEventId());
            loginUser.setUserEventInfo(personalEventInfo);
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public void doRegister(String username, String password) {
        if(this.sysUserMapper.checkAccountIsExist(username)!=0){
            throw new ServiceException("该用户已存在");
        }
        this.sysUserMapper.doRegister(username,password,username,new Date());
        this.sysUserMapper.addDefaultRole(username);
    }
}
