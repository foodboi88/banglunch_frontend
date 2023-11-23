import {
    Button,
    Checkbox,
    Form,
    Input,
    List,
    Modal,
    Select,
    SelectProps,
    Steps,
    Upload,
    Radio
} from "antd";
import VirtualList from "rc-virtual-list";
import React, { useEffect, useState } from "react";
import {
    FolderOutlined,
    PictureOutlined,
    PlusOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import TextArea from "antd/lib/input/TextArea";
import { motion } from "framer-motion";
import SearchIcon from "../../images/Search_Icon.png";
import "./styles.uploadsketch.scss";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useDispatchRoot, useSelectorRoot } from "../../../redux/store";
import {
    getAllFilterCriteriasRequest,
    uploadFileSketchRequest,
    uploadImageSketchRequest,
    uploadSketchRequest,
} from "../../../redux/controller";
import { useNavigate } from "react-router-dom";
import { RadioChangeEventTarget } from "antd/lib/radio";
import { TEXT_FIELD, TEXT_INPUT } from "../../../enum/common.enum";

const options: SelectProps["options"] = [];

const TypeList = [
    {
        id: 1,
        title: "Lâu đài, dinh thự",
    },
    {
        id: 2,
        title: "Biệt thự 1 tầng",
    },
    {
        id: 3,
        title: "Biệt thự 2 tầng",
    },
    {
        id: 4,
        title: "Biệt thự trên 3 tầng",
    },
    {
        id: 5,
        title: "Nhà phố 1 tầng",
    },
    {
        id: 6,
        title: "Nhà phố 2 tầng",
    },
    {
        id: 7,
        title: "Nhà phố trên 3 tầng",
    },
    {
        id: 8,
        title: "Nhà ống",
    },
    {
        id: 9,
        title: "Nhà xưởng",
    },
    {
        id: 10,
        title: "Nhà hàng, khách sạn",
    },
    {
        id: 11,
        title: "Nhà trọ, phòng trọ",
    },
    {
        id: 12,
        title: "Nhà ở",
    },
];

for (let i = 0; i < TypeList.length; i++) {
    if (TypeList[i]) {
        options.push({
            label: TypeList[i].title,
            value: TypeList[i].id.toString(36),
        });
    }
}

const ruleList = [
    "Mọi thông tin của thành viên đăng tải trên diễn đàn VRO Group phải chính xác",
    "Mọi file đăng bán phải đảm bảo mở được, mô tả đầy đủ thông tin và đúng như hình ảnh đính kèm",
    "Nội dung file nén đã được kiếm tra, đảm bảo không chứa tệp tin không khả dụng, độc hại, virus hoặc bất cứ liên kết khác",
    "Phải đảm bảo file download có chứa đầy đủ các file đã mô tả trong tiêu đề và mô tả chi tiết",
    "Tât cả bản vẽ bị báo cáo vi phạm bản quyền nếu được ban quản trị xác nhận là đúng, bản vẽ sẽ bị xóa bỏ",
    "Bản vẽ đã đăng trên VRO Group là thành viên đã đồng ý cho phép các thành viên download và sử dụng",
];

// const optionsTools = [
//     // Call API chu khong de cung ntn
//     { label: "Autocad", value: "64230e9fedf9dd11e488c23b" },
//     { label: "3D max", value: "64230ef9edf9dd11e488c23e" },
//     { label: "Revit", value: "64230f07edf9dd11e488c240" },
//     { label: "Sketchup", value: "64230f1eedf9dd11e488c242" },
// ];
const optionsArchitectures = [
    {
        label: "Biệt thự",
        value: "64231026edf9dd11e488c250",
    },
    {
        label: "Nhà phố",
        value: "64231030edf9dd11e488c252",
    },
    {
        label: "Nhà xưởng",
        value: "642ce3895de07140c4f4cd61",
    },
    {
        label: "Nội thất",
        value: "642ce3965de07140c4f4cd62",
    },
    {
        label: "Ngoại thất",
        value: "642ce3a35de07140c4f4cd63",
    },
];

// const optionsStyles = [
//     {
//         label: "Cổ điển",
//         value: "64230f48edf9dd11e488c245",
//     },
//     {
//         label: "Hiện đại",
//         value: "64230fd4edf9dd11e488c247",
//     },
//     {
//         label: "Chưa xác định",
//         value: "64230fdaedf9dd11e488c249",
//     },
// ];
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const UploadSketch = () => {
    const [current, setCurrent] = useState(0); // Biến kiểm tra bước hiện tại
    const [searchType, setSearchType] = useState(""); // Biến lưu giá trị tìm kiếm loại bản vẽ
    const [selectedType, setSelectedType] = useState<number>(); // Biến lưu giá trị loại bản vẽ
    const [selectTitle, setSelectTitle] = useState(""); // Biến lưu giá trị tiêu đề bản vẽ
    const [selectTag, setSelectTag] = useState(""); // Biến lưu giá trị tag bản vẽ
    const [imageUploadLst, setImageUploadLst] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh bản vẽ đã upload
    const [fileUploadLst, setFileUploadLst] = useState<RcFile[]>([]); // Biến lưu giá trị file bản vẽ đã upload
    const [checkLstImageUploadLst, setCheckLstImageUploadLst] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh bản vẽ đã upload
    const [checkLstFileUploadLst, setCheckLstFileUploadLst] = useState<RcFile[]>([]); // Biến lưu giá trị file bản vẽ đã upload
    const [selectPrice, setSelectPrice] = useState(0); // Biến lưu giá trị giá bản vẽ
    const [note, setNote] = useState(""); // Biến lưu giá trị ghi chú bản vẽ
    const [selectStyle, setSelectStyle] = useState(""); // Biến lưu giá trị kiểu bản vẽ
    const [selectTool, setSelectTool] = useState<RadioChangeEventTarget[]>([]); // Biến lưu giá trị công cụ vẽ bản vẽ
    const [selectCategory, setSelectCategory] = useState<RadioChangeEventTarget[]>(
        []
    ); // Biến lưu giá trị danh mục bản vẽ
    const [isCheckedRules, setIsCheckedRules] = useState(false); // Biến lưu giá trị quy tắc bản vẽ
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const { checkProductsFile, toolList, architectureList, styleList } = useSelectorRoot((state) => state.sketch); // Lst cac ban ve        
    const dispatch = useDispatchRoot();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('imageUploadLst', imageUploadLst);
        console.log('fileUploadLst', fileUploadLst);
    }, [imageUploadLst, fileUploadLst]);

    const handleCancelPreview = () => setPreviewOpen(false); // Hàm xử lý khi click hủy xem ảnh

    const handlePreview = async (file: UploadFile) => {
        // Hàm xử lý khi click xem ảnh
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        );
    };

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
        // Hàm xử lý khi thay đổi file upload
        // setImageUploadLst(newFileList);
        // console.log(newFileList);
    };

    const uploadButton = // Hàm xử lý khi click upload ảnh
        (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
        );

    const handleChangeMultivalueKey = (val: React.SetStateAction<string>) => {
        // Hàm xử lý khi thay đổi giá trị select
        setSelectTag(val);
    };

    const filteredData = TypeList.filter((item) =>
        item.title.toLowerCase().includes(searchType.toLowerCase())
    ); // Hàm xử lý khi tìm kiếm loại bản vẽ

    const handleSearchType = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        // Hàm xử lý khi thay đổi giá trị tìm kiếm loại bản vẽ
        setSearchType(e.target.value);
    };

    const handleClickType = (item: { id: number; title: string }) => {
        // Hàm xử lý khi click chọn loại bản vẽ
        setSelectedType(item.id);
        console.log(item);
    };

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

    const handleClickBtnStyle = (val: string) => {
        // Hàm xử lý khi click chọn kiểu bản vẽ
        setSelectStyle(val);
    };

    const handleUploadSketch = () => {
        const bodyrequest = {
            // searchType: searchType,
            // selectedType: selectedType,
            title: selectTitle,
            // selectedTag: selectTag,
            imageUploadLst: imageUploadLst,
            fileUploadLst: fileUploadLst,
            size: "40m*40m",
            price: selectPrice,
            content: note,
            productDesignStyles: selectStyle,
            productDesignTools: selectTool,
            productTypeOfArchitecture: selectCategory,
        };

        console.log(bodyrequest);

        // const bodyrequestTest = {
        //     imageUploadLst: imageUploadLst,
        //     fileUploadLst: fileUploadLst,
        //     id: "6423f410c55e590e7080e5fa",
        // };

        dispatch(uploadSketchRequest(bodyrequest));

        // dispatch(uploadFileSketchRequest(bodyrequestTest));
        // dispatch(uploadImageSketchRequest(bodyrequestTest));
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
                <Form className="form">
                    <div className="sketch-content-area">

                        {current === 0 && (
                            <div className="content-area">
                                <div className="sketch-content">
                                    <div className="title">Mô tả bản vẽ</div>
                                    <div className="description">
                                        Vui lòng nhập các thông tin chung
                                    </div>
                                    <Form.Item>
                                        <div className="title-input">
                                            Tiêu đề <strong>*</strong>
                                        </div>
                                        <div className={`header-content-input`}>
                                            <Input
                                                className="search-input"
                                                placeholder="Nhập tiêu đề"
                                                onChange={(e) =>
                                                    setSelectTitle(
                                                        e.target.value
                                                    )
                                                }
                                                maxLength={TEXT_INPUT.MAX_LENGTH}
                                            />
                                        </div>
                                    </Form.Item>
                                    {/* <Form.Item>
                                        <div className="title-input">
                                            Từ khóa <strong>*</strong>
                                        </div>
                                        <Select
                                            mode="tags"
                                            placeholder="Nhập từ khóa"
                                            onChange={handleChangeMultivalueKey}
                                            options={options}
                                        />
                                    </Form.Item> */}
                                    <Form.Item>
                                        <div className="title-input">
                                            Phong cách <strong>*</strong>
                                        </div>
                                        <div className="button-group">
                                            {styleList.map((item) => (
                                                <Button
                                                    className={
                                                        selectStyle ===
                                                            item.value
                                                            ? "active"
                                                            : ""
                                                    }
                                                    onClick={() => {
                                                            handleClickBtnStyle(
                                                                item.value as string
                                                            )
                                                        }
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </Form.Item> 
                                    <Form.Item>
                                        <div className="title-input">
                                            Công cụ <strong>*</strong>
                                        </div>
                                        <div className="tool-list">
                                            <Radio.Group
                                                className="lst-tool"
                                                options={toolList}

                                                onChange={(e) => {
                                                    const selectValue = [e.target]
                                                    setSelectTool(selectValue)

                                                }
                                                }
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="title-input">
                                            Kiến trúc <strong>*</strong>
                                        </div>
                                        <div className="tool-list">
                                            <Radio.Group
                                                className="lst-category"
                                                options={architectureList}
                                                onChange={(e) => {
                                                    const selectValue = [e.target]
                                                    setSelectCategory(selectValue)

                                                }
                                                }
                                            />
                                        </div>
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="title-input">
                                            Phí download (VNĐ){" "}
                                            <strong>*</strong>
                                        </div>
                                        <div className={`header-content-input`}>
                                            <Input
                                                type="number"
                                                className="search-input"
                                                placeholder="Nhập phí download"
                                                min={0}
                                                onChange={(e) =>
                                                    setSelectPrice(parseInt(e.target.value))
                                                }
                                                maxLength={TEXT_INPUT.MAX_LENGTH}

                                            />
                                        </div>
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="title-input">
                                            Mô tả chi tiết <strong>*</strong>
                                        </div>
                                        <div className={`header-content-input`}>
                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập mô tả"
                                                onChange={(e) =>
                                                    setNote(e.target.value)
                                                }
                                                maxLength={TEXT_FIELD.MAX_LENGTH}

                                            />
                                        </div>
                                    </Form.Item>
                                </div>
                                <motion.div className="btn-submit-upload">
                                    {
                                        selectTool &&
                                            selectCategory &&
                                            selectTitle &&
                                            // selectTag &&

                                            selectPrice >= 0 &&
                                            note ? (
                                            <Button
                                                onClick={() => handleClickNextBtn()}
                                            >
                                                Tiếp tục
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleClickNextBtn()}
                                                disabled
                                            >
                                                Tiếp tục
                                            </Button>
                                        )}
                                </motion.div>
                            </div>
                        )}
                        {current === 1 && (
                            <div className="content-area">
                                <div className="sketch-content">
                                    {/* <div className="title">
                                        Thông tin bản vẽ
                                    </div>
                                    <div className="description">
                                        Vui lòng nhập các thông tin chung
                                    </div> */}

                                    <div className="image">
                                        <Form.Item
                                            className="thumbnail"
                                            valuePropName="imageList"
                                        >
                                            <div className="title-input">
                                                Hình ảnh <strong>*</strong>
                                            </div>
                                            <Upload
                                                action={
                                                    "https://localhost:3000/"
                                                }
                                                multiple
                                                onRemove={(file) => {
                                                    return true
                                                }}
                                                listType="picture-card"
                                                showUploadList={{
                                                    showRemoveIcon: true,
                                                }}
                                                fileList={imageUploadLst}
                                                onPreview={handlePreview}
                                                onChange={handleChangeFileLst}
                                                accept=".png, .jpeg, .jpg"
                                                beforeUpload={(file) => {
                                                    let tmplst = imageUploadLst;
                                                    tmplst.push(file);
                                                    setImageUploadLst(tmplst);
                                                    return false;
                                                }}
                                                progress={{
                                                    strokeWidth: 3,
                                                    strokeColor: {
                                                        "0%": "#a9eab3",
                                                        "100%": "#27CA40",
                                                    },
                                                    style: { top: 12 },
                                                }}
                                            >
                                                {imageUploadLst.length >= 8
                                                    ? null
                                                    : uploadButton}
                                            </Upload>
                                            <Modal
                                                open={previewOpen}
                                                title={previewTitle}
                                                footer={null}
                                                onCancel={handleCancelPreview}
                                            >
                                                <img
                                                    alt="example"
                                                    style={{ width: "100%" }}
                                                    src={previewImage}
                                                />
                                            </Modal>
                                        </Form.Item>
                                        <Form.Item
                                            className="image-list"
                                            valuePropName="fileList"
                                        >
                                            <div className="title-input">
                                                Tải bản vẽ chi tiết{" "}
                                                <strong>*</strong>
                                            </div>
                                            <Upload.Dragger
                                                multiple
                                                listType="picture"
                                                action={
                                                    "https://localhost:3000/"
                                                }
                                                showUploadList={{
                                                    showRemoveIcon: true,
                                                }}
                                                onChange={(info) => {
                                                    setCheckLstFileUploadLst(info.fileList as RcFile[])
                                                }}
                                                accept=".zip, .rar"
                                                beforeUpload={(file) => {
                                                    console.log(file)
                                                    let tmplst = fileUploadLst;
                                                    tmplst.push(file);
                                                    setFileUploadLst(tmplst);
                                                    return false;
                                                }}
                                                progress={{
                                                    strokeWidth: 3,
                                                    strokeColor: {
                                                        "0%": "#a9eab3",
                                                        "100%": "#27CA40",
                                                    },
                                                    style: { top: 12 },
                                                }}
                                            >
                                                Click hoặc kéo file bản vẽ vào
                                                đây (file .zip hoặc .zar)
                                                <br />
                                            </Upload.Dragger>
                                        </Form.Item>
                                    </div>


                                    <Form.Item>
                                        <div className="title-input">
                                            Quy định chung
                                        </div>
                                        <div className="rule-list">
                                            {ruleList.map((item) => (
                                                <div>{`- ${item}`}</div>
                                            ))}
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
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
                                    <Button
                                        className="btn-back"
                                        onClick={() => handleClickBackBtn()}
                                    >
                                        Quay lại
                                    </Button>
                                    {
                                        // selectStyle &&
                                        (checkLstImageUploadLst &&
                                            checkLstImageUploadLst.length > 0 &&
                                            checkLstFileUploadLst &&
                                            checkLstFileUploadLst.length > 0 &&
                                            isCheckedRules
                                        ) ? (
                                            <Button
                                                onClick={() => handleUploadSketch()}
                                            >
                                                Đăng bài
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleUploadSketch()}
                                                disabled
                                            >
                                                Đăng bài
                                            </Button>
                                        )}
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
