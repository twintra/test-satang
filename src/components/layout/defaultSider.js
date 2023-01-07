import React, { useEffect } from "react";
import { Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Menu, Row } from "antd"
import { RiseOutlined, } from '@ant-design/icons';
import LogoMin from "./../../assets/images/satang_logo_min.png"
import LogoFull from "./../../assets/images/satang_logo_full.png"

const menusList = [
    {
        icon: RiseOutlined,
        label: "Market", 
        href: "market"
    },
    {
        icon: RiseOutlined,
        label: "Market Socket",
        href: "market_socket"
    }
]
const menus = menusList.map((item, index) => {
    const key = String(index + 1);
    return {
        key: `menu${key}`,
        icon: React.createElement(item.icon),
        label: item.label,
        href : item.href
        // children: new Array(4).fill(null).map((_, j) => {
        //     const subKey = index * 4 + j + 1;
        //     return {
        //         key: subKey,
        //         label: `option${subKey}`,
        //     };
        // }),
    };
});


const DefaultSider = (props) => {
    const [currentMenu, setCurrentMenu] = React.useState("menu1")

    const onSelectMenu = (e) => {
        setCurrentMenu(e.key);
        const href ="/" + menus.find(value => value.key === e.key).href + "/BTC_THB"
        window.location.href = href;
    }

    useEffect(()=>{
        const pathname = window.location.pathname.split("/");
        console.log(pathname);
        const target = menus.find(value=> pathname.findIndex(v =>v===value.href) !== -1)
        setCurrentMenu(target.key)
    },[])

    return (
        <Sider trigger={null} collapsible collapsed={props.collapsed} style={{ background: "white" }} >
            <Header style={{ paddingTop: "12px", paddingLeft: `${props.collapsed ? "20px" : "41px"}` }}>
                <Row>
                    {props.collapsed ? <img alt="" src={LogoMin} height="40px" ></img> : <img alt="" src={LogoFull} height="40px" ></img>}
                </Row>


            </Header>
            <Menu
                selectedKeys={[currentMenu]}
                onClick={onSelectMenu}
                items={menus}
            />
        </Sider>

    )
}

export default DefaultSider