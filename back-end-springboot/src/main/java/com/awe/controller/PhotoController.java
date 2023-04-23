package com.awe.controller;

import com.awe.enums.FilePathEnum;
import com.awe.model.other.AjaxResult;
import com.awe.strategy.context.UploadStrategyContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 图片上传
 *
 * @author BionGo
 */
@RestController
@RequestMapping("/photo")
public class PhotoController {
    @Autowired
    private UploadStrategyContext uploadStrategyContext;

    @PostMapping("/upload")
    public AjaxResult saveFileToOss(MultipartFile file) {
        String photoPath = uploadStrategyContext.executeUploadStrategy(file, FilePathEnum.PHOTO.getPath());
        AjaxResult ajax = AjaxResult.success("上传成功");
        ajax.put("photoPath",photoPath);
        return ajax;
    }
}
