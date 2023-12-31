import { useEffect, useState } from "react";
import {VscError} from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId:'dfvdvd',
    photo:'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81YiRc1hHmL._SL1500_.jpg',
    name:'Bhagavad Gita',
    price:2345 ,
    quantity:4,
    stock:30
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal*0.18);
const shippingCharges = 200;
const discount = 100;
const total = subtotal+tax+shippingCharges;

const Cart = () => {
  const [couponCode,setCouponCode] = useState<string>("");
  const [isValidCouponCode,setisValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(()=>{
      if(Math.random()>0.5) setisValidCouponCode(true)
      else setisValidCouponCode(false);
    },1000)
  
    return () => {
      clearTimeout(timeOutId);
      setisValidCouponCode(false);
    }
  }, [couponCode]);//when ever couponCode value changes then it will work
  
  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? (
            cartItems.map((i,idx)=> 
            <CartItem key={idx} cartItem={i}/>
            )
          ) : (<h1>No items added</h1>)
        }
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em> - ₹{discount}</em>
        </p>
        <p>
          <b>Total:₹{total}</b>
        </p>

        <input 
          type="text" 
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e)=>setCouponCode(e.target.value)}
        />

        {
          couponCode && 
          (isValidCouponCode ? (
              <span className="green">
                ₹{discount} off using the <code>{couponCode}</code>
              </span>
            ) : (
              <span className="red">
                Invalid Coupon Code <VscError />
              </span>
            )
          )
        }

        {
          cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart