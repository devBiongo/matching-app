package com.awe.mapper;

import com.awe.model.entity.SysUserDO;
import com.awe.model.entity.UserEventInfoMixDO;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * 用户表 数据层
 *
 * @author BionGo
 */
public interface SysUserMapper {
    /**
     * 通过用户名查询用户
     *
     * @param userName 用户名
     * @return 用户对象信息
     */
    SysUserDO selectUserByUserName(String userName);

    String selectRoleByUsername(String userName);

    void doRegister(
            @Param("username") String username,
            @Param("password") String password,
            @Param("createBy") String createBy,
            @Param("createTime") Date createTime
    );

    void addDefaultRole(String username);

    int checkAccountIsExist(String username);

    List<UserEventInfoMixDO> selectAllUsers();

    List<UserEventInfoMixDO> selectDesignatedUsers(
            @Param("username") String username,
            @Param("eventId") String eventId,
            @Param("isEdit") String isEdit,
            @Param("phoneNum") String phoneNum
    );

    void updateEventIdForCurrentUser(
            @Param("username") String username,
            @Param("eventId") String eventId,
            @Param("updateTime") Date updateTime
    );

    void deactivateAccountByUsername(String username,String status);
}
