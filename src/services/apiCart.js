import axios from "axios";
const baseURL = "https://ecommerce.routemisr.com/api/v1/";

// add product to cart
export async function addCartItem(productId) {
  try {
    const { data } = await axios.post(
      `${baseURL}cart`,
      { productId },
      { headers: { token: localStorage.getItem("myToken") } }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all products cart
export async function getProductsCart() {
  try {
    const { data } = await axios.get(`${baseURL}cart`, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// delete product from cart
export async function deleteCartItem(id) {
  try {
    const { data } = await axios.delete(`${baseURL}cart/${id}`, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// clear cart products
export async function clearCart() {
  try {
    const { data } = await axios.delete(`${baseURL}cart`, {
      headers: { token: localStorage.getItem("myToken") },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// update cart product
export async function updateCartItem({ id, count }) {
  try {
    const { data } = await axios.put(
      `${baseURL}cart/${id}`,
      { count },
      { headers: { token: localStorage.getItem("myToken") } }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// cash payment
export async function createCashOrder({ id, values }) {
  try {
    const { data } = await axios.post(
      `${baseURL}orders/${id}`,
      { shippingAddress: values },
      { headers: { token: localStorage.getItem("myToken") } }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// online payment
export async function createOnlineOrder({ id, values }) {
  try {
    const { data } = await axios.post(
      `${baseURL}orders/checkout-session/${id}`,
      { shippingAddress: values },
      {
        headers: { token: localStorage.getItem("myToken") },
        params: { url: "https://fresh-cart-react.netlify.app" },
      }
    );
    window.open(data.session.url, "_self");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
