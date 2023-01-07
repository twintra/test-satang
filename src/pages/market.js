import { Button, Card, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Loading from "../components/common/loading";
import { getCurrency } from "../store/currency/actions";

const Market = (props) => {
    let dispatch = useDispatch();
    let store = useStore()
    let currentStore;

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

    const [storeValue, setStoreValue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        store.subscribe(onStoreChange)
        dispatch(getCurrency(id));

        const interval = setInterval(() => {
            dispatch(getCurrency(id));
        }, 5000);
        return () => clearInterval(interval);
    }, [id])




    const onStoreChange = () => {
        let prevStore = currentStore;
        const { CurrencyReducer, } = store.getState()
        currentStore = CurrencyReducer;
        const { values, loading } = currentStore;
        if (prevStore !== currentStore) {
            setStoreValue(values);
            setIsLoading(loading);
        }
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
                                    <NavLink style={{ width: "100%", }} to={`/market/${value.value}`}>
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

                                        {storeValue.lastPrice ?? "-"}
                                    </span>
                                </Row>
                                <Row>
                                    <span className="volume-display overflow-ellipsis">

                                        Volume: {storeValue.volume ? formattedString(storeValue.volume) : "-"}

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

export default Market;