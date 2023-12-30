import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

//rafce
const Home = () => {
  const addToCartHandler = ()=>{};
  return (
    <div className="home">
      <section></section>

      <h1>Latest Products <Link to="/search" className="findmore">More</Link></h1>
      <main>
        <ProductCard 
          productId='dfvdvd'
          photo='https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81YiRc1hHmL._SL1500_.jpg'
          name='Bhagavad Gita'
          price={2345} 
          stock={121} 
          handler = {addToCartHandler}
        />
      </main>
    </div>
  )
}

export default Home