package com.f.ldx.common;

public class KMException extends Exception {
    private String msg;
    public KMException(String msg){
        super(msg);
        this.msg = msg;
    }


}
