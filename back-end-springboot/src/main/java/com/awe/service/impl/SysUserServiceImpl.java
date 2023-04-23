package com.awe.service.impl;

import com.awe.mapper.SysUserMapper;
import com.awe.model.entity.SysUserDO;
import com.awe.model.entity.UserEventInfoMixDO;
import com.awe.service.SysUserService;
import com.awe.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户 业务层处理
 *
 * @author BionGo
 */
@Service
public class SysUserServiceImpl implements SysUserService {
    private static final Logger log = LoggerFactory.getLogger(SysUserServiceImpl.class);

    @Autowired
    private SysUserMapper sysUserMapper;

    /**
     * 通过用户名查询用户
     *
     * @param userName 用户名
     * @return 用户对象信息
     */
    @Override
    public SysUserDO selectUserByUserName(String userName) {
        return sysUserMapper.selectUserByUserName(userName);
    }

    @Override
    public List<UserEventInfoMixDO> getAllUsersInfo() {
        return sysUserMapper.selectAllUsers();
    }

    @Override
    public List<UserEventInfoMixDO> getDesignatedUsersInfo(String username, String eventId, String isEdit, String phoneNum) {
        List<UserEventInfoMixDO> userEventInfoMixDOS = sysUserMapper.selectDesignatedUsers(
                StringUtils.isBlank(username) ? null : username,
                StringUtils.isBlank(eventId) ? null : eventId,
                StringUtils.isBlank(phoneNum) ? null : phoneNum,
                StringUtils.isBlank(isEdit) ? null : isEdit
        );
        List<UserEventInfoMixDO> returnList = new ArrayList<>();
        if ("0".equals(isEdit)) {
            for (UserEventInfoMixDO s : userEventInfoMixDOS) {
                if (StringUtils.isBlank(s.getEventId())) {
                    returnList.add(s);
                }
            }
            return returnList;
        }
        if ("1".equals(isEdit)) {
            for (UserEventInfoMixDO s : userEventInfoMixDOS) {
                if (!StringUtils.isBlank(s.getEventId())) {
                    returnList.add(s);
                }
            }
            return returnList;
        }
        return userEventInfoMixDOS;
    }

    @Override
    public void deactivateAccountByUsername(String username,String status) {
        sysUserMapper.deactivateAccountByUsername(username,status);
    }
}
