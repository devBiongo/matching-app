package com.awe.model.vo;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import java.util.Date;

@Data
public class EventInfoVO {

    private String eventId;

    @NotBlank
    private String realName;

    @NotBlank
    private String annualIncome;

    @NotBlank
    private String myBirthday;

    @NotBlank
    private String birthplace;

    @NotBlank
    private String finalEducation;

    @NotBlank
    private String visaType;

    @NotBlank
    private String wechatNum;

    @NotBlank
    private String gender;

    @NotBlank
    private String height;

    @NotBlank
    private String maritalStatus;

    @NotBlank
    private String occupation;

    @NotBlank
    private String phoneNum;

    @NotBlank
    private String privateFlag;

    @NotBlank
    private String avatarId;

    @NotBlank
    private String residence;

    @NotBlank
    private String selfIntroduction;

    private String requireAgeFrom;

    private String requireAgeTo;

    private String requireAnnualIncome;

    private String requireFinalEducation;

    private String requireHeightFrom;

    private String requireHeightTo;

    private String requireMaritalStatus;

    private String requireNuisance;
}
