package com.awe.mapper;

import com.awe.model.entity.ActivityDO;
import com.awe.model.entity.FinalMatchDO;

import java.util.List;

public interface ActivityMapper {

    List<ActivityDO> selectAllActivities();
    List<ActivityDO> getSpecifiedHistory(String activityId);
    List<FinalMatchDO> getMatchInfo(String round);
    void updateActivityHistory(ActivityDO activityDO);
    void insertActivityHistory(ActivityDO activityDO);
}
