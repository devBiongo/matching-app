package com.awe.model.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class ActivityDO {

    @TableId
    private String activityId;

    private String organizer;

    private String orgDate;

    private String orgPlace;

    private String regMaleNum;

    private String regFemaleNum;

    private String attendMaleNum;

    private String attendFemaleNum;

    private String handInHandNum1;

    private String handInHandNum2;

    private String handInHandNum3;

    private String handInHandNum4;

    private String handInHandNumAll;

    private String status;

    private Date createTime;

    private Date updateTime;
}
