import { Checkbox, Col, Form, Radio, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import "./styles.filter.scss";
import React, { useEffect, useState } from "react";
import {
    FormatPainterOutlined,
    HomeOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import {
    advancedSearchingRequest,
    getAllFilterCriteriasRequest,
    getAllToolsRequest,
} from "../../redux/controller";
import { IReqGetAllTools } from "../../common/tool.interface";

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
    { label: "Bản vẽ khác", value: "Bản vẽ khác" },
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
        toolList,
        architectureList,
        styleList,
        filteredSketchs,
        filteredAuthors,
        currentSearchValue,
    } = useSelectorRoot((state) => state.sketch);
    const [form] = Form.useForm();
    const [selectedTool, setSelectedTool] = useState<string>('');
    const [selectedArchitecture, setSelectedArchitecture] = useState<string>('');
    const [selectedStyle, setSelectedStyle] = useState<string>('');

    useEffect(() => {
        dispatch(getAllFilterCriteriasRequest());
    }, []);

    const handleSearch = (param: DATA_TRANFER) => {
        console.log(param);
        const bodyrequest = {
            tool: param.target === "tool" ? param.value : selectedTool,
            architecture:
                param.target === "architecture"
                    ?
                    param.value
                    : selectedArchitecture,
            style: param.target === "style" ? param.value : selectedStyle,
            name: currentSearchValue.name, // Lay ra gia tri text luu trong redux
            authorId: props.authorId ? props.authorId : ''
        };

        if (param.target === "tool") setSelectedTool(param.value);
        if (param.target === "architecture")
            setSelectedArchitecture(param.value);
        if (param.target === "style") setSelectedStyle(param.value);
        console.log(bodyrequest);

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
                <Form.Item className="form-item" name="tool">
                    <div className="title">
                        <div className="icon">
                            <ToolOutlined />
                        </div>
                        <div className="text">Công cụ</div>
                    </div>
                    <Radio.Group
                        onChange={(event) =>
                            handleSearch({
                                target: "tool",
                                value: event.target.value
                            })
                        }
                        options={toolList}
                        value={currentSearchValue.tool}
                    />
                </Form.Item>
                <Form.Item className="form-item" name="architecture">
                    <div className="title">
                        <div className="icon">
                            <HomeOutlined />
                        </div>
                        <div className="text">Kiến trúc</div>
                    </div>
                    <Radio.Group
                        onChange={(event) =>
                            handleSearch({
                                target: "architecture",
                                value: event.target.value,
                            })
                        }
                        options={architectureList}
                        value={currentSearchValue.architecture}
                    />
                </Form.Item>
                <Form.Item className="form-item" name="style">
                    <div className="title">
                        <div className="icon">
                            <FormatPainterOutlined />
                        </div>
                        <div className="text">Phong cách</div>
                    </div>
                    <Radio.Group
                        onChange={(event) =>
                            handleSearch({
                                target: "style",
                                value: event.target.value
                            })
                        }
                        options={styleList}
                        value={currentSearchValue.style}
                    />
                </Form.Item>
            </Form>
        </motion.div>
    );
};

export default CFilter;
