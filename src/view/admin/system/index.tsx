import { Card, Col, Descriptions, DescriptionsProps, Row, Switch, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { myFetch } from "../../../utils/fetch";

export const SystemInfo = () => {
    type SystemInfo = {
        systemName: string
        version: string
        commitID: string
        buildTime: string
        goVersion: string
    }

    type MonitorInfo = {
        cpuCount: number
        usedMemory: number
        totalMemory: number
        usedDisk: number
        totalDisk: number
        cpuPercent: number
        runningTime: number
    }
    const [systemInfo, setSystemInfo] = useState<SystemInfo>({ systemName: "", version: "", commitID: "", buildTime: "", goVersion: "" })

    const [monitorInfo, setMonitorInfo] = useState<MonitorInfo>({ cpuCount: 0, usedDisk: 0, usedMemory: 0, totalDisk: 0, totalMemory: 0, cpuPercent: 0, runningTime: 0 })
    const getVsersion = () => {
        myFetch({ url: "/admin/version", options: { method: "GET" } }).then((data) => {
            console.log(data)
            setSystemInfo(data.body.result)
        })
    }
    const getMonitor = () => {
        myFetch({ url: "/admin/monitor", options: { method: "GET" } }).then((data) => {
            console.log(data)
            setMonitorInfo(data.body.result)
        })
    }
    useEffect(() => {
        getVsersion()
        getMonitor()
    }, [])

    const getCpuPercent = (count: number) => {
        if (count < 60) {
            return <Tag color="green">{count.toFixed(2)}%</Tag>
        }
        if (count >= 60 && count <= 80) {
            return <Tag color="yellow">{count.toFixed(2)}%</Tag>
        }
        if (count > 80) {
            return <Tag color="red">{count.toFixed(2)}%</Tag>
        }
    }
    const descriptionItems: DescriptionsProps['items'] = [
        {
            key: "systemName",
            label: "系统名称",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{systemInfo.systemName}</span>

        },
        {
            key: "operationSytem",
            label: "操作系统",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{systemInfo.goVersion}</span>

        },
        {
            key: "version",
            label: "版本号",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{systemInfo.version}</span>

        },
        {
            key: "commitID",
            label: "CommitID",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{systemInfo.commitID}</span>

        },
        {
            key: "buildTime",
            label: "编译时间",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{systemInfo.buildTime}</span>
        },

    ]

    const systemMonitorItems: DescriptionsProps['items'] = [
        {
            key: "1",
            label: "CPU数量",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{monitorInfo.cpuCount}</span>

        },

        {
            key: "2",
            label: "CPU利用率",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{getCpuPercent(monitorInfo.cpuPercent)}</span>

        },
        {
            key: "3",
            label: "内存利用率",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{monitorInfo.usedMemory}GB /{monitorInfo.totalMemory}GB</span>

        },
        {
            key: "4",
            label: "磁盘利用率",
            span: 3,
            children: <span style={{ textAlign: "right", width: "100%" }}>{monitorInfo.usedDisk}GB /{monitorInfo.totalDisk}GB</span>
        },
        {
            key: "5",
            label: "系统运行时长",
            span: 3,
            children:
                <div style={{ textAlign: "right", width: "100%" }}>
                    {/* <span>1</span><span>天</span>
                    <span>2</span><span>小时</span>
                    <span>36</span><span>分钟</span> */}
                    <span>{(monitorInfo.runningTime / 1000).toFixed(0)}</span><span>秒</span></div>

        },
    ]


    return (
        <>

            <Row>
                <Col span={12} style={{ padding: 8 }}>
                    <Card title="系统信息" style={{ height: 300, padding: 10 }}>
                        <Descriptions items={descriptionItems} style={{ paddingRight: 40, paddingLeft: 40 }}>

                        </Descriptions>

                    </Card>
                </Col>
                <Col span={12} style={{ padding: 8 }}>
                    <Card title="系统监控" style={{ height: 300, padding: 10 }}>
                        <Descriptions items={systemMonitorItems} style={{ paddingRight: 40, paddingLeft: 40 }}>

                        </Descriptions>
                    </Card>
                </Col>
            </Row>
            {/* <Row style={{ marginTop: 10, padding: 8 }}>
                <Col span={24}>
                    <Card title="功能控制面板" style={{ padding: 10 }}>
                        <Row>
                            <Col span={6} style={{ padding: 8 }}>
                                <Card title="聊天室">
                                    <Switch></Switch>
                                </Card>
                            </Col>
                            <Col span={6} style={{ padding: 8 }}>
                                <Card title="增加好友">
                                    <Switch></Switch>
                                </Card>
                            </Col>
                            <Col span={6} style={{ padding: 8 }}>
                                <Card title="发表短评">
                                    <Switch></Switch>
                                </Card>
                            </Col>
                            <Col span={6} style={{ padding: 8 }}>
                                <Card title="发表文章">
                                    <Switch></Switch>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} style={{ padding: 8 }}>
                                <Card title="评论功能">
                                    <Switch></Switch>
                                </Card>
                            </Col>
                            <Col span={6} style={{ padding: 8 }}>
                                <Card title="插件系统">
                                    <Switch></Switch>
                                </Card>
                            </Col>

                        </Row>

                    </Card>
                </Col>
            </Row> */}
        </>
    )

}

