package com.awe.controller;

import com.awe.exception.ServiceException;
import com.awe.model.entity.UserEventInfoMixDO;
import com.awe.model.other.AjaxResult;
import com.awe.model.vo.TempVO;
import com.awe.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 后台用户管理
 *
 * @author BionGo
 */
@RestController
@RequestMapping("/admin/user")
public class SysUserController {

    @Autowired
    private SysUserService sysUserService;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("getAllUsersInfo")
    public AjaxResult getAllUsersInfo() {
        List<UserEventInfoMixDO> allUsersInfo = sysUserService.getAllUsersInfo();
        return AjaxResult.success(allUsersInfo);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("getDesignatedUsersInfo")
    public AjaxResult getDesignatedUsersInfo(@RequestBody TempVO tempVO) {
        List<UserEventInfoMixDO> designatedUsersInfo = sysUserService.getDesignatedUsersInfo(tempVO.getUsername(),tempVO.getEventId(), tempVO.getEdit(),tempVO.getPhone());
        return AjaxResult.success(designatedUsersInfo);
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/deactivateAccount/{username}/{status}")
    public AjaxResult deactivateAccountByUsername(@PathVariable("username")String username,@PathVariable("status")String status) {
        if("adminlaowu".equals(username)){
            throw new ServiceException("不可操作管理员");
        }
        sysUserService.deactivateAccountByUsername(username,status);
        return AjaxResult.success();
    }
}
