import React, { useEffect, useState } from 'react'
import { Input,  Space, Button, Table, Select, Switch, Modal, Form, Pagination, ConfigProvider, Tag } from 'antd';
import zhCn from 'antd/es/locale/zh_CN'
import request from 'umi-request';
import styles from '../index.less';
import { useDispatch, useHistory, useLocation, useSelector } from 'umi';
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';


const { Option } = Select;
const { Search } = Input;
const ShopParameter = () => {
    const { Column, ColumnGroup } = Table;
    let history = useHistory()
    const [form] = Form.useForm()
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
      form.resetFields()
        setShow2(true);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields()
    };
    const handleCancel1 = () => {
      setShow1(false);
    };
    const handleCancelAdd = () => {
      setShow2(false);
    };
    const onFinishAdd = (values: any) => {
      console.log(values)
      request.post('/api/class/changeClass',{
        data:{
            id: users2._id,
            className: users2.className,
            classListName:users2.classListName,
            desc: values.desc
        }
      })
      setShow2(false)
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
                classListName: ""
            }
        })
      }else{
        request.post('/api/class/changeClass',{
            data:{
                id: form1,
                className: values.className,
                classListName: form2
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
    let handleChange1 =(values: any) =>{
        request.get('/api/getClass').then((res: any) =>{
          
            res.data.map((item: any,index: any)=>{
                item.key = index+1
            })
            let usernames = res.data.filter((item: any) =>{
                return  item.className  === values
            })
           let use  =  usernames[0].desc.map((item1: any,index1: any)=>{
             item1.key = index1+1
       })  
          setUsers2(usernames[0])
           console.log(usernames)
           setCurrent(usernames[0].desc)
        })
    }
    let handleChange4 =(values: any) =>{
      request.get('/api/getClass').then((res: any) =>{
          let usernames = res.data.filter((item: any) =>{
              return  item.className  === values
          })
         let use  =  usernames[0].desc.map((item1: any,index1: any)=>{
           item1.key = index1+1
     })  
        setUsers2(usernames[0])
         console.log(users2)

      })
  }
    let showTotal =(total: any) =>{
        console.log(total)
     }
    let onShowSizeChange = (current: any, pageSize: any) => {
       
      console.log(current, pageSize);
      
    }
    let onchanges = (current: any, pageSize: any) => {
       
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
    const [current,setCurrent] = useState([])
    const [users,setUsers] = useState([])
    const [users1,setUsers1] = useState([])
    const [users2,setUsers2] = useState([])
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
        <div  style={{height:60,marginLeft:40,fontSize:16}}>
             选择商品分类：
             <Select style={{ width: 300 }}   placeholder="请商品分类" onChange={handleChange1}>
                 {
                    redomclass(users1)
                 }
            </Select>
        </div>
    <div className={styles.nav1}>
    <div style={{ width: 50 }}>
      </div>
      <div style={{ width: 50 }}>
      </div>
      <Button value="large" size='large' onClick={showModal} type="primary">添加商品规格</Button>
    </div>
    <div>
      <Table dataSource={current} pagination={false}>
        <Column title="#" dataIndex="key" key="key" />
        <Column title="规格名称" dataIndex="name" key="name" />
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
      <div  style={{height:60,marginLeft:40,fontSize:16}}>
             选择商品分类：
             <Select style={{ width: 300 }}   placeholder="请商品分类" onChange={handleChange4}>
                 {
                    redomclass(users1)
                 }
            </Select>
        </div>
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinishAdd} autoComplete="off">
      <Form.List name="desc">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="规格"
                  name={[field.name, 'name']}
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[{ required: true, message: '请输入模型规格' }]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                添加规格
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item>
    </Form>
      </Modal>
      
    </div>
    {/* <div>
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
      </div> */}
  </div>                         
    )
}


export default ShopParameter
