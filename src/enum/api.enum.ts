export enum API_URL {
    HOST = "http://vroteam.online:6068",
    GET_LATEST_SKETCH = "products/home/latest",
    GET_MOST_VIEWS_SKETCH = "products/home/most-views",
    GET_SKETCHS_BY_ARCHITECTURE = "products/by-type-of-architecture",
    GET_SKETCH_BY_TYPE = "products/home",
    GET_ALL_TOOLS = "design-tools",
    GET_ALL_ARCHITECTURE = "type-of-architectures",
    GET_ALL_STYLE = "design-styles",
    GET_DETAIL_SKETCH = "products/by-id",
    GET_COMMENTS_BY_SKETCH_ID = "comments",
    ADVANCED_SEARCHING = "products/filter",
    UPLOAD_IMAGE_OF_SKETCH = "product-images",
    UPLOAD_CONTENT_OF_SKETCH = "products",
    UPLOAD_FILES_OF_SKETCH = "product-files",
    LOGIN = "users/login",
    REGISTER = "users/register",
    REFRESH_TOKEN = "users/refreshtoken",
    GET_USER_INFO = "users/profile",
    CHANGE_PASSWORD = "users/changepassword",

    GET_SELLER_INFO = "sellers/profile",
    GET_RATES_BY_SKETCH_ID = "rates/get-all-rate",
    GET_PRODUCT_FILE_BY_ID = "product-files/by-id-product",
    ADD_SKETCH_TO_CART = "Carts/add-product-to-cart", // Thêm bản vẽ vào giỏ hàng
    GET_SKETCH_QUANTITY_IN_CART = "Carts/get-quantity-product-my-cart",
    GET_ALL_SKETCH_IN_CART = "Carts/get-product-in-my-cart",
    PAYMENT = "VNPays/create-payment-url-payment-cart",
    GET_AUTHOR_BY_ID = "shop/profile",
    GET_SKETCH_LIST_BY_AUTHOR_ID = "shop/get-all-products-by-shop-id",
    DELETE_SKETCH_IN_CART = "Carts/delete-one-product",
    GET_BUSINESS = "https://api.vietqr.io/v2/business",
    SELLER_REGISTER = "sellers/register",
    WITHDRAW_REQUEST = "withdrawal-requests/seller",
    CREATE_WITHDRAW_REQUEST = "withdrawal-requests",
    GET_BILL_LIST = "/order",
    VNPAY_RETURN = "VNPays/vnpay_return",
    GET_OVERVIEW_STATISTIC = "architect/overview-statistic",
    GET_HOT_PRODUCTS = "architect/overview-top-hot-product",
    GET_BILL = "architect/get-all-order-by-seller",
    GET_BILL_DETAIL = "architect/order",
    SKETCH_MANAGEMENT = "architect/product-management",
    DELETE_PRODUCT = "products/delete-product-by-id",
    EDIT_PRODUCT = "products/edit-product",
    STATISTIC_PRODUCT = "architect/statistic-product-management",

    OVERVIEW_STATISTIC = "Admin/overview-statistic",
    STATISTIC_SKETCH = "Admin/statistic-products",
    OVERVIEW_STATISTIC_DAY = "architect/overview-statistic-day",
    OVERVIEW_STATISTIC_MONTH = "architect/overview-statistic-month",
    OVERVIEW_STATISTIC_QUARTER = "architect/overview-statistic-quarter",
    OVERVIEW_STATISTIC_YEAR = "architect/overview-statistic-year",
    USER_STATISTIC_DAY = "Admin/get-user-day",
    SELLER_STATISTIC_DAY = "Admin/get-seller-day",

    GET_BANKS = "https://api.vietqr.io/v2/banks",
    GET_ACCOUNT_BANK_NAME = "https://api.vietqr.io/v2/lookup",
    GET_PURCHASED_SKETCHS = "orders/product-purchased-product/all-role"

}
