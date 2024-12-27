// 0 获取元素                                       [7aaaa]
let form = document.querySelector('form');
let nameInp = document.querySelector('.username');
let ageInp = document.querySelector('.age');
let genderSel = document.querySelector('.gender');
let nickInp = document.querySelector('.nickname');

fn()
async function fn() {
    // 用户是否已登录校验
    let { status, info, id } = await isLogin();
    if (status !=1) {
        // 未登录
        location.href = './login.html';
        return;
    }


    // 将用户信息渲染到页面中
    nameInp.value = info.username;
    ageInp.value = info.age;
    nickInp.value = info.nickname;
    genderSel.value = info.gender;

    //绑定表单提交事件
    form.addEventListener('submit', async e => {
        e.preventDefault();

        //请求携带的数据
        let data = { id };

        // 数据添加不为空的时候才加入到 请求携带数据对象中
        if (ageInp.value) data.age = ageInp.value;
        if (genderSel.value) data.gender = genderSel.value;
        if (nickInp.value) data.nickname = nickInp.value;

        let r = await http.post('/users/update', data);
        if (r.data.code != 1) return alert('修改失败！请重试');

        alert('修改成功'); 

        
    })

}