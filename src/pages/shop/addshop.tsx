import React, { useState, useEffect} from 'react'
import { Tabs, Input, Select , Space, Button, Upload, message, Table, Switch, Modal, Form, Pagination, ConfigProvider } from 'antd';
import styles from '../index.less'
import request from 'umi-request'
import { InboxOutlined , UploadOutlined} from '@ant-design/icons';

const { TextArea } = Input;

const { Dragger } = Upload;

const { Option } = Select;

const { TabPane } = Tabs;

const addshop = () => {
    useEffect(() => {
      request.get('/api/getClass').then((res: any) =>{
        console.log(res)
        res.data.map((item: any,index: any)=>{
            item.key = index+1
        })
        let username1 = res.data.filter((item: any) =>{
            return  item.classLastName  === ''|| item.classLastName === null
        })
         setData1(username1)
    })
    }, [])
    const  callback=((key: any) =>{
        console.log(key)  
      }) 
      const  redomclass = (data: any)=>{
        return  data.map((item:any) =>{
              return(
                 <Option value={item.className} key={item._id}>
                 {item.className}
                </Option>
              )
          })
     }
     const  redomItem = (data: any)=>{
      return  data.map((item:any, index: any) =>{
            return(
              <Form.Item
              label={item.name}
              name={`classList${index+1}`}
              rules={[{ required: true, message: '请输入商品规格!' }]}
              key={index}
            >
                <Input style={{width:300}} />
              </Form.Item>
            )
        })

   }  
     const [value1,setValue1] = useState([])
     const [value2,setValue2] = useState([])
     const [value3,setValue3] = useState([])
     const [value4,setValue4] = useState([])
       const [form] = Form.useForm()
      const onFinishs1 = ((values :any)=>{
             setKey('2')
        //  console.log(values)
          setValue1(values)
      })
      const onFinishs2 = ((values :any)=>{
        setKey('3')
        setValue2(values)
      //  console.log(values)
    })
    const [current,setCurrent] = useState([])
    const onFinishs3 = ((values :any)=>{
      setKey('4')
      setValue3(values)
        //console.log(values)
    })
    const onFinishs4 = ((values :any)=>{
      setValue4(values)
      setKey('5')
        //console.log(values)
    })
    const onFinishs5 = ((values :any)=>{
      request.post('/api/shoplist/addShop',{
        data:{
          shopName:value1.shopName,
          shopPrice:value1.shopPrice,
          className:value1.shopClass1,
          classLastName:value1.shopClass2,
          shopNumber:value1.shopNumber,
          shopImages:value3.shopImage,
          newProduct:false,
          recommend:false,
          seckill:false,
          groupWork:false,
          desc:value2,
          text:value4.shopDesc,
          integral: values.integral
        }
      }).then((res) =>{
        console.log(res)
      })
       // console.log(values)
    })
      const handleChange1 = ((values :any)=>{
        request.get('/api/getClass').then((res: any) =>{
        let username2 = res.data.filter((item: any) =>{
          return  item.classLastName  === values
      })
       
        setData2(username2)
      })
    })
    const props = {
     
    };
    const handleChange2 = ((values :any)=>{
        console.log(values)
    })
    const handleChange3 = ((values :any)=>{
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
       console.log(usernames)
       setCurrent(usernames[0].desc)
       form.resetFields()
    })
        console.log(values)
    })
    const [data1,setData1] = useState([])
    const [data2,setData2] = useState([])
    const [key,setKey] = useState('1')

    return (
        <div style={{margin:30,height:450}}>
            <div className={styles.ts1}>新增商品</div>
     <Tabs defaultActiveKey='1' activeKey={key}  onChange={callback}>
    <TabPane tab="基础设置" key='1'>
      
    <Form name="basic"onFinish={onFinishs1}  >
              <Form.Item label="商品名称" name="shopName"    rules={[{ required: true, message: '请输入商品名称!' }]} >
                <Input style={{width:300}} />
              </Form.Item>
              <Form.Item
                label="商品价格"
                name="shopPrice"
                rules={[{ required: true, message: '请输入商品价格!' }]}
              >
                <Input style={{width:300}} />
              </Form.Item>
              <Form.Item
                label="商品库存"
                name="shopNumber"
                rules={[{ required: true, message: '请输入商品库存!' }]}
              >
                <Input style={{width:300}} />
              </Form.Item>
              <Form.Item
                label="一级分类"
                name="shopClass1"
                rules={[{ required: true, message: '请输入商品一级分类!' }]}
              >
                 <Select style={{ width: 300 }}  placeholder="请选择一级分类" onChange={handleChange1}>
                 {
                     redomclass(data1)
                 }
                </Select>
              </Form.Item>
              <Form.Item
                label="二级分类"
                name="shopClass2"
                rules={[{ required: true, message: '请输入商品二级分类!' }]}
              >
              <Select style={{ width: 300 }}   placeholder="请选择二级分类" onChange={handleChange2}>
              {
                     redomclass(data2)
                 }
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginLeft: 160}}>
                  下一步
          </Button>
              </Form.Item>
            </Form>
    </TabPane>
    <TabPane tab="规格属性" key="2">
    商品模型:
    <Select style={{ width: 280,margin:15 }}  placeholder="请选择商品模型" onChange={handleChange3}>
                 {
                    redomclass(data1)
                 }
                </Select>
    <Form name="basic"onFinish={onFinishs2}  form={form} >
                 {
                  redomItem(current)
                 }
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginLeft: 160}}>
                  下一步
          </Button>
              </Form.Item>
            </Form>
    </TabPane>
    <TabPane tab="媒体设置" key="3">
    <Upload {...props} style={{margin:30}}>
      <Button icon={<UploadOutlined />}>上传图片</Button>
    </Upload>

    <Form name="basic"onFinish={onFinishs3} >
    <Form.Item
                label="图片链接"
                name="shopImage"
                rules={[{ required: true, message: '请输入图片链接!' }]}
              >
                <Input style={{width:300}} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginLeft: 160}}>
                  下一步
          </Button>
              </Form.Item>
            </Form>
    </TabPane>
    <TabPane tab="商品详情" key="4">
    <Form name="basic"onFinish={onFinishs4} >
    <Form.Item
                label="详细信息"
                name="shopDesc"
                rules={[{ required: true, message: '请输入商品详情!' }]}
              >
               <TextArea rows={4} style={{width:300}}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginLeft: 160}}>
                  下一步
          </Button>
              </Form.Item>
            </Form> 
    </TabPane>
    <TabPane tab="积分结算" key="5">
    <Form name="basic"onFinish={onFinishs5} >
    <Form.Item
                label="会员积分"
                name="integral"
                rules={[{ required: true, message: '请输入会员积分!' }]}
              >
               <Input style={{width:300}}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginLeft: 160}}>
                  提交
          </Button>
              </Form.Item>
            </Form> 
    </TabPane>
  </Tabs>
        </div>
    )
}

export default addshop