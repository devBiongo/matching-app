package com.awe.model.other;

import com.alibaba.fastjson.annotation.JSONField;
import com.awe.exception.ServiceException;
import com.awe.model.entity.EventInfoDO;
import com.awe.model.entity.SysUserDO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class LoginUser implements UserDetails {

    // 用户基本信息
    private SysUserDO user;

    // 用户活动报名信息
    private EventInfoDO userEventInfo;

    public EventInfoDO getMyEventDetails(){
        if(Objects.isNull(userEventInfo))
                throw new ServiceException("检测到你尚未填写个人信息！",1010);
        return this.userEventInfo;
    }
    private List<String> permissions;

    public String getEventId(){
        return user.getEventId();
    }

    @JSONField(serialize = false)
    private List<SimpleGrantedAuthority> authorities;

    public LoginUser(SysUserDO user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        // 将permissions中的String类型的权限信息封装成SimpleGrantedAuthority对象
        if(!Objects.isNull(authorities)){
            return this.authorities;
        }
        this.authorities = this.permissions.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        return this.authorities;

    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
