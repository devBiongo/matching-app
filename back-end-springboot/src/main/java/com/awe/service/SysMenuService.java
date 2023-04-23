package com.awe.service;

import com.awe.model.entity.SysMenuDO;
import com.awe.model.entity.UserEventInfoMixDO;

import java.util.List;

/**
 * 菜单 业务层
 * 
 * @author BionGo
 */
public interface SysMenuService
{
    /**
     * 根据用户ID查询菜单树信息
     *
     * @param username 用户ID
     * @return 菜单列表
     */
    List<SysMenuDO> selectMenuTreeByUserId(String username);
}
