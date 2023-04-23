package com.awe.controller;

import com.awe.exception.ServiceException;
import com.awe.model.entity.ActivityDO;
import com.awe.model.other.AjaxResult;
import com.awe.service.ActivityService;
import com.awe.service.impl.MatchPageStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @Autowired
    private MatchPageStatusService matchPageStatusService;

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("getActivityHistories")
    public AjaxResult getActivityHistories() {
        List<ActivityDO> activityHistories = activityService.getActivityHistories();
        return AjaxResult.success(activityHistories);
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/getSpecifiedHistory/{activityId}")
    public AjaxResult getSpecifiedHistory(@PathVariable("activityId")String activityId) {
        List<ActivityDO> activityHistories = activityService.getSpecifiedHistory(activityId);
        if(activityHistories.size()==0){
            throw new ServiceException("该履历不存在，或者已被删除");
        }
        return AjaxResult.success(activityHistories.get(0));
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/getMatchInfo/{round}")
    public AjaxResult getMatchInfo(@PathVariable("round")String round) {
        return AjaxResult.success(activityService.getMatchInfo(round));
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/updateActivityHistory")
    public AjaxResult updateActivityHistory(@RequestBody ActivityDO activityDO) {
        activityService.updateActivityHistory(activityDO);
        return AjaxResult.success();
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/registerActivityHistory")
    public AjaxResult registerActivityHistory(@RequestBody ActivityDO activityDO) {
        if(!"88".equals(matchPageStatusService.getCurStatus())){
            throw new ServiceException("请先执行完或者禁用上一条履历");
        }
        activityService.insertActivityHistory(activityDO);
        return AjaxResult.success();
    }
}
