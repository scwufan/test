import React, { useEffect } from 'react'
import styles from './index.less'
import { useDispatch, useHistory, useLocation, useSelector } from 'umi'

const Shop = () => {
    let dispath= useDispatch()
    let users = useSelector((state: any) =>state.user.users)
    useEffect(() => {
        dispath({
            type:'user/getUser',
            payload:{}
        })
    }, [])
    return (
        <div>
             商品
        </div>
    )
}

export default Shop
