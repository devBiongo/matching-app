package com.awe.service;

import com.awe.model.entity.ActivityDO;
import com.awe.model.entity.FinalMatchDO;

import java.util.List;

public interface ActivityService {

    List<ActivityDO> getActivityHistories();

    List<ActivityDO> getSpecifiedHistory(String activityId);

    List<FinalMatchDO> getMatchInfo(String round);

    void updateActivityHistory(ActivityDO finalMatchDO);

    void insertActivityHistory(ActivityDO activityDO);
}
