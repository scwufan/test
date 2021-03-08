import React, { useState , useEffect} from 'react'
import { Card , Form ,Button, Input, Checkbox} from 'antd'
import styles from '../index.less'
import { UserOutlined, WomanOutlined,ToolOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router'
import request from 'umi-request'


const Login = () => {
  
  let [form] = Form.useForm()
  const history = useHistory()
  const [htnl, sethtnl] = useState('')
 const onFinish = (values: any) => {
      request.post('/api/user/login',{
        data:{
          username: values.username,
          password: values.password,
          code: values.code
        }
      }).then((res: any) =>{
                   console.log(res)
                   console.log(values)
                  if(res.code === 200){
                    localStorage.setItem('user',JSON.stringify(values))            
                   history.push('/')
                  }
                   
      })
          
    };
    useEffect(() =>{
      request.get('/api/captcha').then((res: any) =>{
           sethtnl(res)
          //  console.log(res)
      })
      form.setFieldsValue({
        username: 'admin',
        password: '123456'
      })
    }, [])
    return (
        <div  className={styles.blue}>
          <div className={styles.flex}>
        <Card title="" bordered={false} style={{ width:380,height:450 }} className={ styles.color}>
          <div style={{ width: 370,height:120}} className={styles.flex1} >
            <img src="https://demo.careyshop.cn/static/admin/img/logo_100.18c454b3.png" alt="" style={{ width: 100,height:100}}/>
          </div>
          <div style={{ width: 370,height:280}} className={styles.pt} >
          <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
    >
            <Form.Item name="username">
        <Input allowClear placeholder="请输入用户名" prefix={<UserOutlined />} className={styles.ipt} />
      </Form.Item>
      <Form.Item name="password">
          <Input.Password allowClear placeholder="请输入密码" prefix={<WomanOutlined />} className={styles.ipt} />
          </Form.Item>
          <Form.Item name="code">
          <div className={styles.flex2}>
            <div>
            <Input allowClear placeholder="请输入验证码" prefix={<ToolOutlined />} className={styles.ipts} />
            </div>
            <div dangerouslySetInnerHTML={{__html:htnl}}>
   
            </div>
          </div>
          </Form.Item>
          <Form.Item >
          <Checkbox>记住账号密码</Checkbox>
          </Form.Item>
          <Form.Item >
          <Button type='primary' size='large' className={styles.ipt2}  htmlType="submit">登录</Button>
          </Form.Item>
          </Form>
          </div>
         
        </Card>
        </div>
    </div>
    )
  }

export default Login
