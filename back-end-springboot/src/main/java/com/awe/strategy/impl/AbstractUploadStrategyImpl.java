package com.awe.strategy.impl;

import com.awe.exception.ServiceException;
import com.awe.strategy.UploadStrategy;
import com.awe.utils.FileUtil;
import com.awe.utils.SecurityUtils;
import com.awe.utils.uuid.IdUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public abstract class AbstractUploadStrategyImpl implements UploadStrategy {

    @Override
    public String uploadFile(MultipartFile file, String path) {
        try {
            String extName = FileUtil.getExtName(file.getOriginalFilename());
            String fileName = SecurityUtils.getUsername() + "_avatar" + extName;
            upload(path, fileName, file.getInputStream());
            return path + fileName;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ServiceException("文件上传失败");
        }
    }

    @Override
    public String uploadFile(String fileName, InputStream inputStream, String path) {
        try {
            upload(path, fileName, inputStream);
            return getFileAccessUrl(path + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ServiceException("文件上传失败");
        }
    }

    public abstract Boolean exists(String filePath);

    public abstract void upload(String path, String fileName, InputStream inputStream) throws IOException;

    public abstract String getFileAccessUrl(String filePath);

}
