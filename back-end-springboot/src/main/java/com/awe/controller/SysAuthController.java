package com.awe.controller;

import com.awe.constant.Constants;
import com.awe.exception.ServiceException;
import com.awe.model.other.AjaxResult;
import com.awe.model.vo.LoginVO;
import com.awe.service.EventService;
import com.awe.service.SysAuthService;
import com.awe.service.SysMenuService;
import com.awe.service.impl.MatchPageStatusService;
import com.awe.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 注册
 * 登录验证
 * 权限列表
 *
 * @author BionGo
 */
@RestController
@RequestMapping("/auth")
public class SysAuthController {
    @Autowired
    private SysAuthService sysAuthService;
    @Autowired
    private SysMenuService sysMenuService;

    @Autowired
    private EventService eventService;

    @Autowired
    private MatchPageStatusService matchPageStatusService;

    /**
     * 登录方法
     *
     * @param loginVO 登录信息
     * @return 结果
     */
    @PostMapping("/login")
    public AjaxResult login(@RequestBody LoginVO loginVO) {
        AjaxResult ajax = AjaxResult.success();
        Map<String, String> map = sysAuthService.login(loginVO.getUsername(), loginVO.getPassword(), loginVO.getCode(),
                loginVO.getUuid());
        ajax.put(Constants.TOKEN, map.get("token"));
        ajax.put(Constants.NEED_COMPLETE, map.get("needFillEventInfo"));
        return ajax;
    }

    @PostMapping("/register")
    public AjaxResult register(@RequestBody @Validated LoginVO loginVO) {
        if("88".equals(matchPageStatusService.getCurStatus()))
            throw new ServiceException("活动已经关闭",999);
        if(Integer.parseInt(matchPageStatusService.getCurStatus())>-1){
            throw new ServiceException("现阶段不可注册",999);
        }
        AjaxResult ajax = AjaxResult.success();
        sysAuthService.doRegister(loginVO.getUsername(), new BCryptPasswordEncoder().encode(loginVO.getPassword()));
        return ajax;
    }

    /**
     * 获取路由信息
     *
     * @return 路由信息
     */
    @GetMapping("getRouters")
    public AjaxResult getRouters() {
        String userName = SecurityUtils.getUsername();
        return AjaxResult.success(sysMenuService.selectMenuTreeByUserId(userName));
    }
}
