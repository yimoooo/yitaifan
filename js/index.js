let pEles = document.querySelectorAll("p");

let fn = async () => {
  // 校验用户是否已登录
  let { status, info, id } = await isLogin();

  if (status != 1) {
    // 未登录

    pEles[0].style.display = "block";
    pEles[1].style.display = "none";
    return;
  }

  //已登录
  //console.log('ok');

  pEles[0].style.display = "none";
  pEles[1].style.display = "block";

  document.querySelector(".nickname").innerHTML = info.nickname;

  // 点击事件
  document
    .querySelector(".logout")
    .addEventListener("click", async ({ target }) => {
      if (target.className == "self") location.href = "./self.html";

      if (target.className == "logout") {
        if (!confirm("确定要退出登录？")) return;

        // 将本地存储的token和id移除
        localStorage.removeItem("token");
        localStorage.removeItem("id");

        await http.get("/users/logout", { params: { id } });
        alert("退出登录成功");

        pEles[0].style.display = "block";
        pEles[1].style.display = "none";
      }
    });
};
fn();

document.querySelector(".self").addEventListener("click", () => {
  window.location.href = "../views/self.html";
});
