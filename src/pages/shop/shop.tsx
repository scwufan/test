import React, { useEffect, useState } from 'react'
import { Input, Space, Button, Table, Switch, Modal, Form, Pagination, ConfigProvider, Tag } from 'antd';
import zhCn from 'antd/es/locale/zh_CN'
import request from 'umi-request';
import styles from '../index.less';
import { useDispatch, useHistory, useLocation, useSelector } from 'umi';


const { Search } = Input;
const Shop = () => {
    const { Column, ColumnGroup } = Table;
    let history = useHistory()
    let [form] = Form.useForm()
    let zh = zhCn
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [show1, setShow1] = useState(false);
    let onSearch = (values: any) => {
       console.log(users)
      console.log(values)
   
    }
    let dispatch = useDispatch()
    let [query, setQuery] = useState("")
    let [pagesize, setPagesize] = useState(5)
    let [pagenum, setPagenum] = useState(1)
    let  showModal = () => {
         history.push('/addshop')
    };
    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields()
    };
    const handleCancel1 = () => {
      setShow1(false);
    };
    let onchang = (user: any, event: any) => {
  
    }
    let todel = (users: any) => {
    
    }
    let [form1, setFrom1] = useState([])
    let toeidit = (users: any) => {
      console.log(users)
      form.setFieldsValue({
        goods_name: users.goods_name,
        goods_price: users.goods_price,
        goods_number: users.goods_number,
        goods_weight: users.goods_weight
      })
      setFrom1(users)
      setShow1(true)
  
    }
    let onFinishs = (values: any) => {
      console.log(values)
      console.log(form1)
      setShow1(false);
      //form.resetFields()
      //putuserSubmit
    }
  let  add0 = (m: any) => {
      return m < 10 ? '0' + m : m;
  }
  // 将时间戳转换成日期
  let formatDate = (timeStamp: any) => {
      let time = new Date(timeStamp),
          y = time.getFullYear(),
          m = time.getMonth() + 1,
          d = time.getDate(),
          h = time.getHours(),
          mm = time.getMinutes(),
          s = time.getSeconds();
  
      return y + '-' +add0(m) + '-' + add0(d) + ' ' +add0(h) + ':' +add0(mm) + ':' + add0(s);
  }
    let onFinish = (values: any) => {
     
      setIsModalVisible(false);
      form.resetFields()
    }
    let showTotal =(total: any) =>{
       console.log(total)
    }
    let onShowSizeChange = (current: any, pageSize: any) => {
      setCurrent(current)
      setPageSize(pageSize)
      console.log(current, pageSize);
      
    }
    let onchanges = (current: any, pageSize: any) => {
      setCurrent(current)
      setPageSize(pageSize)
      console.log(current, pageSize)
    
    }
    const [current,setCurrent] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [users,setUsers] = useState([])
    useEffect(() => {
     request.get('/api/shoplist/getShop').then((res: any) =>{
         res.data.map((item: any,index: any) =>{
             item.key= index+1
         })
         console.log(res)
         setUsers(res.data)
     })
    }, [])
    return (
        <div>
            <div  style={{height:30}}></div>
        <div className={styles.nav1}>
        <div style={{ width: 50 }}>
          </div>
          <Space direction="vertical">
            <Search placeholder="请输入搜索内容" onSearch={onSearch} size='large' enterButton style={{
              width: 300,
  
            }} />
  
          </Space>
          <div style={{ width: 50 }}>
          </div>
          <Button value="large" size='large' onClick={showModal} type="primary">添加商品</Button>
        </div>
        <div>
          <Table dataSource={users.slice((current - 1)*pageSize, current*pageSize)} pagination={false}>
            <Column title="#" dataIndex="key" key="key" />
            <Column title="商品名称" dataIndex="shopName" key="shopName" />
            <Column title="商品价格" dataIndex="shopPrice" key="shopPrice" />
            <Column title="商品数量" dataIndex="shopNumber" key="shopNumber" 
            />
            <Column
              title="创建时间"
              dataIndex="add_time"
              key="add_time"
              render={(add_time) => (
                
                formatDate(add_time)
                
              )}
            />
            <Column
              title="操作"
              key="goods_id"
              render={(users) => (
  
                <Space size="middle">
                  <Button  onClick={() => toeidit(users)} type="primary">编辑</Button>
                  <Button onClick={() => todel(users)} type="primary" >删除</Button>
                </Space>
              )}
            />
          </Table>,
           </div>
        <div>
          <Modal title="编辑商品" visible={show1} footer={[]} onCancel={handleCancel1}>
            <Form
              form={form}
              name="basic"
              onFinish={onFinishs}
            >
              <Form.Item
                label="商品名称"
                name="goods_name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品价格"
                name="goods_price"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品数量"
                name="goods_number"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="商品重量"
                name="goods_weight"
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  确认
          </Button>
                <Button  onClick={handleCancel1} >
                  取消
          </Button>
              </Form.Item>
            </Form>
          </Modal>
          
        </div>
        <div>
        <ConfigProvider locale={zh}>
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={0}
            total={users.length}
            showQuickJumper
            defaultPageSize={5}
            pageSizeOptions={['2', '5', '10', '20']}
            onChange={onchanges}
          />
        </ConfigProvider>
        </div>
      </div>
    )
}

export default Shop
