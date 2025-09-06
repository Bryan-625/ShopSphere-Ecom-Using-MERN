import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

let all_product = [
  {
    id: 1,
    name: "Women's Faux Fur Sherpa Jacket",
    category: "women",
    image: p1_img,
    new_price: 799,
    old_price: 1199,
    description: "Stay cozy and chic in this faux fur sherpa jacket, designed for warmth and elegance during colder days."
  },
  {
    id: 2,
    name: "Women's Light Pink Ribbed Scoop-Neck Top",
    category: "women",
    image: p2_img,
    new_price: 999,
    old_price: 1499,
    description: "A flattering ribbed scoop-neck top in soft pink, perfect for layering or casual wear."
  },
  {
    id: 3,
    name: "Women's Colorblock Sports Bra",
    category: "women",
    image: p3_img,
    new_price: 899,
    old_price: 1399,
    description: "A supportive sports bra featuring a trendy colorblock design, ideal for active workouts and yoga."
  },
  {
    id: 4,
    name: "Women's Printed Ruffled Peplum Top",
    category: "women",
    image: p4_img,
    new_price: 1299,
    old_price: 1899,
    description: "A lightweight peplum top with a vibrant print and ruffled accents for a playful, feminine look."
  },
  {
    id: 5,
    name: "Women's Flutter-Sleeve V-Neck Top",
    category: "women",
    image: p5_img,
    new_price: 999,
    old_price: 1499,
    description: "An elegant V-neck top with delicate flutter sleeves, suitable for both office wear and casual outings."
  },
  {
    id: 6,
    name: "Women's Ribbed Rust Peplum Blouse",
    category: "women",
    image: p6_img,
    new_price: 1099,
    old_price: 1599,
    description: "A stylish ribbed blouse in rustic orange with a flattering peplum hem, perfect for chic everyday fashion."
  },
  {
    id: 7,
    name: "Women's White Ribbed Mock Neck Top",
    category: "women",
    image: p7_img,
    new_price: 849,
    old_price: 1299,
    description: "A versatile ribbed mock-neck top in crisp white, great for layering or minimalist styling."
  },
  {
    id: 8,
    name: "Women's Black & White Floral V-Neck Blouse",
    category: "women",
    image: p8_img,
    new_price: 949,
    old_price: 1399,
    description: "A floral V-neck blouse blending classic black and white, offering elegance with a modern touch."
  },
  {
    id: 9,
    name: "Women's Red Floral Flutter-Sleeve Top",
    category: "women",
    image: p9_img,
    new_price: 899,
    old_price: 1299,
    description: "A red floral V-neck blouse with flutter sleeves, ideal for casual brunches or evening outings."
  },
  {
    id: 10,
    name: "Women's Striped Rust Peplum Top",
    category: "women",
    image: p10_img,
    new_price: 799,
    old_price: 1199,
    description: "A striped peplum top in warm rust tones, combining comfort with stylish detail."
  },
  {
    id: 11,
    name: "Women's Black Cami Bralette",
    category: "women",
    image: p11_img,
    new_price: 999,
    old_price: 1499,
    description: "A sleek black cami bralette offering comfort and style, perfect for layering or standalone wear."
  },
  {
    id: 12,
    name: "Women's Black Crew Neck Long-Sleeve Tee",
    category: "women",
    image: p12_img,
    new_price: 899,
    old_price: 1399,
    description: "A classic black crew-neck long-sleeve top, a timeless wardrobe essential."
  },
  {
    id: 13,
    name: "Men's Classic Green Bomber Jacket",
    category: "men",
    image: p13_img,
    new_price: 1999,
    old_price: 2999,
    description: "A timeless bomber jacket in rich green, crafted for everyday style and comfort."
  },
  {
    id: 14,
    name: "Men's Colorblock Varsity Jacket",
    category: "men",
    image: p14_img,
    new_price: 2099,
    old_price: 3199,
    description: "A varsity-inspired jacket with bold colorblocking for a sporty, youthful look."
  },
  {
    id: 15,
    name: "Men's Abstract Camo Bomber Jacket",
    category: "men",
    image: p15_img,
    new_price: 2199,
    old_price: 3299,
    description: "A bomber jacket with a unique abstract camouflage design, perfect for making a statement."
  },
  {
    id: 16,
    name: "Men's Urban Hooded Colorblock Jacket",
    category: "men",
    image: p16_img,
    new_price: 1999,
    old_price: 2899,
    description: "A modern hooded jacket with bold urban-inspired color blocks."
  },
  {
    id: 17,
    name: "Men's Classic Blue Denim Jacket",
    category: "men",
    image: p17_img,
    new_price: 1899,
    old_price: 2799,
    description: "A durable blue denim jacket, perfect for layering across seasons."
  },
  {
    id: 18,
    name: "Men's Casual Grey Pullover Hoodie",
    category: "men",
    image: p18_img,
    new_price: 2299,
    old_price: 3399,
    description: "A cozy grey hoodie with a relaxed fit, ideal for casual and everyday wear."
  },
  {
    id: 19,
    name: "Men's White Textured Striped Bomber",
    category: "men",
    image: p19_img,
    new_price: 1999,
    old_price: 2999,
    description: "A lightweight bomber jacket in white with subtle textured stripes, blending class with comfort."
  },
  {
    id: 20,
    name: "Men's Navy Crew Neck Sweatshirt",
    category: "men",
    image: p20_img,
    new_price: 2199,
    old_price: 3299,
    description: "A casual navy-blue sweatshirt with a relaxed crew neck fit for daily wear."
  },
  {
    id: 21,
    name: "Men's Outdoor Hiking Jacket",
    category: "men",
    image: p21_img,
    new_price: 1899,
    old_price: 2799,
    description: "A functional hiking jacket designed for durability and comfort in the outdoors."
  },
  {
    id: 22,
    name: "Men's White Puffer Jacket",
    category: "men",
    image: p22_img,
    new_price: 2099,
    old_price: 3199,
    description: "A warm white puffer jacket built for insulation and winter-ready style."
  },
  {
    id: 23,
    name: "Men's Layered Denim Jacket with Hoodie",
    category: "men",
    image: p23_img,
    new_price: 1999,
    old_price: 2899,
    description: "A denim jacket with a built-in hoodie, offering a cool layered streetwear look."
  },
  {
    id: 24,
    name: "Men's Black Faux Leather Moto Jacket",
    category: "men",
    image: p24_img,
    new_price: 1899,
    old_price: 2799,
    description: "A moto-style faux leather jacket in black, featuring zip details for a rugged edge."
  },
  {
    id: 25,
    name: "Boys' Blue Hoodie with Lemon Graphic",
    category: "kid",
    image: p25_img,
    new_price: 599,
    old_price: 999,
    description: "A playful blue hoodie with a fun lemon graphic, adding a pop of color for kids."
  },
  {
    id: 26,
    name: "Boys' Black Graphic Hoodie",
    category: "kid",
    image: p26_img,
    new_price: 699,
    old_price: 1099,
    description: "A black hoodie featuring a bold front graphic, perfect for casual wear."
  },
  {
    id: 27,
    name: "Boys' Colorblock Striped Hoodie",
    category: "kid",
    image: p27_img,
    new_price: 649,
    old_price: 1049,
    description: "A trendy hoodie with striped colorblocks, giving kids a sporty casual look."
  },
  {
    id: 28,
    name: "Boys' Green Crew Neck Sweatshirt",
    category: "kid",
    image: p28_img,
    new_price: 799,
    old_price: 1199,
    description: "A soft green sweatshirt with a crew neckline for everyday comfort."
  },
  {
    id: 29,
    name: "Boys' Navy Logo Sweatshirt",
    category: "kid",
    image: p29_img,
    new_price: 749,
    old_price: 1149,
    description: "A navy sweatshirt with a bold graphic logo, perfect for active kids."
  },
  {
    id: 30,
    name: "Boys' Zip-Up Windbreaker Jacket",
    category: "kid",
    image: p30_img,
    new_price: 699,
    old_price: 1099,
    description: "A lightweight windbreaker with a zip-up front, designed for outdoor play."
  },
  {
    id: 31,
    name: "Boys' Blue Denim Jacket",
    category: "kid",
    image: p31_img,
    new_price: 599,
    old_price: 999,
    description: "A durable denim jacket for boys, offering a classic and timeless style."
  },
  {
    id: 32,
    name: "Boys' Blue Pullover Sweatshirt",
    category: "kid",
    image: p32_img,
    new_price: 699,
    old_price: 1099,
    description: "A comfy pullover sweatshirt in blue, perfect for school and playtime."
  },
  {
    id: 33,
    name: "Boys' Blue & White Logo Sweatshirt",
    category: "kid",
    image: p33_img,
    new_price: 649,
    old_price: 1049,
    description: "A stylish sweatshirt with bold blue and white contrast, featuring a sporty logo design."
  },
  {
    id: 34,
    name: "Boys' Dark Blue Jacket",
    category: "kid",
    image: p34_img,
    new_price: 799,
    old_price: 1199,
    description: "A sleek dark blue jacket offering warmth and style for kids."
  },
  {
    id: 35,
    name: "Boys' Black & Orange Colorblock Hoodie",
    category: "kid",
    image: p35_img,
    new_price: 749,
    old_price: 1149,
    description: "A fun black hoodie with orange colorblocks, designed for playful, energetic kids."
  },
  {
    id: 36,
    name: "Boys' Black & White Striped Jacket",
    category: "kid",
    image: p36_img,
    new_price: 699,
    old_price: 1099,
    description: "A black and white striped jacket with a sporty vibe, perfect for casual layering."
  },
  
];

export default all_product;
