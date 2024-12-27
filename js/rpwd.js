// 获取表单元素
const form = document.getElementById("rpwdForm");

// 获取id
const id = localStorage.getItem("id");

// 为表单添加提交事件监听器
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // 获取输入值
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // 验证新密码
  if (newPassword.length < 6 || newPassword.length > 20) {
    alert("新密码长度必须在6-20个字符之间");
    return;
  }

  // 验证两次密码是否一致
  if (newPassword !== confirmPassword) {
    alert("两次输入的新密码不一致");
    return;
  }

  // 验证新旧密码不能相同
  if (oldPassword === newPassword) {
    alert("新密码不能与原密码相同");
    return;
  }
  let res = await http.post("/users/rpwd", { id, oldPassword, newPassword });
  if (res.data.code != 1) return alert("修改失败！请重试");
  alert("密码修改成功，请重新登录");
  window.location.href = "./login.html";
});
