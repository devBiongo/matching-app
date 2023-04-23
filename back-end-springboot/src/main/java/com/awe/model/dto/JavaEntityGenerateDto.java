package com.awe.model.dto;

import lombok.Data;

import java.util.List;

/**
 * Java 实体生成封装类
 *
 * @author BIonGo
 */
@Data
public class JavaEntityGenerateDto {

    /**
     * 类名
     */
    private String className;

    /**
     * 类注释
     */
    private String classComment;

    /**
     * 列信息列表
     */
    private List<FieldDTO> fieldList;

    /**
     * 列信息
     */
    @Data
    public static class FieldDTO {
        /**
         * 字段名
         */
        private String fieldName;

        /**
         * Java 类型
         */
        private String javaType;

        /**
         * 注释（字段中文名）
         */
        private String comment;
    }

}
