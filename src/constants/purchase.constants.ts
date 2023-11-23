export const VnpayResponseCode = [
    {
        code: '00',
        content: 'Giao dịch thành công'
    },
    {
        code: '07',
        content: 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).'
    },
    {
        code: '09',
        content: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.'
    },
    {
        code: '10',
        content: 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần'
    },
    {
        code: '11',
        content: 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.'
    },
    {
        code: '12',
        content: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.'
    },
    {
        code: '13',
        content: 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.'
    },
    {
        code: '24',
        content: 'Giao dịch không thành công do: Khách hàng hủy giao dịch'
    },
    {
        code: '51',
        content: 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.'
    },
    {
        code: '65',
        content: '	Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.'
    },
    {
        code: '75',
        content: 'Ngân hàng thanh toán đang bảo trì.'
    },
    {
        code: '79',
        content: 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch'
    },
    {
        code: '99',
        content: 'Giao dịch thất bại'
    },
]