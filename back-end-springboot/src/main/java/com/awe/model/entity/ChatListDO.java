package com.awe.model.entity;

import lombok.Data;

import java.util.Date;

@Data
public class ChatListDO {
    private String initiatorId;
    private String targetId;
    private String replyFlag;
    private Date updateTime;
}
