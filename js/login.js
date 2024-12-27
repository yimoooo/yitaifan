// 0  获取元素
let form = document.querySelector("form");
let errBox = document.querySelector(".error");
let nameInp = document.querySelector("#username");
let pwdInp = document.querySelector("#password");

// 绑定事件
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 阻止表单默认提交
  console.log("表单提交", nameInp, pwdInp);
  // 获取输入信息
  let username = nameInp.value;
  let password = pwdInp.value;

  //校验不为空
  if (!username || !password) return alert("请完整填写表单");

  // 使用用户名和密码请求登录接口
  let res = await http.post("/users/login", { username, password });

  let data = res.data;
  //console.log(data);
  // 校验登录是否成功
  if (data.code != 1) return alert("用户名或密码错误");

  // 登录成功
  // console.log('ok');
  //   errBox.style.display = "none";

  //将token和id存储到本地
  localStorage.setItem("token", data.token);
  localStorage.setItem("id", data.user.id);

  alert("登录成功");
  
  location.href = "./index.html";
  
});
