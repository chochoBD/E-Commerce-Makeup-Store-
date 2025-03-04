import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  if (e?.stopPropagation && e?.preventDefault) {
    e.stopPropagation();
    e.preventDefault();
  }
  const response = await fetch(SummaryApi.addToCart.url, {
    method: SummaryApi.addToCart.method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId: id })
  });

  const ResponseData = await response.json();
  
  if (ResponseData.success) {
    toast.success(ResponseData.message);
  } else if (ResponseData.error) {
    toast.error(ResponseData.message);
  }
  return ResponseData
};

export default addToCart;
