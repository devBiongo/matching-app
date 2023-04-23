package com.awe.service;

import com.awe.model.entity.*;
import com.awe.model.vo.EventInfoVO;

import java.util.List;
import java.util.Map;

public interface EventService {

    void insertEventInfoForCurrentUser(EventInfoVO eventInfoVO);

    List<EventInfoDO> loadHeterosexualDetails();

    EventInfoDO eventInfoUpdate(EventInfoVO eventInfoVO);

    List<ChatListDO> loadMyChatList();

    void updateReplyOnly(String initiatorId, String targetId, String reply);

    String insertWhisper(String targetId);

    List<ReplyDeDO> loadReplyInfo();

    List<EventInfoDO> getMyEventInfo();
    void insertMySweetHearts(String sweetHeartIds);

    Map<String, String> getSelectableGuests();

    List<FinalMatchDO> loadListWhoSelectedMe();

    void replyGuestWhoSelectedMe(String initiatorId,String replyFlag);
    boolean isDone();
    boolean checkIsSelected();
}
