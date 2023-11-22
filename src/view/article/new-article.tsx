import React, { Component, useState } from "react";
import { Button, Col, Drawer, Form, Input, Radio, Row, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import CustomEditor from "../../component/editor/my-editor";
import { myFetch } from "../../utils/fetch";
import ByteMd from "../../component/editor/my-editor";




const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    title: string
    intro: string
    category: string
    tags: string[]
    isoriginal: boolean

    picture: string
    context: string
}

const NewArticleDrawer = ({ isOpen, setIsOpen = function (boolean) { } }) => {
    const [tagsoptions, settags] = useState<any>()
    const [cateoptions, setcates] = useState<any>()

    const updateParent = () => {
        setIsOpen(false)
    }
    const gettags = () => {
        myFetch({ url: "/normalUser/tags", options: { method: "GET" } }).then((data) => {
            if (data.body.code !== 200) {
                return
            }
            let tags = []
            for (let i = 0; i < (data.body.result).length; i++) {
                tags.push({ "value": data.body.result[i].name })
            }
            settags(tags)

        })
    }

    const getcates = () => {
        myFetch({ url: "/normalUser/category", options: { method: "GET" } }).then((data) => {
            if (data.body.code !== 200) {
                return
            }
            let cates = []
            for (let i = 0; i < (data.body.result).length; i++) {
                cates.push({ "value": data.body.result[i].name })
            }
            setcates(cates)

        })
    }

    return (<>
        <Drawer title="写文章" placement="right" open={isOpen} width={"100%"} closable={false}>

            <Form size="large" style={{ width: "100%" }}>
                <Row style={{ marginTop: 20 }}>
                    <Col span={15} offset={1}>
                        <Form.Item<FieldType> label="标题" rules={[{ required: true, message: "请输入标题" }]} name="title">
                            <Input ></Input>
                        </Form.Item>
                        <Form.Item<FieldType> label="简介" name="intro">
                            <Input></Input>
                        </Form.Item>
                        <Row>
                            <Col span={6} >
                                <Form.Item<FieldType> label="分类" name="category" rules={[{ required: true }]}>
                                    <Select options={cateoptions} placeholder="请选择分类" onClick={getcates}></Select>
                                </Form.Item>
                            </Col>
                            <Col span={6} offset={3}>
                                <Form.Item<FieldType> label="标签" name="tags" rules={[{ required: true }]}>
                                    <Select mode="multiple" options={tagsoptions} placeholder="请选择标签" onClick={gettags}></Select>
                                </Form.Item>
                            </Col>
                            <Col span={6} offset={3}>
                                <Form.Item<FieldType> label="是否原创" name="isoriginal" rules={[{ required: true }]}>
                                    <Radio>原创</Radio>
                                    <Radio>转载</Radio>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7} offset={1}>
                        <Form.Item label="标题图" name="picture">
                            <Upload action="/upload.do" listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 10 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>

                    </Col>
                </Row>
                <Row>
                    <Col span={22} offset={1}>
                        <Form.Item<FieldType> label="内容" style={{ marginTop: 15 }} name="context" rules={[{ required: true }]}>

                            <ByteMd></ByteMd>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
            <div style={{ float: "right" }}>
                <Button onClick={updateParent} size="large" style={{ margin: 10 }}>取消</Button>
                <Button size="large" style={{ margin: 10, backgroundColor: "#909399" }} >保存草稿</Button>
                <Button size="large" style={{ margin: 10 }} type="primary">提交审核</Button>
            </div>





        </Drawer>
    </>
    )

}





export default NewArticleDrawer