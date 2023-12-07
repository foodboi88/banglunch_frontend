import {
    PictureOutlined,
    PlusOutlined,
    ProfileOutlined
} from "@ant-design/icons";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Steps,
    Upload
} from "antd";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import TextArea from "antd/lib/input/TextArea";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEXT_FIELD, TEXT_INPUT } from "../../../enum/common.enum";
import {
    getAllFilterCriteriasRequest, uploadSketchRequest
} from "../../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../../redux/store";
import "./styles.uploadsketch.scss";

const ruleList = [
    "Mọi thông tin của thành viên đăng tải trên diễn đàn VRO Group phải chính xác",
    "Mọi file đăng bán phải đảm bảo mở được, mô tả đầy đủ thông tin và đúng như hình ảnh đính kèm",
    "Nội dung file nén đã được kiếm tra, đảm bảo không chứa tệp tin không khả dụng, độc hại, virus hoặc bất cứ liên kết khác",
    "Phải đảm bảo file download có chứa đầy đủ các file đã mô tả trong tiêu đề và mô tả chi tiết",
    "Tât cả bản vẽ bị báo cáo vi phạm bản quyền nếu được ban quản trị xác nhận là đúng, bản vẽ sẽ bị xóa bỏ",
    "Bản vẽ đã đăng trên VRO Group là thành viên đã đồng ý cho phép các thành viên download và sử dụng",
];

const UploadSketch = () => {
    const [current, setCurrent] = useState(0); // Biến kiểm tra bước hiện tại
    const [imageUploadLst, setImageUploadLst] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh bản vẽ đã upload
    const [checkLstImageUploadLst, setCheckLstImageUploadLst] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh bản vẽ đã upload

    const [isCheckedRules, setIsCheckedRules] = useState(false); // Biến lưu giá trị quy tắc bản vẽ
    const [form] = Form.useForm();

    const { architectureList} = useSelectorRoot((state) => state.sketch); // Lst cac ban ve        
    const dispatch = useDispatchRoot();
    const navigate = useNavigate();


    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    useEffect(() => {
        dispatch(getAllFilterCriteriasRequest())
    }, [])

    const handleChangeFileLst: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setCheckLstImageUploadLst(newFileList);
    };

    const uploadButton = // Hàm xử lý khi click upload ảnh
        (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
        );
    
    const handleClickNextBtn = () => {
        // Hàm xử lý khi click nút tiếp theo
        setCurrent(current + 1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const handleClickBackBtn = () => {
        // Hàm xử lý khi click nút quay lại
        setCurrent(current - 1);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const handleUploadSketch = () => {
        const bodyrequest = {
            title: form.getFieldValue('title'),
            imageUploadLst: imageUploadLst,
            price: form.getFieldValue('price'),
            content: form.getFieldValue('content'),
            category: form.getFieldValue('category'),
            height: form.getFieldValue('height'),
            length: form.getFieldValue('length'),
            width: form.getFieldValue('width'),
            weight: form.getFieldValue('price')
        };
        console.log(bodyrequest);
        dispatch(uploadSketchRequest(bodyrequest));
    };


    return (
        <div className="main-upload">
            <div className="upload-area">
                <Steps
                    responsive={false}
                    direction="horizontal"
                    className="upload-step"
                    current={current}
                    items={
                        windowSize[0] >= 850
                            ? [

                                {
                                    title: "Thông tin bản vẽ",
                                    icon: <ProfileOutlined />,
                                },
                                {
                                    title: "Upload file bản vẽ",
                                    icon: <PictureOutlined />,
                                },
                            ]
                            : [

                                {
                                    // title: 'Mô tả bản vẽ',
                                    icon: <ProfileOutlined />,
                                },
                                {
                                    // title: 'Thông tin bản vẽ',
                                    icon: <PictureOutlined />,
                                },
                            ]
                    }
                />
                <Form className="form" form={form} layout="vertical">
                    <div className="sketch-content-area">

                        {current === 0 && (
                            <div className="content-area">
                                <div className="sketch-content">
                                    <div className="title">Mô tả bản vẽ</div>
                                    <div className="description">
                                        Vui lòng nhập các thông tin chung
                                    </div>
                                    <Form.Item
                                        name="title"
                                        label={<span>Tiêu đề <strong>*</strong></span>}
                                    >
                                        <Input
                                            className="search-input"
                                            placeholder="Nhập tiêu đề"
                                            maxLength={TEXT_INPUT.MAX_LENGTH}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="category"
                                        label={<span>Loại đồ ăn <strong>*</strong></span>}
                                    >

                                            <Radio.Group
                                                className="lst-category"
                                                options={architectureList}
                                            />
                                    </Form.Item>

                                    <Form.Item
                                        name="price"
                                            label={<span>Giá món (VNĐ){" "}
                                            <strong>*</strong></span>}

                                    >

                                            <Input
                                                type="number"
                                                className="search-input"
                                                placeholder="Nhập phí download"
                                                min={0}
                                                maxLength={TEXT_INPUT.MAX_LENGTH}
                                            />
                                    </Form.Item>

                                    <Form.Item
                                        name="content"
                                        label={<span>Mô tả chi tiết <strong>*</strong></span>}
                                    >

                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập mô tả"
                                                maxLength={TEXT_FIELD.MAX_LENGTH}

                                            />
                                    </Form.Item>
                                </div>
                                <motion.div className="btn-submit-upload">
                                    <Button
                                        onClick={() => handleClickNextBtn()}
                                    >
                                        Tiếp tục
                                    </Button>  
                                </motion.div>
                            </div>
                        )}
                        {current === 1 && (
                            <div className="content-area">
                                <div className="sketch-content">
                                    <div className="image">
                                        <Form.Item
                                            name='length'
                                            label={<span>Chiều dài món <strong>*</strong>(thông tin dùng cho dịch vụ vận chuyển)</span>}

                                        >
                                            
                                                <Input
                                                    placeholder="Nhập chiều dài"
                                                    maxLength={TEXT_FIELD.MAX_LENGTH}

                                                />
                                        </Form.Item>
                                        <Form.Item
                                            name='width'
                                            label={<span>Chiều rộng món <strong>*</strong>(thông tin dùng cho dịch vụ vận chuyển)</span>}

                                        >

                                                <Input
                                                    placeholder="Nhập chiều rộng"
                                                    maxLength={TEXT_FIELD.MAX_LENGTH}

                                                />
                                        </Form.Item>
                                        <Form.Item
                                            name='height'
                                            label={<span>Chiều cao món <strong>*</strong>(thông tin dùng cho dịch vụ vận chuyển)</span>}

                                        >
                                            
                                            <Input
                                                placeholder="Nhập chiều cao"
                                                maxLength={TEXT_FIELD.MAX_LENGTH}

                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name='weight'
                                            label={<span>Khối lượng <strong>*</strong>(thông tin dùng cho dịch vụ vận chuyển)</span>}
                                        >
                                            
                                                <Input
                                                    placeholder="Nhập khối lượng"
                                                    maxLength={TEXT_FIELD.MAX_LENGTH}

                                                />
                                        </Form.Item>
                                        <Form.Item
                                            name='imageUploadLst'
                                            label={<span>Hình ảnh <strong>*</strong></span>}
                                            className="thumbnail"
                                            valuePropName="imageList"
                                        >
                                            <Upload
                                                multiple
                                                onRemove={(file) => {
                                                    let tmplst = imageUploadLst;
                                                    tmplst.filter((value,index,arr) => {
                                                        if (value.name === file.name) {
                                                        // Removes the value from the original array
                                                            arr.splice(index, 1);
                                                            return true;
                                                        }
                                                        return false;
                                                    })
                                                    

                                                    setImageUploadLst(tmplst)
                                                    return true
                                                }}
                                                listType="picture-card"
                                                showUploadList={{
                                                    showRemoveIcon: true,
                                                }}
                                                onChange={(file) => {
                                                    handleChangeFileLst(file)
                                                    console.log(imageUploadLst)
                                                }}
                                                accept=".png, .jpeg, .jpg"
                                                beforeUpload={(file) => {
                                                    let tmplst = imageUploadLst;
                                                    tmplst.push(file);
                                                    setImageUploadLst(tmplst);
                                                    return false;
                                                }}
                                            >
                                                {imageUploadLst.length >= 8
                                                    ? null
                                                    : uploadButton}
                                            </Upload>

                                        </Form.Item>
                                    </div>


                                    <Form.Item
                                    >
                                        <div className="title-input">
                                            Quy định chung
                                        </div>
                                        <div className="rule-list">
                                            {ruleList.map((item) => (
                                                <div>{`- ${item}`}</div>
                                            ))}
                                        </div>
                                    </Form.Item>
                                    <Form.Item
                                        name='required'
                                    >
                                        <Checkbox
                                            onChange={(e) =>
                                                setIsCheckedRules(
                                                    e.target.checked
                                                )
                                            }
                                        >
                                            Tôi đã đọc và đồng ý với quy định
                                            chung của VRO Group
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                                <motion.div className="btn-submit-upload">
                                    <Form.Item>

                                        <Button
                                            className="btn-back"
                                            onClick={() => handleClickBackBtn()}
                                        >
                                            Quay lại
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary"
                                            onClick={() => handleUploadSketch()}
                                        >
                                            Đăng bài
                                        </Button>
                                    </Form.Item>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UploadSketch;
