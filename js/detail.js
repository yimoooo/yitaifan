// 从 URL 获取商品 ID
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// 获取页面元素
const productLogo = document.getElementById("productLogo");
const productTitle = document.getElementById("productTitle");
const originalPrice = document.getElementById("originalPrice");
const currentPrice = document.getElementById("currentPrice");
const discount = document.getElementById("discount");
const productDetail = document.getElementById("productDetail");

// 加载商品详情
async function loadProductDetail() {
  try {
    const res = await http.get("/goods/item", { params: { id } });

    if (res.data.code === 1) {
      const info = res.data.info;

      // 更新页面内容
      document.title = info.title;
      productLogo.src = info.img_big_logo;
      productLogo.alt = info.title;
      document.querySelector(".product-name").textContent = info.title;
      originalPrice.textContent = info.price;
      currentPrice.textContent = info.current_price;
      discount.textContent = info.sale_type;

      // 插入商品详情
      productDetail.innerHTML = info.goods_introduce;
    }
  } catch (error) {
    console.error("获取商品详情失败:", error);
  }
}

// 页面加载时获取商品详情
loadProductDetail();
