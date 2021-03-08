import React, { FC , useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import request from 'umi-request';
import styles from '../index.less'
import { useLocation, useHistory } from 'react-router-dom';
import * as Icons from '@ant-design/icons'


interface Props{
    children: React.ReactNode
}
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const rootSubmenuKeys = ['订单', '活动', '管理','商品', '用户', '营销'];

const Layouts:  FC<Props> = (props: Props) => {
    const [menus,setmenus] = useState([])
    const [openKeys, setOpenKeys] = React.useState(['']);

    const onOpenChange = (keys: any) => {
      const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    }
    let location = useLocation()
    let history = useHistory()
    let pathname = location.pathname
    // 拿到父级菜单的路径
    let subPath = pathname
 useEffect(() => {
   request.get('/api/navSide').then((res: any) =>{
              console.log(res)
              
              setmenus(res.data)
   })
 }, [])
 //渲染侧边栏图标
 const toexit=()=>{
    localStorage.removeItem('user')
    history.push('/login')
 }
 const [username,setName] = useState(localStorage.getItem('user'))
 const user =(data: any)=>{
   return   JSON.parse(data)
 }
 const renderIcon = (name: string) => {
  return React.createElement((Icons as any) && Icons[name], {
    style: {
      fontSize: '16px'
    }
  })
}
 let clickItem = (key: any) => {
      console.log(key)
      history.push(key.key)
   }
   //递归渲染侧边栏
    const renderMenu = (data: any) => {
        return data.map( (item: any) => {
          if (item.children && item.children.length) {
            return (
              <SubMenu icon={renderIcon(item.icon)}  title={item.name}  key={item.name} >
                {
                  renderMenu(item.children)
                }
              </SubMenu>
            )
          }
          return (
            <Menu.Item  icon={renderIcon(item.icon)} title={item.name} key={item.path}>
              {
                item.name
              }
            </Menu.Item>
          )
        })
      }
    return (
        
        <div>
    <Layout  className={styles.blue1} >
      <Header style={{backgroundColor:'white'}}>
        <div style ={{display:'flex'}}>
              <img src="http://www.dajunshi.cn/logo/images/case2.gif" alt="" style={{width:120,height:65}} />
              <div style={{marginLeft:50,fontSize:17,textIndent:50,fontWeight:'bold'}}>欢迎{user(username).username}登陆后台管理系统 </div>
              <div  style={{marginLeft:80, marginTop:20 ,fontSize:17,textIndent:50,fontWeight:'bold',textAlign:'center'}}>
              <iframe
          className='ifame'
            scrolling="no"
            src="https://tianqiapi.com/api.php?style=tm&skin=pitaya"
            width="170"
            height="60"
            frameBorder="0"
          ></iframe>
              </div>
              <div onClick={toexit} style={{marginLeft:400,fontSize:17,textAlign:'center',fontWeight:'bold'}}>退出</div>
        </div>
      </Header>
      <Layout>
        <Sider style={{backgroundColor:'white'}}>
        <Menu 
         mode="inline"
         theme='light'
         openKeys={openKeys}
         onOpenChange={onOpenChange}
         defaultSelectedKeys={[pathname]}
         defaultOpenKeys={[subPath]}
         onClick={clickItem}
        >
          {renderMenu(menus)}
      </Menu>
        </Sider>
        <Content >
            <div className={styles.tost}>
            {props.children}
                </div> 
          
        </Content>
      </Layout>
    </Layout>
            
        </div>
    )
}

export default Layouts
