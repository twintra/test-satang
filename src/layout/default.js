
import React from "react";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout"
import DefaultSider from "../components/layout/defaultSider";
import { Button, Col, Row } from "antd";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const DefaultLayout = (props) => {
    const [collapsed, setCollapsed] = React.useState(false)

    const onMenuClick = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <DefaultSider collapsed={collapsed} />
                <Layout>
                    <Header style={{padding:0}}>
                        <Row >
                            <Col >
                                <Button type="ghost" onClick={onMenuClick} style={{ verticalAlign: "middle" }}>
                                    {collapsed? <MenuUnfoldOutlined style={{color:"white"}} />:<MenuFoldOutlined style={{color:"white"}} /> }
                                    
                                </Button>
                            </Col>
                            <Col>
                                <span style={{ color: "white" }}>

                                    App bar
                                </span>
                            </Col>
                        </Row>

                    </Header>


                    <Content

                    >
                        {/* <main style={{ height: "100vh" }}> */}
                        {props.children}
                        {/* </main> */}
                    </Content>


                    <Footer>
                        
                    </Footer>

                </Layout>





            </Layout>

        </>
    )
}
export default DefaultLayout