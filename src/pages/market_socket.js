import { Card, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getCurrency } from "../store/currency/actions";

const socket_uri = 'wss://ws.satangcorp.com/ws/!miniTicker@arr';
let socket = null;
const MarketSocket = (props) => {
    
    
    let { id } = useParams();
    const currency = [
        {
            title: "BTC/THB",
            value: "BTC_THB",
        },
        {
            title: "BUSD/THB",
            value: "BUSD_THB",
        },
        {
            title: "USDT/THB",
            value: "USDT_THB",
        },
    ]

    const [isLoading, setIsLoading] = useState(false);
    const [socketData, setSocketData] = useState([])

    useEffect(() => {
        // console.log("ID changed", id);
        socket = new WebSocket(socket_uri);
        setIsLoading(true)
        socket.addEventListener("open", (e) => {
            setIsLoading(false);
            // socket.send("Hello!")

        })
        socket.addEventListener("close", (e) => {
            // console.log("socket closed", e);
        })
        socket.addEventListener("message", (e)=> {
            if(!e.data) return
            const data = JSON.parse(e.data);
            setSocketData(data)
        })
        return () => {
            socket.close();
        }
    }, [id])
    
    const getPrice = () => {
        const price = socketData.find(value => value.s === id.toLocaleLowerCase())
        if (!price ) return "-";
        return price.c
    }

    const getVolume = () => {
        const price = socketData.find(value => value.s === id.toLocaleLowerCase())
        if (!price ) return "-";
        return formattedString(price.q)
    }
    const formattedString = (value) => {
        try {
            const float = parseFloat(value)
            const formattedString = float.toLocaleString();
            return formattedString;
        } catch (error) {
            return "invalid number"
        }
    }

    return (
        <>
            <Row style={{ height: "100%" }} align={"middle"}>

                <Col xs={{ span: 24 }} md={{ span: 12 }} className="p-2">
                    <Row >
                        {
                            currency.map((value, index) => (

                                <Col key={index} xs={{ span: 8 }} md={{ span: 24 }}>
                                    <NavLink style={{ width: "100%", }} to={`/market_socket/${value.value}`}>
                                        <Card style={{ width: "100%", textAlign: "center", }} bodyStyle={{ paddingLeft: "5px", paddingRight: "5px", textOverflow:"ellipsis", overflow: "hidden", whiteSpace:"nowrap"}}>
                                            <span style={{textOverflow:"ellipsis", overflow: "hidden", whiteSpace:"nowrap"}}>
                                                {value.title}
                                            </span>
                                        </Card>

                                    </NavLink>
                                </Col>


                            ))
                        }
                    </Row>

                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} className="p-2">

                    <Card className="py-5"  >

                        <Spin spinning={isLoading} tip="Loading...">
                            <Col>
                                <Row>
                                    <span className="currency-display overflow-ellipsis">
                                        {currency.find(value => value.value === id).title}

                                    </span>

                                </Row>
                                <Row>
                                    <span className="price-display overflow-ellipsis">

                                        

                                        {getPrice()}
                                    </span>
                                </Row>
                                <Row>
                                    <span className="volume-display overflow-ellipsis">

                                        Volume: {getVolume()}

                                    </span>
                                </Row>
                            </Col>

                        </Spin>
                    </Card>

                </Col>
            </Row>
            {/* <Loading loading = {isLoading} /> */}
            

        </>
    );
}

export default MarketSocket;