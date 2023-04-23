package com.awe.model.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class UserEventInfoMixDO implements Serializable {

    private static final long serialVersionUID = 1L;
    /**
     * 用户账号
     */
    private String username;

    /**
     * 帐号状态（0正常 1停用）
     */
    private String status;

    /**
     * 活动番号
     */
    @TableField("event_id")
    private String eventId;

    @TableField("real_name")
    private String realName;

    private String annualIncome;

    private Date birthday;

    private String birthplace;

    @TableField("final_education")
    private String finalEducation;

    private String visaType;

    private String wechatNum;

    private String gender;

    private String height;

    private String maritalStatus;

    private String nuisance;

    private String occupation;

    private String phoneNum;

    private String isPrivate;

    private String avatarId;

    private String residence;

    private String selfIntroduction;

    private String requirement;
}
