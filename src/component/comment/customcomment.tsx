import { Card } from "antd"
import React, { useState } from "react"
import './customcomment.css'
import CommentInput from "./commentinput"
import CustomRecover from "./revover"
import { kMaxLength } from "buffer"

const CustomComment = (item) => {
    const [display, setDisplay] = useState<string>("none")
    const show = () => {
        setDisplay("")
    }
    const getComment = (item) => {
        let first = item.item
        console.log(111, first)
        console.log(222, first.child)

        return (

            <>
                <div style={{ width: "100%" }}>
                    <div>
                        <div className='card-left'>
                            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" style={{ cursor: "pointer", width: "100%", height: "100%" }} />
                        </div>
                        <div className='card-right'>
                            <div className='right-top'>
                                <a >
                                    <span style={{ margin: 10 }}>{first.author}</span>
                                </a>

                                <span className='userField' style={{ margin: 5 }}>{first.level}</span>
                                <span className='userField' style={{ margin: 5 }}>ip属地:{first.ip}</span>
                                <span className='userField' style={{ margin: 5 }}>{first.createTime}</span>


                                <span style={{ float: "right" }}>举报</span>
                                <span style={{ float: "right", marginRight: "10px" }}>收藏</span>

                            </div>
                            <div className='right-center'>{first.context}<br /><br /></div>
                            <div className='right-buttom'>
                                <a><span style={{ margin: 4 }} onClick={show}>回复</span></a>
                                <span style={{ margin: 4 }}>👍赞</span>
                                <span style={{ margin: 4 }}>👎踩</span>
                            </div>
                        </div>

                        <CommentInput display={display} updateParent={setDisplay}></CommentInput>

                    </div>

                    <div style={{ width: "90%", float: "right" }}>
                        {first.child.map((second) => {
                            return (
                                <>
                                    <div className='card-left'>
                                        <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" style={{ cursor: "pointer", width: "100%", height: "100%" }} />
                                    </div>
                                    <div className='card-right'>
                                        <div className='right-top'>
                                            <a >
                                                <span style={{ margin: 10 }}>{second.author}</span>
                                            </a>

                                            <span className='userField' style={{ margin: 5 }}>{second.level}</span>
                                            <span className='userField' style={{ margin: 5 }}>ip属地:{ }</span>
                                            <span className='userField' style={{ margin: 5 }}>{ }</span>

                                        </div>
                                        <div className='right-center'>{second.context} <br /><br /></div>
                                        <div className='right-buttom'>
                                            <a><span style={{ margin: 4 }} onClick={show}>回复</span></a>
                                            <span style={{ margin: 4 }}>举报</span>
                                            <span style={{ margin: 4 }}>👍赞</span>
                                            <span style={{ margin: 4 }}>👎踩</span>
                                        </div>
                                        <CommentInput display={display} updateParent={setDisplay}></CommentInput>
                                    </div>
                                    {/* 三级评论 */}
                                    <div style={{ width: "100%", float: "right" }}>
                                        {second.child.map((third) => {
                                            return (
                                                <>
                                                    {/* <div className='card-left'>
                                                        <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" style={{ cursor: "pointer", width: "100%", height: "100%" }} />
                                                    </div> */}
                                                    <div className='card-right'>
                                                        {/* <div className='right-top'>
                                                            <a >
                                                                <span style={{ margin: 10 }}>{third.author}</span>
                                                            </a>

                                                            <span className='userField' style={{ margin: 5 }}>{third.level}</span>
                                                            <span className='userField' style={{ margin: 5 }}>ip属地:{ }</span>
                                                            <span className='userField' style={{ margin: 5 }}>{ }</span>

                                                        </div> */}
                                                        <div className='right-center'>{third.author}@<a>{third.replayTo}</a>: {third.context}<br /><br /></div>
                                                        <div className='right-buttom'>
                                                            <a><span style={{ margin: 4 }} onClick={show}>回复</span></a>
                                                            <span style={{ margin: 4 }}>举报</span>
                                                            <span style={{ margin: 4 }}>👍赞</span>
                                                            <span style={{ margin: 4 }}>👎踩</span>
                                                        </div>
                                                        <CommentInput display={display} updateParent={setDisplay}></CommentInput>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </>

                            )



                        })}
                    </div>
                </div>




            </>

        )

    }
    return (
        <Card style={{ width: 850, margin: 8 }}>

            {getComment(item)}


        </Card>
    )
}

export default CustomComment;