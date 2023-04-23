package com.awe.service.impl;

import com.awe.config.context.ApplicationContext;
import com.awe.model.entity.SysMenuDO;
import com.awe.model.entity.SysUserDO;
import com.awe.model.other.LoginUser;
import com.awe.service.SysMenuService;
import com.awe.service.SysUserService;
import com.awe.utils.StringUtils;
import com.awe.utils.UserStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private static final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private SysMenuService sysMenuService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUserService userService = (SysUserService) ApplicationContext.getBean("sysUserServiceImpl");
        SysUserDO user = userService.selectUserByUserName(username);
        if (StringUtils.isNull(user)) {
            log.info("登录用户：{} 不存在.", username);
            throw new RuntimeException("登录用户：" + username + " 不存在");
        } else if (UserStatus.DELETED.getCode().equals(user.getDelFlag())) {
            log.info("登录用户：{} 已被删除.", username);
            throw new RuntimeException("对不起，您的账号：" + username + " 已被删除");
        } else if (UserStatus.DISABLE.getCode().equals(user.getStatus())) {
            log.info("登录用户：{} 已被停用.", username);
            throw new RuntimeException("对不起，您的账号：" + username + " 已停用");
        };
        return createLoginUser(user);
    }


    private LoginUser createLoginUser(SysUserDO user) {
        LoginUser loginUser = new LoginUser(user);
        List<SysMenuDO> menus = sysMenuService.selectMenuTreeByUserId(loginUser.getUsername());
        List<String> permissions = new ArrayList<>();
        for(SysMenuDO menu : menus){
            permissions.add(menu.getPerms());
        }
        loginUser.setPermissions(permissions);
        return loginUser;
    }
}
