export const messageConstants = {
  /*
   * ------ success response messages ------
   */

  // general success message
  SUCCESS: 'Success',

  // common auth related success message
  SIGNUP_SUCCESS: 'Signup successful',
  LOGIN_SUCCESS: 'Login successful',
  PASSWORD_UPDATED: 'Password updated successfully',

  // consumer related success messages
  CONSUMER_PROFILE_UPDATED: 'Consumer profile updated successfully',
  CONSUMER_DELETED: 'Consumer deleted successfully',

  // vendor related success messages
  VENDOR_PROFILE_UPDATED: 'Vendor profile updated successfully',
  VENDOR_DELETED: 'Vendor deleted successfully',

  // admin related success messages
  ADMIN_PROFILE_UPDATED: 'Admin profile updated successfully',

  // product related success messages
  PRODUCT_ADDED: 'Product added successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',

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

  // common auth related fail messages
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'You are not authorized',
  FORBIDDEN: 'You are not allow to access',
  PASSWORD_INCORRECT: 'Password is incorrect',

  // consumer related fail messages
  CONSUMER_ALREADY_EXIST: 'Consumer already exist',
  CONSUMER_NOT_EXIST: 'Consumer not exist',

  // vendor related fail messages
  VENDOR_ALREADY_EXIST: 'Vendor already exist',
  VENDOR_NOT_EXIST: 'Vendor not exist',

  // admin related fail messages
  ADMIN_NOT_EXIST: 'Admin not exist',

  // product related fail messages
  PRODUCT_NOT_EXIST: 'Product not exist',
  BOOKED_ORDER_OF_PRODUCT: 'There are booked orders of this product',

  // cart related fail messages
  CART_PRODUCT_NOT_EXIST: 'Cart product not exist',

  // wishlist related fail messages
  WISHLIST_PRODUCT_NOT_EXIST: 'Wishlist product not exist',

  // order related fail messages
  ORDER_NOT_EXIST: 'Order not exist',
};
