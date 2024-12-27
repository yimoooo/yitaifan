let current = 1;
let pageSize = 12;
let total = 0;

// 获取DOM元素
const goodsContainer = document.querySelector(".goods-container");
const currentPageInput = document.querySelector(".current-page");
const totalPagesSpan = document.querySelector(".total-pages");
const pageSizeSelect = document.querySelector(".page-size");

// 加载商品列表
async function loadGoods() {
  try {
    const res = await http.get("/goods/list", {
      params: {
        current,
        pagesize: pageSize,
      },
    });

    if (res.data.code === 1) {
      renderGoods(res.data.list);
      total = res.data.total;
      totalPagesSpan.textContent = Math.ceil(total / pageSize);
    }
  } catch (error) {
    console.error("获取商品列表失败:", error);
  }
}

// 渲染商品列表
function renderGoods(goodsList) {
  goodsContainer.innerHTML = goodsList
    .map(
      (goods) => `
    <div class="goods-item" onclick="location.href='./detail.html?id=${
      goods.goods_id
    }'">
      ${
        goods.is_sale
          ? `<span class="tag sale-tag">${goods.sale_type}</span>`
          : ""
      }
      ${goods.is_hot ? '<span class="tag hot-tag">热卖</span>' : ""}
      <img src="${goods.img_big_logo}" alt="${goods.title}">
      <div class="goods-title">${goods.title}</div>
      <div class="price-info">
        <span class="current-price">￥${goods.current_price}</span>
        <span class="original-price">￥${goods.price}</span>
      </div>
    </div>
  `
    )
    .join("");
}

// 事件监听器
document.querySelector(".first-page").addEventListener("click", () => {
  current = 1;
  currentPageInput.value = current;
  loadGoods();
});

document.querySelector(".prev-page").addEventListener("click", () => {
  if (current > 1) {
    current--;
    currentPageInput.value = current;
    loadGoods();
  }
});

document.querySelector(".next-page").addEventListener("click", () => {
  const maxPage = Math.ceil(total / pageSize);
  if (current < maxPage) {
    current++;
    currentPageInput.value = current;
    loadGoods();
  }
});

document.querySelector(".last-page").addEventListener("click", () => {
  current = Math.ceil(total / pageSize);
  currentPageInput.value = current;
  loadGoods();
});

document.querySelector(".jump-to").addEventListener("click", () => {
  const inputPage = parseInt(currentPageInput.value);
  const maxPage = Math.ceil(total / pageSize);
  if (inputPage >= 1 && inputPage <= maxPage) {
    current = inputPage;
    loadGoods();
  } else {
    alert("请输入有效的页码！");
    currentPageInput.value = current;
  }
});

pageSizeSelect.addEventListener("change", (e) => {
  pageSize = parseInt(e.target.value);
  current = 1;
  currentPageInput.value = current;
  loadGoods();
});

// 初始加载
loadGoods();
