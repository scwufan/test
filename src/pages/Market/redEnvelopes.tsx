import React, { useEffect, useState } from 'react'
import { Input, Space, Button, Table, Select, Switch, Modal, Form, Pagination, ConfigProvider, Tag } from 'antd';
import zhCn from 'antd/es/locale/zh_CN'
import request from 'umi-request';
import styles from '../index.less';
import { useDispatch, useHistory, useLocation, useSelector } from 'umi';

const { Option } = Select;
const { Search } = Input;
const RedEnvelopes = () => {
    const { Column, ColumnGroup } = Table;
    let history = useHistory()
    let [form] = Form.useForm()
    let zh = zhCn
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    let onSearch = (values: any) => {
       console.log(users)
      console.log(values)
   
    }
    let dispatch = useDispatch()
    let [query, setQuery] = useState("")
    let [pagesize, setPagesize] = useState(5)
    let [pagenum, setPagenum] = useState(1)
    let  showModal = () => {
        setShow2(true);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields()
    };
    const handleCancel1 = () => {
      setShow1(false);
    };
    const handleCancel2 = () => {
        setShow2(false);
      };
    let onchang = (user: any, event: any) => {
  
    }
    //删除分类
    let todel = (users: any) => {
        request.post('/api/class/deleteClass',{
            data:{
                id: users._id,
                className: users.className,
                classListName: users.classListName
            }
        })
        request.get('/api/getClass').then((res: any) =>{
            console.log(res)
            res.data.map((item: any,index: any)=>{
                item.key = index+1
            })
            let username = res.data.filter((item: any) =>{
                return  item.classLastName  === ''
            })
            setUsers(res.data)
            setUsers1(username)
        })    
    }
    let [form1, setFrom1] = useState('')
    let [form2, setFrom2] = useState('')
    //编辑点击
    let toeidit = (users: any) => {
      console.log(users)
      form.setFieldsValue({
        className: users.className,
      })
      setFrom1(users._id)
      setFrom2(users.classListName)
      console.log(form2)
      setShow1(true)
  
    }
    //编辑确认
    let onFinishs = (values: any) => {
      setShow1(false);
      if(form2 === null){
        request.post('/api/class/changeClass',{
            data:{
                id: form1,
                className: values.className,
                classLastName: "",
                desc:[]
            }
        })
      }else{
        request.post('/api/class/changeClass',{
            data:{
                id: form1,
                className: values.className,
                classLastName: form2,
                desc:[]
            }
        }) 
      }
     
    request.get('/api/getClass').then((res: any) =>{
        console.log(res)
        res.data.map((item: any,index: any)=>{
            item.key = index+1
        })
        let username = res.data.filter((item: any) =>{
            return  item.classLastName  === ''
        })
       // console.log(username)
        setUsers(res.data)
        setUsers1(username)
    })
    }
    let onFinishs1 = (values: any) => {
        console.log(values)
        console.log(form1)
        setShow2(false);
        if(values.classLastName){
            request.post('/api/class/addClass',{
                data:{
                    className: values.className,
                    classLastName: values.classLastName
                }
            })
        }else{
            request.post('/api/class/addClass',{
                data:{
                    className: values.className,
                    classLastName: ''
                }
            })  
        }
        request.get('/api/getClass').then((res: any) =>{
            console.log(res)
            res.data.map((item: any,index: any)=>{
                item.key = index+1
            })
            let username = res.data.filter((item: any) =>{
                return  item.classLastName  === ''
            })
           // console.log(username)
            setUsers(res.data)
            setUsers1(username)
        })
      
        
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
    let handleChange1 =(values: any) =>{
       console.log(values)
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
    //渲染选择上级分类
    const  redomclass = (data: any)=>{
       return  data.map((item:any) =>{
             return(
                <Option value={item.className} key={item._id}>
                {item.className}
               </Option>
             )
         })
    }
    const [current,setCurrent] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [users,setUsers] = useState([])
    const [users1,setUsers1] = useState([])
    useEffect(() => {
       request.get('/api/getClass').then((res: any) =>{
           console.log(res)
           res.data.map((item: any,index: any)=>{
               item.key = index+1
           })
           let username = res.data.filter((item: any) =>{
               return  item.classLastName  === ''|| item.classLastName === null
           })
          // console.log(username)
           setUsers(res.data)
           setUsers1(username)
       })
    }, [])

    return (
        <div>
        <div  style={{height:30}}></div>
    <div className={styles.nav1}>
    <div style={{ width: 50 }}>
      </div>
      <div style={{ width: 50 }}>
      </div>
      <Button value="large" size='large' onClick={showModal} type="primary">添加分类</Button>
    </div>
    <div>
      <Table dataSource={users.slice((current - 1)*pageSize, current*pageSize)} pagination={false}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="分类名称" dataIndex="className" key="className" />
        <Column title="分类等级" dataIndex="classLastName" key="className" 
            render={(classLastName) => (
              // console.log(level),
              classLastName === ''||classLastName === null ? <Tag  key={classLastName} color='#f50'>一级</Tag> :<Tag  key={classLastName} color="#87d068">二级</Tag> 
            
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
            label="分类名称"
            name="className"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{marginLeft:50}} htmlType="submit">
              确认
      </Button>
          
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="添加商品" visible={show2} footer={[]} onCancel={handleCancel2}>
        <Form
          form={form}
          name="basic"
          onFinish={onFinishs1}
        >
          <Form.Item
            label="分类名称"
            name="className"
          >
            <Input   style={{ width: 300 }} />
          </Form.Item>
          <Form.Item
            label="上级分类"
            name="classLastName"
          >
            <Select style={{ width: 300 }}   placeholder="请选择一级分类" onChange={handleChange1}>
                 {
                     redomclass(users1)
                 }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginLeft:50}}>
              确认
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

export default RedEnvelopes
