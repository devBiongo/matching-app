package com.awe.service.impl;

import com.awe.config.component.RedisCache;
import com.awe.constant.CacheConstant;
import com.awe.exception.ServiceException;
import com.awe.mapper.ActivityMapper;
import com.awe.mapper.EventMapper;
import com.awe.mapper.FinalMatchMapper;
import com.awe.mapper.SysUserMapper;
import com.awe.model.entity.*;
import com.awe.model.other.LoginUser;
import com.awe.model.vo.EventInfoVO;
import com.awe.service.EventService;
import com.awe.utils.SecurityUtils;
import com.awe.utils.StringUtils;
import com.awe.utils.bean.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private EventMapper eventMapper;

    @Autowired
    private ActivityMapper activityMapper;
    @Autowired
    private SysUserMapper sysUserMapper;

    @Autowired
    private FinalMatchMapper finalMatchMapper;
    @Autowired
    private RedisCache redisCache;

    @Autowired
    private MatchPageStatusService matchPageStatusService;

    @Transactional
    @Override
    public void insertEventInfoForCurrentUser(EventInfoVO eventInfoVO) {
        // 检查是否已经完善个人信息
        if (!StringUtils.isBlank(SecurityUtils.getEventId())) {
            throw new ServiceException("你已经填写了个人资料");
        }
        String newEventId = this.registerNewEventId(eventInfoVO.getGender());
        eventInfoVO.setEventId(newEventId);
        EventInfoDO eventInfo = createEventInfoDO(eventInfoVO);
        eventMapper.insertEventInfo(eventInfo);
        sysUserMapper.updateEventIdForCurrentUser(SecurityUtils.getUsername(), newEventId, new Date());
        // 将性别存入缓存
        LoginUser loginUser = SecurityUtils.getLoginUser();
        loginUser.setUserEventInfo(eventInfo);
        loginUser.getUser().setEventId(newEventId);
        redisCache.setCacheObject(CacheConstant.LOGIN_KEY + loginUser.getUsername(), loginUser);
    }

    private EventInfoDO createEventInfoDO(EventInfoVO eventInfoVO) {
        EventInfoDO eventInfoDO = new EventInfoDO();
        BeanUtils.copyProperties(eventInfoVO, eventInfoDO);
        eventInfoDO.setBirthday(eventInfoVO.getMyBirthday().toString().substring(0, 10));
        eventInfoDO.setCreateBy(SecurityUtils.getUsername());
        eventInfoDO.setCreateTime(new Date());
        return eventInfoDO;
    }

    private String registerNewEventId(String gender) {
        String eventId = eventMapper.getCurrentBiggestEventId("1".equals(gender) ? 1 : 0);
        String returnEventId = "";
        if (StringUtils.isBlank(eventId)) {
            if ("1".equals(gender)) {
                returnEventId = "1";
            } else {
                returnEventId = "2";
            }
        } else {
            returnEventId = (Integer.parseInt(eventId) + 2) + "";
        }
        return returnEventId;
    }

    @Override
    public List<EventInfoDO> loadHeterosexualDetails() {
        EventInfoDO eventInfo = SecurityUtils.getLoginUser().getUserEventInfo();
        if (Objects.isNull(eventInfo)) {
            throw new ServiceException("请先完善个人信息");
        }
        List<EventInfoDO> eventInfoDOS = "1".equals(eventInfo.getGender()) ?
                eventMapper.loadEventInfoByGender("0") :
                eventMapper.loadEventInfoByGender("1");
        for (EventInfoDO s : eventInfoDOS) {
            if ("0".equals(s.getPrivateFlag())) {
                s.setWechatNum(null);
                s.setPhoneNum(null);
            }
        }
        return eventInfoDOS;
    }

    @Override
    public EventInfoDO eventInfoUpdate(EventInfoVO eventInfoVO) {
        EventInfoDO eventInfoDO = new EventInfoDO();
        BeanUtils.copyProperties(eventInfoVO, eventInfoDO);
        eventInfoDO.setEventId(SecurityUtils.getLoginUser().getUser().getEventId());
        eventInfoDO.setGender(SecurityUtils.getLoginUser().getUserEventInfo().getGender());
        eventInfoDO.setBirthday(eventInfoVO.getMyBirthday().toString().substring(0, 10));
        eventInfoDO.setUpdateBy(SecurityUtils.getUsername());
        eventInfoDO.setUpdateTime(new Date());
        eventMapper.eventInfoUpdate(eventInfoDO);
        return eventInfoDO;
    }

    @Override
    public List<ChatListDO> loadMyChatList() {
        String eventId = SecurityUtils.getLoginUser().getMyEventDetails().getEventId();
        return eventMapper.loadMyChatList(eventId);
    }

    @Override
    public void updateReplyOnly(String initiatorId, String targetId, String reply) {
        if (getMatchedCount(initiatorId) >= 3) {
            throw new ServiceException("抱歉，他已经有了3组匹配，匹配失败");
        }
        if (getMatchedCount(targetId) >= 3) {
            throw new ServiceException("抱歉，你已经有了3组匹配，匹配失败");
        }
        if (eventMapper.updateReplyOnly(initiatorId, targetId, reply) == 0) {
            throw new ServiceException("更新失败,检查下是否更改了内容");
        }
    }

    private int getMatchedCount(String eventId) {
        List<ChatListDO> list = eventMapper.loadMyChatList(eventId);
        if (Objects.isNull(list)) {
            return 0;
        }
        int count = 0;
        for (ChatListDO s : list) {
            if ("1".equals(s.getReplyFlag())) {
                count++;
            }
        }
        return count;
    }

    @Override
    public String insertWhisper(String targetId) {
        EventInfoDO myDetails = SecurityUtils.getLoginUser().getMyEventDetails();
        List<ChatListDO> list = eventMapper.loadMyChatList(myDetails.getEventId());
        String herHis = "1".equals(myDetails.getGender()) ? "她" : "他";
        int count = 0;
        int count2 = 0;
        for (ChatListDO s : list) {
            if (s.getInitiatorId().equals(myDetails.getEventId())) {
                count2++;
            }
            if ("1".equals(s.getReplyFlag())) {
                count++;
            }
            if (targetId.equals(s.getTargetId())) {
                return "你已经邀请过" + herHis + "了";
            }
            if (targetId.equals(s.getInitiatorId())) {
                return herHis + "已经先一步邀请你了，赶紧回复" + herHis + "吧";
            }
        }
        if (count2 >= 5) {
            throw new ServiceException("你已经用光了你的5次邀请机会");
        }
        if (count >= 3) {
            throw new ServiceException("你已经匹配了三个人");
        }
        /* ------------------------------- */
        if (getMatchedCount(targetId) >= 3) {
            throw new ServiceException("抱歉，他已经有了3组匹配，无法选择");
        }
        if (eventMapper.insertWhisper(myDetails.getEventId(), targetId) != 1) {
            throw new ServiceException("操作失败，请联系管理员");
        }
        return "000";
    }

    @Override
    public List<ReplyDeDO> loadReplyInfo() {
        List<ReplyDeDO> replyDeDOS = eventMapper.loadReplyInfo(SecurityUtils.getLoginUser().getUser().getEventId());
        List<ReplyDeDO> returnObj = new ArrayList<>();
        for (ReplyDeDO s : replyDeDOS) {
            if ("1".equals(s.getReply())) {
                returnObj.add(s);
            }
        }
        return returnObj;
    }

    @Override
    public List<EventInfoDO> getMyEventInfo() {
        return eventMapper.getMyEventInfo(SecurityUtils.getLoginUser().getUser().getEventId());
    }

    @Override
    @Transactional
    public void insertMySweetHearts(String sweetHeartIds) {
        if (!matchPageStatusService.getPagesStatus().get("selectPage").equals("1")||this.checkIsSelected())
            throw new ServiceException("请通过正常路径访问此接口!!!");
        finalMatchMapper.insertSweetHeart(SecurityUtils.getEventId(), sweetHeartIds, this.getRound());
    }

    public boolean checkIsSelected(){
        return finalMatchMapper.selectCountForMe(SecurityUtils.getEventId(), this.getRound()) > 0;
    }

    private String getRound() {
        String curStatus = matchPageStatusService.getCurStatus();
        if (Arrays.asList("1", "2").contains(curStatus)) {
            return "1";
        } else if (Arrays.asList("4", "5").contains(curStatus)) {
            return "2";
        } else if (Arrays.asList("7", "8").contains(curStatus)) {
            return "3";
        } else {
            return "4";
        }
    }

    @Override
    public Map<String, String> getSelectableGuests() {
        Map<String, String> map = new HashMap<>();
        for (EventInfoDO s : finalMatchMapper
                .getSelectableGuests("1".equals(SecurityUtils.getLoginUser().getUserEventInfo().getGender()) ? "0" : "1")) {
            map.put(s.getEventId(), s.getRealName());
        }
        return map;
    }

    @Override
    public List<FinalMatchDO> loadListWhoSelectedMe() {
        return finalMatchMapper.loadListWhoSelectedMe(SecurityUtils.getEventId(),this.getRound());
    }

    @Transactional
    @Override
    public void replyGuestWhoSelectedMe(String initiatorId, String replyFlag) {
        finalMatchMapper.replyGuestWhoSelectedMe(initiatorId, SecurityUtils.getEventId(), replyFlag,this.getRound());
        if (replyFlag.equals("1")) {
            finalMatchMapper.updateUserInfoStatus(initiatorId, SecurityUtils.getEventId());
            finalMatchMapper.updateUserInfoStatus(SecurityUtils.getEventId(), initiatorId);
        }
    }

    @Override
    public boolean isDone() {
        return !finalMatchMapper.selectMatchStatus(SecurityUtils.getEventId()).equals("0");
    }

    //    public String getEventStatus(){
//        String rStatus = redisCache.getCacheObject("event_status");
//        if(!Objects.isNull(rStatus)){
//            return rStatus;
//        }
//        ActivityDO activitiesList =  activityMapper.selectLatestActivity().get(0);
//        if(Objects.isNull(activitiesList)){
//            throw new ServiceException("活动履历不该为0条，请联系管理员");
//        }
//        redisCache.setCacheObject("event_status", activitiesList.getStatus());
//        return activitiesList.getStatus();
//    }

}
