// 菜品数据源，包含名称、拼音、分类、价格、简介
const menuData = [
    {name:"红烧肉",pinyin:"hongshaorou",category:"meat",price:"58元",desc:"肥而不腻，经典江南名菜"},
    {name:"番茄炒蛋",pinyin:"fanqiedan",category:"veg",price:"22元",desc:"国民家常菜，酸甜下饭"},
    {name:"鱼香肉丝",pinyin:"yuxiangrous",category:"meat",price:"36元",desc:"酸甜微辣，不含鱼"},
    {name:"宫保鸡丁",pinyin:"gongbaojiding",category:"meat",price:"38元",desc:"花生搭配鸡肉，川味经典"},
    {name:"麻婆豆腐",pinyin:"mapodoufu",category:"veg",price:"26元",desc:"麻辣鲜香，下饭神器"},
    {name:"酸辣土豆丝",pinyin:"suanlatudousi",category:"veg",price:"18元",desc:"清爽酸辣，平价小菜"},
    {name:"可乐鸡翅",pinyin:"kelejichi",category:"meat",price:"42元",desc:"甜口鸡翅，老少皆宜"},
    {name:"清蒸鲈鱼",pinyin:"qingzhenluyu",category:"meat",price:"68元",desc:"鲜嫩清淡，营养丰富"},
    {name:"紫菜蛋花汤",pinyin:"zicaidanhua",category:"soup",price:"12元",desc:"清淡鲜美的例汤"},
    {name:"冬瓜排骨汤",pinyin:"dongguapigutang",category:"soup",price:"32元",desc:"温润滋补，适合秋冬"},
];

// DOM元素
const menuListEl = document.getElementById('menuList');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const emptyTip = document.getElementById('emptyTip');
const categoryBtns = document.querySelectorAll('.category-btn');
const modal = document.getElementById('detailModal');
const closeBtn = document.querySelector('.close-btn');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDesc');

let currentCategory = "all";

// 渲染菜品列表
function renderList(){
    let keyword = searchInput.value.trim().toLowerCase();
    // 过滤：分类 + 名称/拼音模糊匹配
    let filterData = menuData.filter(item=>{
        const matchCate = currentCategory === "all" || item.category === currentCategory;
        const matchText = item.name.toLowerCase().includes(keyword) || item.pinyin.includes(keyword);
        return matchCate && matchText;
    })

    menuListEl.innerHTML = "";
    if(filterData.length === 0){
        emptyTip.style.display = "block";
        return;
    }
    emptyTip.style.display = "none";

    filterData.forEach(item=>{
        const div = document.createElement('div');
        div.className = "menu-item";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <div class="price">${item.price}</div>
            <span class="cate-tag">${getCateName(item.category)}</span>
        `
        // 点击弹出详情
        div.onclick = ()=>{
            modalName.innerText = item.name;
            modalPrice.innerText = `价格：${item.price}`;
            modalCategory.innerText = `分类：${getCateName(item.category)}`;
            modalDesc.innerText = `简介：${item.desc}`;
            modal.style.display = "flex";
        }
        menuListEl.appendChild(div);
    })
}

// 分类中文转换
function getCateName(cate){
    const map = {meat:"荤菜",veg:"素菜",soup:"汤品"};
    return map[cate];
}

// 切换分类按钮
categoryBtns.forEach(btn=>{
    btn.onclick = ()=>{
        categoryBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderList();
    }
})

// 搜索输入事件
searchInput.addEventListener('input', renderList);
// 回车搜索
searchInput.addEventListener('keydown',(e)=>{
    if(e.key === "Enter") renderList();
})

// 清空按钮
clearBtn.onclick = ()=>{
    searchInput.value = "";
    renderList();
}

// 关闭弹窗
closeBtn.onclick = ()=> modal.style.display = "none";
window.onclick = (e)=>{
    if(e.target === modal) modal.style.display = "none";
}

// 初始渲染
renderList();