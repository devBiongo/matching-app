package com.awe.model.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 菜单权限表 sys_menu
 * 
 * @author BionGo
 */
@TableName("sys_menu")
@Data
public class SysMenuDO {

    /** 菜单ID */
    @TableId
    private Long menuId;

    /** 菜单名称 */
    @TableField("menu_name")
    private String menuName;

    /** 父菜单ID */
    @TableField("parent_id")
    private Long parentId;

    /** 显示顺序 */
    @TableField("order_num")
    private Integer orderNum;

    /** 路由地址 */
    @TableField("path")
    private String path;

    /** 组件路径 */
    @TableField("component")
    private String component;

    /** 路由参数 */
    @TableField("query")
    private String query;

    /** 是否为外链（0是 1否） */
    @TableField("is_frame")
    private String isFrame;

    /** 是否缓存（0缓存 1不缓存） */
    @TableField("is_cache")
    private String isCache;

    /** 类型（M目录 C菜单 F按钮） */
    @TableField("menu_type")
    private String menuType;

    /** 显示状态（0显示 1隐藏） */
    @TableField("visible")
    private String visible;
    
    /** 菜单状态（0正常 1停用） */
    @TableField("status")
    private String status;

    /** 权限字符串 */
    @TableField("perms")
    private String perms;

    /** 菜单图标 */
    @TableField("icon")
    private String icon;

    /**
     * 创建者
     */
    @TableField("create_by")
    private String createBy;

    /**
     * 创建时间
     */
    @TableField("create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /**
     * 更新者
     */
    @TableField("update_by")
    private String updateBy;

    /**
     * 更新时间
     */
    @TableField("update_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 子菜单(衍生)
     */
    private List<SysMenuDO> children;
}
