import { Form, Input, Modal, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { IUploadSketchRequest } from "../../common/sketch.interface";
import { TEXT_FIELD, TEXT_INPUT } from "../../enum/common.enum";
import { editSketchRequest, getAllArchitecturesRequest } from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";



interface MyProps{
    open: boolean;
    data?: IUploadSketchRequest;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

type LayoutType = Parameters<typeof Form>[0]['layout'];


const CModalEditSketch = (props: MyProps) => {
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    const { architectureList } = useSelectorRoot((state) => state.sketch); // Lst cac ban ve        
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
        dispatch(getAllArchitecturesRequest())
        console.log(props.data)
    }, [])


    const handleUploadSketch = () => {
        console.log(form.getFieldsValue())
        const bodyrequest = {...form.getFieldsValue(),id: props?.data?.id}
        dispatch(editSketchRequest(bodyrequest));
        props.setOpenModalEdit(false)
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
            title="Chỉnh sửa món ăn"
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
                            label="Loại đồ ăn"
                            name="category"
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
