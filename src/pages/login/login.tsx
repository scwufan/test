import React from 'react'
import { Card , Form ,Button, Input, Checkbox} from 'antd'
import styles from '../index.less'

const Login = () => {
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return (
        <div  className={styles.blue}>
          <div className={styles.flex}>
        <Card title="" bordered={false} style={{ width: 500,height:300 }}>
        <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名:"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码:"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>

        </Card>
        </div>
    </div>
    )
  }

export default Login
