package com.awe.mapper;

import com.awe.model.entity.EventInfoDO;
import com.awe.model.entity.ChatListDO;
import com.awe.model.entity.ReplyDeDO;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface EventMapper {

    List<EventInfoDO> loadEventInfoByGender(String gender);
    void insertEventInfo(EventInfoDO eventInfoVO);

    void eventInfoUpdate(EventInfoDO eventInfoVO);

    String getCurrentBiggestEventId(int flag);
    List<ChatListDO> loadMyChatList(String eventId);

    int updateReplyOnly(@Param("initiatorId") String initiatorId,
                        @Param("targetId")String targetId,
                        @Param("replyFlag")String replyFlag);

    int insertWhisper(String eventId, String targetId);
    List<ReplyDeDO> loadReplyInfo(String eventId);

    List<EventInfoDO> getMyEventInfo(String eventId);
    EventInfoDO selectPersonalEventInfoByEventId(String eventId);
}
