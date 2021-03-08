import React,{ useState} from 'react'
import styles from './index.less'
import { Button,Modal } from 'antd'
import  request from 'umi-request'
const index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [time, setTime] = useState(new Date(new Date().toLocaleDateString() + ' 00:00:00').getTime());

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onfish = () => {

    request.get('http://192.168.101.190:7001/shoplist/getShop')
    .then(res =>{
      console.log(res)
    }).catch(err =>{
      console.log(err)
    })
  };
  return (
    //<div className={`a ${styles.blue}`}>
    <div style={{width:'100%',height:600,fontSize:20,fontWeight:'bolder', flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center'}}>
           <div style={{  margin:20,fontSize:20,fontWeight:'bolder',display:'flex', justifyContent:'center',alignItems:'center'}}>欢迎登录后台管理系统 </div>
        <img src="http://www.dajunshi.cn/logo/images/case2.gif" alt="" style={{width:"85%",height:400,borderRadius:10}} />
    </div>
  )
}

export default index

