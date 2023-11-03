export const messageConstants = {
  /*
   * ------ success response messages ------
   */

  // general success message
  SUCCESS: 'Success',

  // consumer related success messages
  SIGNUP_SUCCESS: 'Signup successful',
  LOGIN_SUCCESS: 'Login successful',
  CONSUMER_PROFILE_UPDATED: 'Consumer profile updated successfully',
  CONSUMER_DELETED: 'Consumer deleted successfully',

  PASSWORD_UPDATED: 'Password updated successfully',

  // cart related success messages
  CART_PRODUCT_ADDED: 'Cart product added successfully',
  CART_PRODUCT_UPDATED: 'Cart product updated successfully',
  CART_PRODUCT_DELETED: 'Cart product deleted successfully',

  // wishlist related success messages
  PRODUCT_ADDED_TO_WISHLIST: 'Product added to wishlist successfully',
  PRODUCT_DELETED_FROM_WISHLIST: 'Product deleted from wishlist successfully',

  // order related success messages
  PRODUCT_PURCHASED: 'Product purchased successfully',

  /*
   * ------ fail response messages ------
   */

  // consumer related fail messages
  CONSUMER_ALREADY_EXIST: 'Consumer already exist',
  INVALID_CREDENTIALS: 'Invalid credentials',
  CONSUMER_NOT_EXIST: 'Consumer not exist',
  UNAUTHORIZED: 'You are not authorized',
  FORBIDDEN: 'You are not allow to access',

  PASSWORD_INCORRECT: 'Password is incorrect',

  // product related fail messages
  PRODUCT_NOT_EXIST: 'Product not exist',

  // cart related fail messages
  CART_PRODUCT_NOT_EXIST: 'Cart product not exist',

  // wishlist related fail messages
  WISHLIST_PRODUCT_NOT_EXIST: 'Wishlist product not exist',

  // order related fail messages
  ORDER_NOT_EXIST: 'Order not exist',
};
