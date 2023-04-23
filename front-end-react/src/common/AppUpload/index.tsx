import React, { useState } from 'react';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import SessionStorage from '@/utils/SessionUtil';

const AppUpload: any = ({setPhotoPath,disabled,label}:any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if(newFileList[0]&&newFileList[0].response){
      if(newFileList[0].response.code === 200){
        setPhotoPath(newFileList[0].response.photoPath);
        message.success("上传成功");
      }else{
        message.error(newFileList[0].response.msg);
      } 
    }
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="http://43.163.199.224/api/photo/upload"
        headers={{Authorization: SessionStorage.get('event-token')}}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={1}
        disabled={disabled===undefined?false:disabled}
      >
        {fileList.length === 0 && (label?label:'+ Upload')}
      </Upload>
    </ImgCrop>
  );
};

export default AppUpload;