package com.awe.mapper;

import com.awe.model.entity.SysMenuDO;
import java.util.List;

/**
 * 菜单表 数据层
 *
 * @author BionGo
 */
public interface SysMenuMapper
{
    /**
     * 根据用户ID查询菜单
     *
     * @param username 用户ID
     * @return 菜单列表
     */
    List<SysMenuDO> selectMenuTreeByUsername(String username);
}
