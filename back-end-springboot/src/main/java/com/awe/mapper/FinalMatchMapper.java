package com.awe.mapper;

import com.awe.model.entity.EventInfoDO;
import com.awe.model.entity.FinalMatchDO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FinalMatchMapper {
    int selectCountForMe(@Param("eventId") String eventId,
                         @Param("round") String round);

    int insertSweetHeart(@Param("initiatorId") String initiatorId,
                         @Param("targetId") String targetId,
                         @Param("round") String round);

    List<EventInfoDO> getSelectableGuests(String gender);

    List<FinalMatchDO> loadListWhoSelectedMe(@Param("eventId") String eventId, @Param("round") String round);

    List<FinalMatchDO> loadListWhoISelected(String eventId);

    void replyGuestWhoSelectedMe(@Param("initiatorId") String initiatorId,
                                 @Param("eventId") String eventId,
                                 @Param("replyFlag") String replyFlag,
                                 @Param("round") String round);

    String selectMatchStatus(@Param("eventId")String eventId);

    void updateUserInfoStatus(@Param("eventId") String eventId,
                              @Param("targetId") String targetId);
}
