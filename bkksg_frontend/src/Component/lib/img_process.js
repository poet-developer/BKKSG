import axios from 'axios'
import { useNavigate } from "react-router-dom";



function sendImgToServer(file){
     let formData = new FormData();
     formData.append('imgInfo', file)
     const config = {
          headers: {'Content-type': 'multipart/form-data'}
      }
          axios.post('/admin/axios_process', formData,config)
          .then('이미지 업로드')
          .catch('이미지 업로드 실패');
     }

export default sendImgToServer