package com.f.ldx.common;

public class SaveException extends Exception {
    private String msg;
    public SaveException(String msg){
        super(msg);
        this.msg = msg;
    }


}
