import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.scss";
import "antd/dist/antd.css";

const DarkBackground = styled.div`
    position: fixed; /* Stay in place */
    z-index: 999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const CLoading = (props: any) => {
    // useEffect(()=>{
    //     console.log('Vao roi ma khong lam gi a!')
    // })
    return (
        <div>
            <DarkBackground>
                {/* <LoadingOverlay
                    active={true}
                    // spinner={<BounceLoader />}
                    spinner={true}
                    text="Đang xử lý kết quả của bạn. Đợi xíu nha <3..."
                    className='center_everything'
                /> */}

                <div className="wrapper center_everything">
                    <div className="circle"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    {/* <span>{`Loading...`}</span> */}
                </div>
            </DarkBackground>
        </div>
    );
};

export default CLoading;
