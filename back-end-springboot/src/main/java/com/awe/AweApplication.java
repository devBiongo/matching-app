package com.awe;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@MapperScan("com.awe.mapper")
@SpringBootApplication
public class AweApplication{

    public static void main(String[] args) {
        SpringApplication.run(AweApplication.class, args);
    }
}
