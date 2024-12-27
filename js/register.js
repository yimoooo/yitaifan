// 获取表单元素
const form = document.getElementById("registerForm");

// 获取输入字段
const name = document.querySelector(".username");
const pwd = document.querySelector(".pwd");
const rpwd = document.querySelector(".rpwd");
const nickname = document.querySelector(".nickname");

// 为表单添加提交事件监听器
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // 获取表单数据
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const nickname = document.getElementById("nickname").value.trim();

  // 验证用户名
  if (username.length < 4 || username.length > 20) {
    alert("用户名长度必须在4-20个字符之间");
    return;
  }

  // 验证密码
  if (password.length < 6 || password.length > 20) {
    alert("密码长度必须在6-20个字符之间");
    ` `;
    return;
  }

  // 验证确认密码
  if (password !== confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }

  // 验证昵称
  if (nickname.length < 2 || nickname.length > 10) {
    alert("昵称长度必须在2-10个字符之间");
    return;
  }

  // 向后端发送数据
  const res = await register({
    username,
    password,
    nickname,
  });
  console.log(res);
  // 如果验证通过，可以提交表单
  //   console.log("表单验证通过，准备提交数据");
  alert("恭喜注册成功，即将前往登录页面");
  window.location.href = "../views/login.html";
  // TODO: 在这里添加向后端发送数据的代码
});
