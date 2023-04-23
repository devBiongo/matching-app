package com.awe.service.impl;

import com.awe.mapper.ActivityMapper;
import com.awe.model.entity.ActivityDO;
import com.awe.model.entity.FinalMatchDO;
import com.awe.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    ActivityMapper activityMapper;

    @Override
    public List<ActivityDO> getActivityHistories() {
        return activityMapper.selectAllActivities();
    }

    @Override
    public List<ActivityDO> getSpecifiedHistory(String activityId) {
        return activityMapper.getSpecifiedHistory(activityId);
    }

    @Override
    public List<FinalMatchDO> getMatchInfo(String round) {
        return activityMapper.getMatchInfo(round);
    }

    @Override
    public void updateActivityHistory(ActivityDO activityDO) {
        activityDO.setUpdateTime(new Date());
        activityMapper.updateActivityHistory(activityDO);
    }

    @Override
    public void insertActivityHistory(ActivityDO activityDO) {
        activityDO.setCreateTime(new Date());
        activityMapper.insertActivityHistory(activityDO);
    }
}
