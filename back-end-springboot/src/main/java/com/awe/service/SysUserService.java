package com.awe.service;

import com.awe.model.entity.SysUserDO;
import com.awe.model.entity.UserEventInfoMixDO;

import java.util.List;

/**
 * 用户 业务层
 * 
 * @author BionGo
 */
public interface SysUserService
{
    /**
     * 通过用户名查询用户
     * 
     * @param userName 用户名
     * @return 用户对象信息
     */
    public SysUserDO selectUserByUserName(String userName);

    List<UserEventInfoMixDO> getAllUsersInfo();

    List<UserEventInfoMixDO> getDesignatedUsersInfo(String username, String eventId, String isEdit, String phoneNum);

    void deactivateAccountByUsername(String username,String status) ;
}
