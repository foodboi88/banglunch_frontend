import {
    HomeOutlined
} from "@ant-design/icons";
import { Form, Radio } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ICurrentSearchValue } from "../../common/sketch.interface";
import {
    advancedSearchingRequest,
    getAllFilterCriteriasRequest
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.filter.scss";

interface props {
    authorId?: string;
}

const optionsTools = [
    { label: "Autocad", value: "Autocad" },
    { label: "3D max", value: "3D max" },
    { label: "Revit", value: "Revit" },
    { label: "Sketchup", value: "Sketchup" },
    { label: "Khác", value: "Khác" },
];
const architectureTools = [
    { label: "Biệt thự", value: "Biệt thự" },
    { label: "Nhà phố", value: "Nhà phố" },
    { label: "Nhà xưởng", value: "Nhà xưởng" },
    { label: "Nội thất", value: "Nội thất" },
    { label: "Ngoại thất", value: "Ngoại thất" },
    { label: "món ăn khác", value: "món ăn khác" },
];
const stylesTools = [
    { label: "Cổ điển", value: "Cổ điển" },
    { label: "Hiện đại", value: "Hiển đại" },
];

interface DATA_TRANFER {
    target: string;
    value: string;
}

const CFilter = (props: props) => {
    const dispatch = useDispatchRoot();
    const {
        architectureList,
        currentSearchValue,
    } = useSelectorRoot((state) => state.sketch);
    const [form] = Form.useForm();
    const [selectedArchitecture, setSelectedArchitecture] = useState<string>('');

    useEffect(() => {
        dispatch(getAllFilterCriteriasRequest());
    }, []);

    const handleSearch = (param: DATA_TRANFER) => {
        console.log(param);
        const bodyrequest: ICurrentSearchValue = {
            categoryId:
                param.target === "category"
                    ?
                    param.value
                    : selectedArchitecture,
            name: currentSearchValue.name, // Lay ra gia tri text luu trong redux
        };

        if (param.target === "category") {
            setSelectedArchitecture(param.value);
        }
        console.log(bodyrequest);
        dispatch(advancedSearchingRequest(bodyrequest));
    };

    return (
        <motion.div
            className="main-filter"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Form form={form}>
                <Form.Item className="form-item" name="category">
                    <div className="title">
                        <div className="icon">
                            <HomeOutlined />
                        </div>
                        <div className="text">Danh mục đồ ăn</div>
                    </div>
                    <Radio.Group
                        onChange={(event) =>
                            handleSearch({
                                target: "category",
                                value: event.target.value,
                            })
                        }
                        options={architectureList}
                        value={currentSearchValue.categoryId}
                    />
                </Form.Item>
            </Form>
        </motion.div>
    );
};

export default CFilter;
