package com.awe.model.entity;

import lombok.Data;

@Data
public class FinalMatchDO {
    private String initiatorId;
    private String targetId;
    private String replyFlag;
    private String round;
}
