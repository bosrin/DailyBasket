import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./products.css";

// ---------- Baking Needs ----------
import BakeryImage from "../../assets/bakingneedds/bakery_image.png";
import BrownBread from "../../assets/bakingneedds/brown_bread_image.png";
import ButterCroissant from "../../assets/bakingneedds/butter_croissant_image.png";
import ChocolateCake from "../../assets/bakingneedds/chocolate_cake_image.png";
import ChocolateDonut from "../../assets/bakingneedds/ChocolateDonut.png";
import Lobster from "../../assets/bakingneedds/Lobster.png";
import VanillaMuffin from "../../assets/bakingneedds/vanilla_muffins_image.png";
import WholeWheatBread from "../../assets/bakingneedds/whole_wheat_bread_image.png";

// ---------- Chocolates ----------
import ChoImage from "../../assets/Chocolat/cho.jpg";
import ChocolateBar from "../../assets/Chocolat/Chocolate Bar.png";
import Cookies from "../../assets/Chocolat/Cookies.png";
import Eclair from "../../assets/Chocolat/Eclair.png";
import HoneycombCrunch from "../../assets/Chocolat/Honeycomb Crunch Brittle.png";
import SmokedBlue from "../../assets/Chocolat/Smoked Blue.png";

// ---------- Cooking ----------
import Barley from "../../assets/cooking/barley_image.png";
import BasmatiRice from "../../assets/cooking/basmati_rice_image.png";
import BrownRice from "../../assets/cooking/brown_rice_image.png";
import Coffee from "../../assets/cooking/Coffee.png";
import Garlic from "../../assets/cooking/Garlic.png";
import Grain from "../../assets/cooking/grain_image.png";
import Ham from "../../assets/cooking/Ham.png";
import Onion from "../../assets/cooking/onion_image_1.png";
import WheatFlour from "../../assets/cooking/wheat_flour_image.png";

// ---------- Drinks ----------
import CocaCola from "../../assets/Drinks/coca_cola_image.png";
import CoconutWater from "../../assets/Drinks/CoconutWater.png";
import Cola from "../../assets/Drinks/Cola.png";
import EnergyDrink from "../../assets/Drinks/EnergyDrink.png";
import Fanta from "../../assets/Drinks/fanta_image_1.png";
import Lassi from "../../assets/Drinks/Lassi.png";
import Pepsi from "../../assets/Drinks/pepsi_image.png";
import SevenUp from "../../assets/Drinks/seven_up_image_1.png";
import Water from "../../assets/Drinks/Water.png";

// ---------- Fish ----------
import Along from "../../assets/Fish/Along.jpg";
import Boitka from "../../assets/Fish/Boitka.jpg";
import Fish from "../../assets/Fish/Fish.jpg";
import RedSnapper from "../../assets/Fish/Red Snapper.jpg";
import Salmon from "../../assets/Fish/salmon.jpg";
import Shorputi from "../../assets/Fish/Shorputi.jpg";
import Tuna from "../../assets/Fish/tuna.jpg";

// ---------- Frozen ----------
import Butter from "../../assets/frozen/Butter.png";
import EthiopianInjera from "../../assets/frozen/Ethiopian Injera.png";
import Focaccia from "../../assets/frozen/Focaccia.png";
import Ghee from "../../assets/frozen/Ghee.png";
import Paneer2 from "../../assets/frozen/paneer_image_2.png";
import Paneer1 from "../../assets/frozen/paneer_image.png";
import Paneer from "../../assets/frozen/Paneer.png";
import PistachioMarzipan from "../../assets/frozen/Pistachio Marzipan Logs.png";
import TurkeyBreast from "../../assets/frozen/Turkey Breast.png";
import WhiskeyCheddar from "../../assets/frozen/Whiskey Cheddar.png";

// ---------- Fruit ----------
import Apples from "../../assets/Fruit/Apples.png";
import Bananas from "../../assets/Fruit/Bananas.png";
import Grapes from "../../assets/Fruit/Grapes.png";
import Kiwi from "../../assets/Fruit/Kiwi.png";
import Mango from "../../assets/Fruit/mango_image_1.png";
import Mangosteen from "../../assets/Fruit/Mangosteen.png";
import Orange from "../../assets/Fruit/orange_image.png";
import Oranges from "../../assets/Fruit/Oranges.png";
import Papaya from "../../assets/Fruit/Papaya.png";
import PassionFruit from "../../assets/Fruit/Passion Fruit.png";
import Persimmon from "../../assets/Fruit/Persimmon.png";
import Pomelo from "../../assets/Fruit/Pomelo.png";
import Rambutan from "../../assets/Fruit/Rambutan.png";
import StarFruit from "../../assets/Fruit/Star Fruit.png";
import Strawberries from "../../assets/Fruit/Strawberries.png";

// ---------- Meat ----------
import Beef from "../../assets/meat/Beef .jpg";
import BeefKeema from "../../assets/meat/Beef keema.jpg";
import BeefSteak from "../../assets/meat/Beef Steak.png";
import Chicken from "../../assets/meat/Chicken.jpg";
import Lamb from "../../assets/meat/Lamb.jpg";
import LambSteak from "../../assets/meat/Lamp  steak.jpg";

// ---------- Milk/Dairy ----------
import AmulMilk from "../../assets/mlik/amul_milk_image.png";
import DairyProduct from "../../assets/mlik/dairy_product_image.png";
import DragonFruit from "../../assets/mlik/Dragon Fruit.png";
import DragonFruit2 from "../../assets/mlik/DragonFruit.png";
import GrapesMilk from "../../assets/mlik/grapes_image_1.png";
import Milk from "../../assets/mlik/Milk.png";

// ---------- Vegetables ----------
import BellPeppers from "../../assets/vegetables/BellPeppers.png";
import Broccoli from "../../assets/vegetables/Broccoli.png";
import Carrots from "../../assets/vegetables/Carrots.png";
import Cucumber from "../../assets/vegetables/Cucumber.png";
import KiwanoMelon from "../../assets/vegetables/Kiwano Melon.png";
import LadyFinger from "../../assets/vegetables/LadyFinger.png";
import Potato from "../../assets/vegetables/Potato.png";
import Spinach from "../../assets/vegetables/Spinach.png";
import Tomato from "../../assets/vegetables/tomato_image_2.png";

// ---------- Yogurt ----------
import TruffleBrie from "../../assets/Yogurt/Truffle Brie.png";
import Yogurt1 from "../../assets/Yogurt/yogurt_image_1.png";
import Yogurt from "../../assets/Yogurt/Yogurt.png";


const Menu = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.state?.category || "Baking_Needs"
  );

  useEffect(() => {
    if (location.state?.category) {
      setActiveTab(location.state.category);
    }
  }, [location.state]);

  const menuData = {
    Baking_Needs: [
      { name: "Bakery Pack", img: BakeryImage, price: 120 },
      { name: "Brown Bread", img: BrownBread, price: 55 },
      { name: "Butter Croissant", img: ButterCroissant, price: 80 },
      { name: "Chocolate Cake", img: ChocolateCake, price: 250 },
      { name: "Chocolate Donut", img: ChocolateDonut, price: 70 },
      { name: "Lobster", img: Lobster, price: 1200 },
      { name: "Vanilla Muffins", img: VanillaMuffin, price: 90 },
      { name: "Whole Wheat Bread", img: WholeWheatBread, price: 60 },
    ],

    Chocolates: [
      { name: "Classic Cho Pack", img: ChoImage, price: 100 },
      { name: "Chocolate Bar", img: ChocolateBar, price: 80 },
      { name: "Cookies", img: Cookies, price: 120 },
      { name: "Eclair", img: Eclair, price: 50 },
      { name: "Honeycomb Crunch Brittle", img: HoneycombCrunch, price: 150 },
      { name: "Smoked Blue Chocolate", img: SmokedBlue, price: 180 },
    ],

    Cooking: [
      { name: "Barley", img: Barley, price: 90 },
      { name: "Basmati Rice", img: BasmatiRice, price: 160 },
      { name: "Brown Rice", img: BrownRice, price: 140 },
      { name: "Coffee Beans", img: Coffee, price: 200 },
      { name: "Fresh Garlic", img: Garlic, price: 120 },
      { name: "Mixed Grain Pack", img: Grain, price: 180 },
      { name: "Ham Slice Pack", img: Ham, price: 350 },
      { name: "Fresh Onion", img: Onion, price: 60 },
      { name: "Wheat Flour", img: WheatFlour, price: 55 },
    ],

    Drinks: [
      { name: "Coca Cola", img: CocaCola, price: 45 },
      { name: "Coconut Water", img: CoconutWater, price: 60 },
      { name: "Cola", img: Cola, price: 40 },
      { name: "Energy Drink", img: EnergyDrink, price: 120 },
      { name: "Fanta", img: Fanta, price: 45 },
      { name: "Lassi", img: Lassi, price: 35 },
      { name: "Pepsi", img: Pepsi, price: 45 },
      { name: "7UP", img: SevenUp, price: 45 },
      { name: "Mineral Water", img: Water, price: 20 },
    ],

    Fish: [
      { name: "Along Fish", img: Along, price: 350 },
      { name: "Boitka Fish", img: Boitka, price: 300 },
      { name: "Fresh Fish Mix", img: Fish, price: 280 },
      { name: "Red Snapper", img: RedSnapper, price: 600 },
      { name: "Salmon", img: Salmon, price: 900 },
      { name: "Shorputi", img: Shorputi, price: 250 },
      { name: "Tuna", img: Tuna, price: 700 },
    ],

    Frozen: [
      { name: "Butter", img: Butter, price: 120 },
      { name: "Ethiopian Injera", img: EthiopianInjera, price: 200 },
      { name: "Focaccia Bread", img: Focaccia, price: 150 },
      { name: "Ghee", img: Ghee, price: 250 },
      { name: "Paneer Soft", img: Paneer1, price: 180 },
      { name: "Paneer Cubes", img: Paneer2, price: 200 },
      { name: "Paneer Premium", img: Paneer, price: 220 },
      { name: "Pistachio Marzipan Logs", img: PistachioMarzipan, price: 300 },
      { name: "Turkey Breast", img: TurkeyBreast, price: 550 },
      { name: "Whiskey Cheddar", img: WhiskeyCheddar, price: 400 },
    ],

    Fruit: [
      { name: "Apples", img: Apples, price: 150 },
      { name: "Bananas", img: Bananas, price: 70 },
      { name: "Grapes", img: Grapes, price: 180 },
      { name: "Kiwi", img: Kiwi, price: 200 },
      { name: "Mango", img: Mango, price: 120 },
      { name: "Mangosteen", img: Mangosteen, price: 350 },
      { name: "Orange Fresh", img: Orange, price: 130 },
      { name: "Oranges Pack", img: Oranges, price: 140 },
      { name: "Papaya", img: Papaya, price: 100 },
      { name: "Passion Fruit", img: PassionFruit, price: 220 },
      { name: "Persimmon", img: Persimmon, price: 260 },
      { name: "Pomelo", img: Pomelo, price: 180 },
      { name: "Rambutan", img: Rambutan, price: 300 },
      { name: "Star Fruit", img: StarFruit, price: 150 },
      { name: "Strawberries", img: Strawberries, price: 250 },
    ],

    Meat: [
      { name: "Beef", img: Beef, price: 520 },
      { name: "Beef Keema", img: BeefKeema, price: 480 },
      { name: "Beef Steak", img: BeefSteak, price: 650 },
      { name: "Chicken", img: Chicken, price: 300 },
      { name: "Lamb", img: Lamb, price: 750 },
      { name: "Lamb Steak", img: LambSteak, price: 850 },
    ],

    Milk_Dairy: [
      { name: "Amul Milk", img: AmulMilk, price: 80 },
      { name: "Dairy Product Pack", img: DairyProduct, price: 150 },
      { name: "Dragon Fruit", img: DragonFruit, price: 220 },
      { name: "Dragon Fruit (Variant)", img: DragonFruit2, price: 230 },
      { name: "Grapes Milk Shake", img: GrapesMilk, price: 120 },
      { name: "Fresh Milk", img: Milk, price: 75 },
    ],

    Vegetables: [
      { name: "Bell Peppers", img: BellPeppers, price: 120 },
      { name: "Broccoli", img: Broccoli, price: 140 },
      { name: "Carrots", img: Carrots, price: 60 },
      { name: "Cucumber", img: Cucumber, price: 55 },
      { name: "Kiwano Melon", img: KiwanoMelon, price: 250 },
      { name: "Lady Finger", img: LadyFinger, price: 50 },
      { name: "Potato", img: Potato, price: 45 },
      { name: "Spinach", img: Spinach, price: 40 },
      { name: "Tomato", img: Tomato, price: 55 },
    ],

    Yogurt: [
      { name: "Truffle Brie", img: TruffleBrie, price: 400 },
      { name: "Yogurt Classic", img: Yogurt, price: 80 },
      { name: "Yogurt Premium", img: Yogurt1, price: 100 },
    ],
  };

  const categories = Object.keys(menuData);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <section id="menu" className="menu-showcase">
      <h2 className="menu-section-title">DailyBasket</h2>
      <p className="menu-section-sub">
        Fresh essentials and daily needs at the best prices.
      </p>

      <div className="menu-dropdown">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {categories.map((tab) => (
            <option key={tab} value={tab}>
              {tab.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-grid">
        {menuData[activeTab].map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Perfect for your daily grocery needs.</p>
            <div className="price-add">
              <span>৳{item.price}</span>
              <button onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="explore-btn">Explore Full Grocery List</button>
    </section>
  );
};

export default Menu;