package com.awe;

import com.awe.model.vo.LoginVO;

import java.util.Objects;
import java.util.Optional;

public class demo {

    public static void main(String[] args) {
        if(false){
            System.out.println(123);
        }else if(true){
            System.out.println(321);
        }
    }

    public static LoginVO  createUser(){
        System.out.println(123);
        return new LoginVO();
    }
}
