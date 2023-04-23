package com.awe.model.vo;

import lombok.Data;

import java.util.List;

@Data
public class TableDefinitionVO {
    /**
     * 库名
     */
    private String dbName;
    /**
     * 表名
     */
    private String tableName;

    /**
     * 表注释
     */
    private String tableComment;

    /**
     * 模拟数据条数
     */
    private Integer mockDataNum;

    /**
     * 列定义信息
     */
    private List<Field> fieldList;

    /**
     * 表单列定义信息
     */
    @Data
    public static class Field {

        /**
         * 字段名
         */
        private String fieldName;

        /**
         * 字段类型
         */
        private String fieldType;

        /**
         * 默认值
         */
        private String defaultValue;

        /**
         * 是否非空
         */
        private boolean notNull;

        /**
         * 注释
         */
        private String comment;

        /**
         * 是否为主键
         */
        private boolean primaryKey;

        /**
         * 是否自增
         */
        private boolean autoIncrement;

        /**
         * 模拟类型（随机、图片、规则、词库）
         */
        private String mockDataType;

        /**
         * 模拟参数
         */
        private String mockDataParams;

        /**
         * 暂时保留
         */
        private String onUpdate;
    }
}
