package com.awe.service.impl;

import com.awe.mapper.SysMenuMapper;
import com.awe.model.entity.SysMenuDO;
import com.awe.service.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 菜单 业务层处理
 *
 * @author BionGo
 */
@Service
public class SysMenuServiceImpl implements SysMenuService {
    @Autowired
    private SysMenuMapper menuMapper;

    /**
     * 根据用户ID查询菜单
     *
     * @param username 用户名称
     * @return 菜单列表
     */
    @Override
    public List<SysMenuDO> selectMenuTreeByUserId(String username) {
        List<SysMenuDO> menus = menuMapper.selectMenuTreeByUsername(username);
        return doFormatMenus(menus, 0);
    }

    /**
     * 根据父节点的ID获取所有子节点
     *
     * @param menus    分类表
     * @param parentId 传入的父节点ID
     * @return String
     */
    public List<SysMenuDO> doFormatMenus(List<SysMenuDO> menus, int parentId) {
        List<SysMenuDO> returnList = new ArrayList<>();
        for (SysMenuDO menu : menus) {
            if (parentId == menu.getParentId()) {
                recursionFunction(menus, menu);
                returnList.add(menu);
            }
        }
        return returnList;
    }

    /**
     * 递归列表
     *
     * @param menus 原材料
     * @param target 注入对象
     */
    private void recursionFunction(List<SysMenuDO> menus, SysMenuDO target) {
        // 得到子节点列表
        List<SysMenuDO> childrenList = getChildrenList(menus, target);
        target.setChildren(childrenList);
        for (SysMenuDO child : childrenList) {
            if (hasChild(menus, child)) {
                recursionFunction(menus, child);
            }
        }
    }

    /**
     * 遍历原材料获得该节点的所有子节点
     */
    private List<SysMenuDO> getChildrenList(List<SysMenuDO> menus, SysMenuDO target) {
        List<SysMenuDO> returnList = new ArrayList<>();
        for (SysMenuDO menu : menus) {
            if (menu.getParentId().longValue() == target.getMenuId().longValue()) {
                returnList.add(menu);
            }
        }
        return returnList;
    }

    /**
     * 判断是否有子节点
     */
    private boolean hasChild(List<SysMenuDO> menus, SysMenuDO target) {
        return getChildrenList(menus, target).size() > 0;
    }
}
