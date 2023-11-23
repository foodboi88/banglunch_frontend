import { Space, Modal, Button, Input, Form, Popover, notification } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { useSelectorRoot, useDispatchRoot } from '../../../redux/store';
import { IGetWithdrawRequest } from '../../../common/user.interface';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { createWithdrawRequest, getSellerProfileRequest, getWithdrawRequests } from '../../../redux/controller';
import CoinIcon from '../../../images/coin.png'
import { AiFillCreditCard } from "react-icons/ai";


import './seller-withdraw.styles.scss'
import TotalBox from '../../../components/TotalBox/TotalBox';

const SellerWithdraw = () => {
  const {
    withdrawRequestList,
    totalWithdrawRequestRecord,
    sellerInformation
  } = useSelectorRoot((state) => state.sketch);

  const dispatch = useDispatchRoot()
  const [textSearch, setTextSearch] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [detailWithdraw, setDetailWithdraw] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openPopover, setOpenPopover] = useState(false)
  const [form] = Form.useForm();


  const [currentSearchValue, setCurrentSearchValue] = useState<IGetWithdrawRequest>(
    {
      size: QUERY_PARAM.size,
      offset: 0
    }
  )

  useEffect(() => {
    dispatch(getWithdrawRequests(currentSearchValue))
    dispatch(getSellerProfileRequest())
  }, [])

  const columns: ColumnType<any>[] = [
    // {
    //     title: 'Tình trạng',
    //     dataIndex: 'status',
    //     key: 'status'
    //   },
    {
      title: 'Số thứ tự',
      render: (_, __, rowIndex) => (
        <span className='span-table'>{rowIndex + 1}</span>
      )
    },
    {
      title: 'Mã yêu cầu',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tình trạng xử lý',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        if (record.status === "APPROVED") {
          return (<span>Đã chuyển</span>)
        }
        else if(record.status === "REJECTED") {
          return (<span>Từ chối</span>)
        }
        else {
          return (<span>Đang xử lý</span>)
        }
      }
    },
    {
      title: 'Lượng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => (
        <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.amount)} đ</span>
      )
    },
    {
      title: 'Thời gian tạo yêu cầu',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
      )
    },


    //   {
    //     title: 'updatedAt',
    //     dataIndex: 'updatedAt',
    //     key: 'updatedAt',
    // },

    // {
    //   title: 'Tên',
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    // {
    //   title: 'Địa chỉ',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    // {
    //   title: 'Loại tài khoản',
    //   dataIndex: 'sellerType',
    //   key: 'sellerType',
    //   render: (_, record) => {
    //     if (record.sellerType === "ARCHITECT") {
    //       return (<span>Kiến trúc sư</span>)
    //     }
    //     else {
    //       return (<span>Công ty</span>)
    //     }
    //   }
    // },
    // {
    //   title: 'Địa chỉ',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    //   {
    //     title: 'dob',
    //     dataIndex: 'dob',
    //     key: 'dob',
    //   },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={(event) => handleOpenDelete(record)}>Xóa</a>
    //     </Space>
    //   ),
    // },
  ];

  // let statisticalUser = [
  //   {
  //       title: "Tổng số bản vẽ toàn sàn",
  //       number: sketchStatistic?.totalSketch ? sketchStatistic?.totalSketch : 0,
  //       icon: UserIcon,
  //   },

  //   {
  //       title: "Tổng số bản vẽ mới",
  //       number: sketchStatistic?.totalNewSketch ? sketchStatistic?.totalNewSketch : 0,
  //       icon: UserMinus,
  //   },
  // ]


  const handleOpenDelete = (record: any) => {
    setOpenModalDelete(true);
  }

  const handleCreate = () => {

    if (form.getFieldValue('amount')) {
      const bodyrequest = {

        amount: form.getFieldValue('amount'),
        additionalProp1: {},
        currentSearchValue: currentSearchValue
      }
      dispatch(createWithdrawRequest(bodyrequest));
      setOpenModalCreate(false);
      setOpenPopover(false)

      form.resetFields();
    } else {
      notification.open({
        message: "Vui lòng nhập đầy đủ thông tin yêu cầu rút tiền",
        // description:
        //     action.payload.response.message,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }

  }

  const onChangeInput = (event: any) => {
    setTextSearch(event.target.value);
  }

  const onChangeRangePicker = (event: any) => {
    if (event) {
      setBeginDate(event[0].format('YYYY-MM-DD'))
      setEndDate(event[1].format('YYYY-MM-DD'))
    }
  }

  const onSearch = () => {
    console.log('hehee')
    const body: IGetWithdrawRequest = {
      size: QUERY_PARAM.size,
      offset: 0,
      search: textSearch,
      startTime: beginDate,
      endTime: endDate,
      status: '',
      sortBy: '',
      sortOrder: '',
    };
    const finalBody = Utils.getRidOfUnusedProperties(body)
    setCurrentSearchValue(finalBody);
    dispatch(getWithdrawRequests(finalBody))
  }

  const onChangePagination = (event: any) => {
    currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
    setCurrentSearchValue(currentSearchValue);
    dispatch(getWithdrawRequests(currentSearchValue))
    document.body.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <motion.div className='withdraw-main'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {
        openModalCreate &&
        <div className='approve-request-modal'>
          <Modal
            open={openModalCreate}

            title={"Tạo yêu cầu rút tiền"}
            closable={true}
            onCancel={() => setOpenModalCreate(false)}
            footer={false}

          >

            <Form
              name="basic"
              form={form}

              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleCreate}
              autoComplete="off"
            >
              <Form.Item
                label="Thời gian"
                name="time"
              >
                <Input readOnly={true} />
              </Form.Item>
              <Form.Item
                label="Lượng tiền muốn rút"
                name="amount"
                rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Ghi chú"
                name="note"
              >
                <Input.TextArea />
              </Form.Item>



              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Popover content={(
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleCreate} type="primary">Xác nhận</Button>
                    <Button onClick={() => {
                      setOpenPopover(false)
                    }}>Hủy</Button>

                  </div>
                )} title="Bạn có xác nhận tạo yêu cầu hay không?" trigger="click" open={openPopover}>
                  <Button type="primary" onClick={() => {
                    setOpenPopover(true)
                  }}>Tạo yêu cầu</Button>
                </Popover>

              </Form.Item>
            </Form>

          </Modal>
        </div>
      }
      {
        openModalDelete &&
        <div className='approve-request-modal'>
          <Modal
            open={openModalDelete}
            // onOk={() => setOpenModalDelete(false)}
            okText={'Xác nhận'}
            cancelText={'Hủy'}
            closable={true}
            onCancel={() => setOpenModalDelete(false)}
          >
            <span>Bạn có chắc chắn muốn xóa yêu cầu này không?</span>
          </Modal>
        </div>
      }
      <div className='create-request'>
        <div className='infor-cards'>
          <div>
            <div>Tài khoản nhận:</div>
            <div>{sellerInformation?.bankName}</div>
          </div>
          <div>
            <div>Số tài khoản:</div>
            <div>{sellerInformation?.bankAccountNumber ? sellerInformation?.bankAccountNumber : ''}</div>
          </div>
          <div>
            <div>Chi nhánh ngân hàng:</div>
            <div>{sellerInformation?.bankBranch ? Utils.formatMoney(sellerInformation?.bankBranch) : ''}</div>
          </div>
          <div>
            <div>Số dư hiện tại:</div>
            <div>{sellerInformation?.currentBalance ? Utils.formatMoney(sellerInformation?.currentBalance) : 0} VND</div>
          </div> 
          <div>
            <div>Số tiền đã lĩnh:</div>
            <div>{sellerInformation?.currentBalance ? Utils.formatMoney(sellerInformation?.currentBalance) : 0} VND</div>
          </div>



        </div>

      </div>
      <Button
        onClick={
          () => {
            form.setFieldValue('time', new Date().toLocaleDateString('en-GB'))
            setOpenModalCreate(true)
          }
        }

        style={{
          marginTop: "30px"
        }}
      >
        Tạo yêu cầu rút tiền
      </Button>
      <div className='table-area'>
        <CTable
          tableMainTitle='Danh sách yêu cầu rút tiền'
          allowDateRangeSearch={true}
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onChangeRangePicker={onChangeRangePicker}
          onSearch={onSearch}
          data={withdrawRequestList}
          titleOfColumnList={columns}
          totalRecord={totalWithdrawRequestRecord}
          onChangePagination={onChangePagination}
        />
      </div>
    </motion.div>
  )
}

export default SellerWithdraw