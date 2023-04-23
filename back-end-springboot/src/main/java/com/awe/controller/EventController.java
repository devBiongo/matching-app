package com.awe.controller;

import com.awe.config.component.RedisCache;
import com.awe.constant.CacheConstant;
import com.awe.exception.ServiceException;
import com.awe.model.entity.EventInfoDO;
import com.awe.model.other.AjaxResult;
import com.awe.model.other.LoginUser;
import com.awe.model.vo.EventInfoVO;
import com.awe.model.entity.ReplyDeDO;
import com.awe.service.EventService;
import com.awe.service.impl.MatchPageStatusService;
import com.awe.utils.SecurityUtils;
import com.awe.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * 活动业务
 *
 * @author BionGo
 */
@RestController
@RequestMapping
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private MatchPageStatusService matchPageStatusService;

    /**
     * 个人信息填写
     *
     * @param eventInfoVO 个人信息
     */
    @PreAuthorize("hasAuthority('event')")
    @PostMapping("/event/eventInfoRegis")
    public AjaxResult eventInfoRegis(@RequestBody @Validated EventInfoVO eventInfoVO) {
        AjaxResult ajax = AjaxResult.success();
        eventService.insertEventInfoForCurrentUser(eventInfoVO);
        return ajax;
    }

    /**
     * 个人信息更新
     *
     * @param eventInfoVO 个人信息
     */
    @PreAuthorize("hasAuthority('event')")
    @PostMapping("/event/myEventInfoUpdate")
    public AjaxResult myEventInfoUpdate(@RequestBody EventInfoVO eventInfoVO) {
        AjaxResult ajax = AjaxResult.success();
        EventInfoDO eventInfoDO = eventService.eventInfoUpdate(eventInfoVO);
        LoginUser loginUser = SecurityUtils.getLoginUser();
        loginUser.setUserEventInfo(eventInfoDO);
        redisCache.setCacheObject(CacheConstant.LOGIN_KEY + loginUser.getUsername(), loginUser);
        return ajax;
    }

    @PreAuthorize("hasAuthority('event')")
    @PostMapping("/event/editReply")
    public AjaxResult editReply(@RequestBody Map<String,String> params) {
        AjaxResult ajax = AjaxResult.success();
        if(StringUtils.isBlank(params.get("initiatorId"))||StringUtils.isBlank(params.get("reply"))){
            throw new ServiceException("此处不该出错，请联系管理员");
        }
        eventService.updateReplyOnly(params.get("initiatorId"),SecurityUtils.getEventId(),params.get("reply"));
        return ajax;
    }

    @PreAuthorize("hasAuthority('event')")
    @PostMapping("/event/textHer")
    public AjaxResult textHer(@RequestBody Map<String,String> params) {
        if(StringUtils.isBlank(params.get("targetId"))){
            throw new ServiceException("此处不该出错，请联系管理员");
        }
        return AjaxResult.success(eventService.insertWhisper(params.get("targetId")),null);
    }

    @PreAuthorize("hasAuthority('event')")
    @GetMapping("/event/getReplyInfo")
    public AjaxResult getReplyInfo() {
        AjaxResult ajax = AjaxResult.success();
        List<ReplyDeDO> replyInfo = eventService.loadReplyInfo();
        ajax.put("data",replyInfo);
        return ajax;
    }

    @PreAuthorize("hasAuthority('event')")
    @GetMapping("/event/loadInitializeInfo")
    public AjaxResult loadInitializeInfo() {
        List<EventInfoDO> guestDetails = eventService.loadHeterosexualDetails();
        Map<String,Object> data = new HashMap<>();
        data.put("status", matchPageStatusService.getCurStatus());
        data.put("myDetails", SecurityUtils.getLoginUser().getMyEventDetails());
        data.put("guestDetailsList", guestDetails);
        return AjaxResult.success(data);
    }

    @PreAuthorize("hasAuthority('event')")
    @GetMapping("/event/loadMyChatList")
    public AjaxResult loadMyMessage() {
        AjaxResult ajax = AjaxResult.success();
        ajax.put("data",eventService.loadMyChatList());
        return ajax;
    }

    @PreAuthorize("hasAuthority('event')")
    @GetMapping("/event/getMyEventInfo")
    public AjaxResult getMyEventInfo() {
        AjaxResult ajax = AjaxResult.success();
        List<EventInfoDO> eventInfoDOS=  eventService.getMyEventInfo();
        ajax.put("data",eventInfoDOS);
        return ajax;
    }
    @PreAuthorize("hasAuthority('event')")
    @GetMapping("/event/getSelectableGuests")
    public AjaxResult getSelectableGuests() {
        Map<String,Object> data = new HashMap<>();
        Map<String, String> pagesStatus = matchPageStatusService.getPagesStatus();
        if(eventService.isDone()||eventService.checkIsSelected()) pagesStatus.put("selectPage","0");
        data.put("pagesStatus", pagesStatus);
        data.put("guestList",pagesStatus.get("selectPage").equals("1")?eventService.getSelectableGuests():null);
        return AjaxResult.success(data);
    }

    @PreAuthorize("hasAuthority('event')")
    @PostMapping("/event/selectSweetHearts")
    public AjaxResult selectSweetHearts(@RequestBody Map<String,String> params) {
        if(eventService.isDone()) throw new ServiceException("请通过正规渠道访问此接口");
        eventService.insertMySweetHearts(Objects.requireNonNull(params.get("sweetHeartIds")));
        return AjaxResult.success();
    }

    @PreAuthorize("hasAuthority('event')")
    @GetMapping("/event/loadListWhoSelectedMe")
    public AjaxResult loadListWhoSelectedMe() {
        Map<String,Object> data = new HashMap<>();
        Map<String, String> pagesStatus = matchPageStatusService.getPagesStatus();
        if(eventService.isDone()) pagesStatus.put("replyPage","0");
        data.put("pagesStatus", pagesStatus);
        data.put("list",pagesStatus.get("replyPage").equals("1")?eventService.loadListWhoSelectedMe():null);
        return AjaxResult.success(data);
    }

    @PreAuthorize("hasAuthority('event')")
    @PostMapping("/event/replyGuestWhoSelectedMe")
    public AjaxResult replyGuestWhoSelectedMe(@RequestBody Map<String,String> params) {
        if(eventService.isDone()||matchPageStatusService.getPagesStatus().get("replyPage").equals("0"))
            throw new ServiceException("请通过正规渠道访问此接口");
        eventService.replyGuestWhoSelectedMe(params.get("initiatorId"),params.get("replyFlag"));
        return AjaxResult.success();
    }

    /**
     * 个人信息更新(后台)
     *
     * @param eventInfoVO 个人信息
     */
    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/admin/event/eventInfoUpdate")
    public AjaxResult eventInfoUpdate(@RequestBody EventInfoVO eventInfoVO) {
        AjaxResult ajax = AjaxResult.success();
        eventService.eventInfoUpdate(eventInfoVO);
        return ajax;
    }
}
