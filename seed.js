require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');

const categories = [
  { name: 'Elektronika', description: 'Telefon, noutbuk, planshet va boshqa texnikalar' },
  { name: 'Kiyim-kechak', description: 'Erkaklar, ayollar va bolalar kiyimlari' },
  { name: 'Oziq-ovqat', description: 'Kundalik oziq-ovqat mahsulotlari' },
  { name: 'Maishiy texnika', description: 'Uy-ro\'zg\'or texnikasi' },
  { name: 'Sport', description: 'Sport anjomlar va kiyimlar' },
  { name: 'Kitoblar', description: 'Badiiy, ilmiy va texnik kitoblar' },
  { name: 'Kosmetika', description: 'Parfyumeriya va go\'zallik mahsulotlari' },
  { name: 'Mebel', description: 'Uy va ofis mebellar' },
  { name: 'O\'yinchoqlar', description: 'Bolalar o\'yinchoqlari' },
  { name: 'Avtomobil', description: 'Avtomobil ehtiyot qismlari va aksessuarlar' },
];

const getProducts = (cats) => [
  { name: 'iPhone 15 Pro', description: '256GB, Titanium', price: 12500000, stock: 15, category: cats[0]._id, image: 'iphone15.jpg' },
  { name: 'Samsung Galaxy S24', description: '128GB, Phantom Black', price: 9800000, stock: 20, category: cats[0]._id, image: 'samsung_s24.jpg' },
  { name: 'MacBook Air M2', description: '13 dyuym, 8GB RAM, 256GB SSD', price: 18900000, stock: 8, category: cats[0]._id, image: 'macbook_air.jpg' },
  { name: 'Erkaklar ko\'ylagi', description: 'Oq rang, slim fit, S-XXL', price: 120000, stock: 50, category: cats[1]._id, image: 'shirt.jpg' },
  { name: 'Ayollar ko\'ylagi', description: 'Ko\'k rang, M-XL', price: 95000, stock: 40, category: cats[1]._id, image: 'dress.jpg' },
  { name: 'Nike sneaker', description: 'Air Max 270, 40-45 razmer', price: 850000, stock: 30, category: cats[4]._id, image: 'nike.jpg' },
  { name: 'Futbol to\'pi', description: 'Adidas, 5-razmer', price: 280000, stock: 25, category: cats[4]._id, image: 'football.jpg' },
  { name: 'Samsung tovar muzlatgich', description: '350L, No Frost', price: 6500000, stock: 10, category: cats[3]._id, image: 'fridge.jpg' },
  { name: 'LG kir yuvish mashinasi', description: '7kg, 1400 aylanma', price: 4800000, stock: 12, category: cats[3]._id, image: 'washer.jpg' },
  { name: 'O\'zbek tili lug\'ati', description: 'To\'liq akademik nashr, 800 bet', price: 75000, stock: 100, category: cats[5]._id, image: 'book.jpg' },
  { name: 'Dasturlash asoslari', description: 'Python, JavaScript, Java', price: 95000, stock: 60, category: cats[5]._id, image: 'programming_book.jpg' },
  { name: 'Parfyum - Chanel No5', description: '50ml, ayollar uchun', price: 1200000, stock: 18, category: cats[6]._id, image: 'chanel.jpg' },
  { name: 'Yuz kremi', description: 'SPF 50, 50ml', price: 180000, stock: 45, category: cats[6]._id, image: 'cream.jpg' },
  { name: 'Yotoq xonasi to\'plami', description: '2 kishilik karavot + 2 tungi stol', price: 5500000, stock: 5, category: cats[7]._id, image: 'bedroom.jpg' },
  { name: 'LEGO konstruktor', description: '500 qism, 6+ yosh', price: 350000, stock: 35, category: cats[8]._id, image: 'lego.jpg' },
  { name: 'Avtomobil yog\'i', description: 'Mobil 1, 5W-30, 4L', price: 320000, stock: 80, category: cats[9]._id, image: 'oil.jpg' },
  { name: 'Non', description: 'Yangi pishirilgan, 500g', price: 8000, stock: 200, category: cats[2]._id, image: 'bread.jpg' },
  { name: 'Sut', description: 'Toza sut, 1L', price: 12000, stock: 150, category: cats[2]._id, image: 'milk.jpg' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log('Old data cleared');

  const createdCats = await Category.insertMany(categories);
  console.log(`${createdCats.length} ta kategoriya qo'shildi`);

  const products = getProducts(createdCats);
  const createdProds = await Product.insertMany(products);
  console.log(`${createdProds.length} ta mahsulot qo'shildi`);

  console.log('\nKategoriyalar:');
  createdCats.forEach(c => console.log(`  [${c._id}] ${c.name}`));

  await mongoose.disconnect();
  console.log('\nSeed muvaffaqiyatli yakunlandi!');
}

seed().catch(err => { console.error(err); process.exit(1); });
