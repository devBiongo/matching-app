package com.awe.service.impl;

import com.awe.mapper.ActivityMapper;
import com.awe.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchPageStatusService {
    @Autowired
    private ActivityMapper activityMapper;
    private static final String SELECT_PAGE = "selectPage";
    private static final String REPLY_PAGE = "replyPage";

    public Map<String,String> getPagesStatus(){
        // List list = Stream.of("a", "b").collect(Collectors.toList());
        Map<String,String> returnObj = new HashMap<>(){{
            put(SELECT_PAGE,"0");
            put(REPLY_PAGE,"0");
        }};
        if(SecurityUtils.getLoginUser().getUserEventInfo().getGender().equals("1")){
            if(Arrays.asList("1", "7").contains(this.getCurStatus())) returnObj.put(SELECT_PAGE,"1");
            if(Arrays.asList("5", "11").contains(this.getCurStatus())) returnObj.put(REPLY_PAGE,"1");
        }else{
            if(Arrays.asList("4", "10").contains(this.getCurStatus())) returnObj.put(SELECT_PAGE,"1");
            if(Arrays.asList("2", "8").contains(this.getCurStatus())) returnObj.put(REPLY_PAGE,"1");
        }
        return returnObj;
    }
    public String getCurStatus(){
        return Objects.requireNonNull(activityMapper.selectAllActivities().get(0)).getStatus();
    }
}
