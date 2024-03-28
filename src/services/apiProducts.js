import axios from "axios";

const baseURL = "https://ecommerce.routemisr.com/api/v1/";

// get all products
export async function getAllProducts(page) {
  try {
    const { data } = await axios.get(`${baseURL}products?page=${page}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// get specific product
export async function getSpecificProduct(id) {
  try {
    const { data } = await axios.get(`${baseURL}products/${id}`);
    return { data };
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all products wishlist
export async function getWishlist() {
  try {
    const { data } = await axios.get(`${baseURL}wishlist`, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// add product to wishlist
export async function addWishlistItem(productId) {
  try {
    const { data } = await axios.post(
      `${baseURL}wishlist`,
      { productId },
      { headers: { token: localStorage.getItem("myToken") } }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// delete product from wishlist
export async function deleteWishlistItem(id) {
  try {
    const { data } = await axios.delete(`${baseURL}wishlist/${id}`, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all categories
export async function getAllCategories() {
  try {
    const { data } = await axios.get(`${baseURL}categories`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all brands
export async function getAllBrands() {
  try {
    const { data } = await axios.get(`${baseURL}brands`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// get orders
export async function getOrders(id) {
  try {
    const { data } = await axios.get(`${baseURL}orders/user/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// get addresses
export async function getAddresses() {
  try {
    const { data } = await axios.get(`${baseURL}addresses`, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// add new address
export async function addAddress(values) {
  try {
    const { data } = axios.post(`${baseURL}addresses`, values, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// delete specific address
export async function deleteAddress(id) {
  try {
    const { data } = axios.delete(`${baseURL}addresses/${id}`, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
