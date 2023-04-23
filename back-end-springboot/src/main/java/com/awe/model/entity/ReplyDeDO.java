package com.awe.model.entity;

import lombok.Data;

@Data
public class ReplyDeDO {

    private String initiatorId;
    private String targetId;
    private String message;
    private String reply;
    private String avatarId;
    private String realName;
    private String gender;
}
