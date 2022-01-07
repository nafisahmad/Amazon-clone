import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/81dyhZBpZ5L._SX3000_.jpg"
          alt="Great Indian Festival"
        />

        <div className="home__row">
          <Product
            key="123211341"
            id="123211341"
            title="Samsung Odyssey 27-inch (68.4 cm) 1000R, 144 Hz, 1ms, FreeSync Premium, WQHD Curved Gaming Monitor (LC27G55TQWWXXL, Black)"
            price={25990}
            image="https://m.media-amazon.com/images/I/81cSdJuBbFL._AC_UL480_QL65_.jpg"
            rating={4}
          />

          <Product
            key="123211342"
            id="123211342"
            title="LG Ultragear 27-inch, Nano IPS -True 1 ms, 144 Hz, G-Sync Compatible, HDR 10, QHD Monitor, HDMI x 2,DP, Height Adjust & Pivot Stand - 27GL850 (Black)"
            price={29129.99}
            image="https://m.media-amazon.com/images/I/81ZYbkU1uKL._AC_UL480_QL65_.jpg"
            rating={4}
          />
          {/* product */}
          {/* product */}
        </div>
        <div className="home__row">
          <Product
            key="123211343"
            id="123211343"
            title="Amazon Echo"
            price={1229.99}
            image="https://m.media-amazon.com/images/I/41T60f9Y34L._AC_SY200_.jpg"
            rating={5}
          />
          <Product
            key="123211344"
            id="123211344"
            title="Echo (4th Gen, Black) bundle with Wipro 9W Smart LED color bulb"
            price={5229.99}
            image="https://images-eu.ssl-images-amazon.com/images/I/61wL6cS+qxL._AC_UL160_SR160,160_.jpg"
            rating={3}
          />
          <Product
            key="123211345"
            id="123211345"
            title="wipro NS9300 9 Watts B22 LED Warm White Smart Bulb (Multicolour)"
            price={529.99}
            image="https://m.media-amazon.com/images/I/41eW1mNoLuL._AC_SS250_.jpg"
            rating={4}
          />
          {/* product */}
          {/* product */}
          {/* product */}
        </div>

        <div className="home__row">
          <Product
            key="123211346"
            id="123211346"
            title="The Lean Startup"
            price={229.99}
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.wook.pt%2Fimages%2Flean-startup-eric-ries%2FMXwxNDc4MDc5NnwxMDI2MzA0OHwxMzgzNTIzMjAwMDAw%2F500x&f=1&nofb=1"
            rating={3}
          />
          <Product
            key="123211347"
            id="123211347"
            title="The Psychology of Money"
            price={119.99}
            image="https://m.media-amazon.com/images/I/81cpDaCJJCL._AC_UY327_FMwebp_QL65_.jpg"
            rating={4}
          />
          <Product
            key="123211348"
            id="123211348"
            title="As a Man Thinketh"
            price={99.99}
            image="https://m.media-amazon.com/images/I/81tEgsxpNZS._AC_UY327_FMwebp_QL65_.jpg"
            rating={3}
          />
          <Product
            key="123211349"
            id="123211349"
            title="The Power of Your Subconscious Mind"
            price={149.99}
            image="https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UY327_FMwebp_QL65_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
