import React,{ useState} from 'react'
import styles from './index.less'
import { Button,Modal } from 'antd'
import  request from 'umi-request'
const index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <div className={styles.blue}>
      <Button type="primary" onClick={onfish}>
        点击
      </Button>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default index

