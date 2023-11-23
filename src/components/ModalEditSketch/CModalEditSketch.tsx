import { SelectProps, UploadFile, UploadProps, Steps, Form, Input, Checkbox, Radio, Button, Upload, Modal } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import TextArea from "antd/lib/input/TextArea";
import { RcFile } from "antd/lib/upload";
import { useState, useEffect } from "react";
import { TEXT_INPUT, TEXT_FIELD } from "../../enum/common.enum";
import { editSketchRequest, getAllFilterCriteriasRequest, uploadSketchRequest } from "../../redux/controller";
import { useSelectorRoot, useDispatchRoot } from "../../redux/store";
import { IUploadSketchRequest } from "../../common/sketch.interface";



interface MyProps{
    open: boolean;
    data?: IUploadSketchRequest;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

type LayoutType = Parameters<typeof Form>[0]['layout'];


const CModalEditSketch = (props: MyProps) => {
    const [searchType, setSearchType] = useState(""); // Biến lưu giá trị tìm kiếm loại bản vẽ
    const [selectTitle, setSelectTitle] = useState(props.data? props.data.title : ''); // Biến lưu giá trị tiêu đề bản vẽ
    const [imageUploadLst, setImageUpload] = useState<UploadFile[]>([]); // Biến lưu giá trị ảnh bản vẽ đã upload
    const [fileUploadLst, setFileUploadList] = useState<RcFile[]>([]); // Biến lưu giá trị file bản vẽ đã upload
    const [selectPrice, setSelectPrice] = useState(props.data? props.data.price : ''); // Biến lưu giá trị giá bản vẽ
    const [note, setNote] = useState(props.data? props.data.note : ''); // Biến lưu giá trị ghi chú bản vẽ
    const [selectTool, setSelectTool] = useState<CheckboxValueType[]>([props.data? props.data.productDesignTools as CheckboxValueType : '']); // Biến lưu giá trị công cụ vẽ bản vẽ
    const [selectCategory, setSelectCategory] = useState(
        [props.data? props.data.productTypeOfArchitecture  : '']
    ); // Biến lưu giá trị danh mục bản vẽ
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');


    const { checkProductsFile, toolList, architectureList, styleList } = useSelectorRoot((state) => state.sketch); // Lst cac ban ve        
    const dispatch = useDispatchRoot();

    const [form] = Form.useForm();



    const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 6 }, wrapperCol: { span: 18 } } : null;



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
        console.log(props.data)
    }, [])


    const handleUploadSketch = () => {
        


        

        // const bodyrequestTest = {
        //     imageUploadLst: imageUploadLst,
        //     fileUploadLst: fileUploadLst,
        //     id: "6423f410c55e590e7080e5fa",
        // };
        console.log(form.getFieldsValue())
        const bodyrequest = {...form.getFieldsValue(),id: props?.data?.id}
        dispatch(editSketchRequest(bodyrequest));

        props.setOpenModalEdit(false)


        // dispatch(uploadFileSketchRequest(bodyrequestTest));
        // dispatch(uploadImageSketchRequest(bodyrequestTest));
    };


    return (
        <Modal
            open={props.open}
            onOk={handleUploadSketch}
            okText={'Cập nhật'}
            onCancel={()=>{
                props.setOpenModalEdit(false)
            }}
            cancelText={'Hủy'}
            title="Chỉnh sửa bản vẽ"
        >
            <div className="main-upload">
                <div className="upload-area">
                    
                    <Form 
                        initialValues={props.data}
                        form={form} 
                        className="form"
                        {...formItemLayout}
                        layout={formLayout}
                        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}

                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                        >
                                <Input
                                    className="search-input"
                                    placeholder="Nhập tiêu đề"

                                    maxLength={TEXT_INPUT.MAX_LENGTH}
                                />
                        </Form.Item>
                        
                        <Form.Item
                            label="Công cụ"
                            name="productDesignTools"
                        >
                            <Radio.Group
                                className="lst-tool"
                                options={toolList}
                
                            />
                        </Form.Item>

                        <Form.Item
                            label="Kiến trúc"
                            name="productTypeOfArchitecture"
                        >
                            <Radio.Group
                                className="lst-category"
                                options={architectureList}
                       
                            />
                        </Form.Item>
                        
                        <Form.Item
                        label="Giá"
                            name="price"
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
                        label="Mô tả chi tiết"
                            name="content"
                        >
                            <TextArea
                                rows={4}
                                placeholder="Nhập mô tả"
                               
                                maxLength={TEXT_FIELD.MAX_LENGTH}

                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default CModalEditSketch;
