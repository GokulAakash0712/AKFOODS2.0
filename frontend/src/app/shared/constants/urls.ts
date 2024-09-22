//BASE_URL
const BASE_URL = 'http://localhost:3000';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const ALL_USERS_URL = BASE_URL + '/api/users/allusers';

export const ALL_FOODS_URL = BASE_URL + '/api/foods/allfoods';
export const CREATE_FOODS_URL = BASE_URL + '/api/foods/createfoods';
export const FOODS_TAGS_URL = BASE_URL + '/api/foods/tags';
export const FOODS_BY_SEARCH_URL = BASE_URL + '/api/foods/search/';
export const FOODS_BY_TAG_URL = BASE_URL + '/api/foods/tag/';
export const FOODS_BY_ID_URL = BASE_URL + '/api/foods/';
export const UPDATE_FOODS_URL = BASE_URL + '/api/foods/';
export const DELETE_FOODS_URL = BASE_URL + '/api/foods/';
export const RATING_FOOD_URL = BASE_URL + '/api/foods/';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL =
  ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_BY_URL = ORDERS_URL + '/track/';
export const VIEW_ORDER_DETAIL_URL = ORDERS_URL + '/viewOrderDetail/';
export const UPDATE_STATUS_URL = ORDERS_URL + '/deliver/';
export const ALL_ORDERS_URL = ORDERS_URL + '/allOrders';
export const MY_ORDERS_URL = ORDERS_URL + '/myOrders';
