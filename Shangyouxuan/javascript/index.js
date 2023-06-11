// 先加载所有dom元素以及相关资源
window.onload = function () {
    
    //大图下标
    let idx = 0
    
    // 获取数据
    let imagessrc = goodData.imagessrc
    
    //路径导航数据动态渲染
    function navPathDataBine() {
        /*
        * 先获取元素
        * 获取所需数据
        * 元素动态产生，需要创建dom元素，渲染页面
        * 遍历最后一条元素时，只创建a标签，不创建i标签
        */
        //获取元素
        let navPath = document.querySelector("#navPath")
        //获取数据
        let path = goodData.path
        //遍历数据
        for (let i = 0; i < path.length; i++) {
            // 创建a标签
            let aNode = document.createElement("a")
            if (i === path.length - 1) {
                aNode.innerText = path[i].title
                navPath.appendChild(aNode)
            } else {
                aNode.href = path[i].url
                aNode.innerText = path[i].title
                let iNode = document.createElement("i")
                iNode.innerText = '/'
                navPath.appendChild(aNode)
                navPath.appendChild(iNode)
            }
        }
    }
    
    //放大镜移入移出
    function bigClassBind() {
        /*
        * 获取小图框元素对象，设置移入事件（onmouseover(有事件冒泡),onmouseenter）
        * 动态的创建蒙版元素以及大图框、大图片
        * 移出时，移除蒙版、大图框
        */
        // 创建小图框
        let smallPic = document.querySelector("#wrapper #content #contentMain #center #left #leftTop #smallPic")
        //
        let leftTop = document.querySelector("#leftTop")
        // 移入事件
        smallPic.onmouseenter = function () {
            // 创建蒙版元素
            let maskDiv = document.createElement("div")
            maskDiv.className = "mask"
            // 创建大图框
            let bigPic = document.createElement("div")
            bigPic.id = "bigPic"
            // 创建图片
            let bigImg = document.createElement("img")
            bigImg.src = imagessrc[idx].b
            // 追加图片到大图框
            bigPic.appendChild(bigImg)
            // 小图框追加蒙版元素
            smallPic.appendChild(maskDiv)
            // left追加大图框
            leftTop.appendChild(bigPic)
            
            // 移动事件
            smallPic.onmousemove = function (event) {
                // event.clientX 鼠标点距离浏览器左侧X轴的值
                // smallPic.getBoundingClientRect().left 小图框元素距离浏览器左侧可使left的值
                let left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2
                let top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetWidth / 2
                
                // 设置边界控制
                if (left < 0) {
                    left = 0
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if (top < 0) {
                    top = 0
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }
                maskDiv.style.left = left + "px"
                maskDiv.style.top = top + "px"
                
                // 大图框移动思路
                // 移动的比例关系 = 蒙版元素移动的距离 / 大图片移动的距离
                // 蒙版元素移动的距离 = 大图框宽度 - 蒙版元素的宽度
                // 大图片移动的距离 = 大图片的宽度 - 大图片的宽度
                let scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth)
                bigImg.style.left = -left / scale + 'px'
                bigImg.style.top = -top / scale + 'px'
                
                
            }
            // 移出事件
            smallPic.onmouseleave = function () {
                smallPic.removeChild(maskDiv)
                leftTop.removeChild(bigPic)
            }
        }
        
    }
    
    //动态渲染缩略数据
    function thumbnailData() {
        /*
        * 获取pcilist下的ul
        * 获取data.js文件下的goodData->imagessrc
        * 遍历数组，根据数组的长度来创建li元素
        */
        let ul = document.querySelector('#picList > ul')
        let imagessrc = goodData.imagessrc
        for (let i = 0; i < imagessrc.length; i++) {
            let newLi = document.createElement('li')
            let newImage = document.createElement('img')
            newImage.src = imagessrc[i].s;
            newLi.appendChild(newImage)
            ul.appendChild(newLi)
        }
    }
    
    //点击缩略图的效果
    function thunbnailClick() {
        let liNodes = document.querySelectorAll('#picList > ul > li')
        let smallPicImg = document.querySelector('#smallPic > img')
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].index = i
            liNodes[i].onclick = function () {
                idx = liNodes[i].index
                smallPicImg.src = imagessrc[idx].s
            }
        }
        
    }
    
    //点击缩略图左右两个箭头的效果
    function thumbnailLeftRightClick() {
        /*
        * 获取两端的箭头按钮
        * 获取可是的 div和 ul元素、所有的 li 元素
        * 计算起点、步长、总体运动距离值
        * 发生点击事件
        */
        let prev = document.querySelector('#leftBottom > a.prev')
        let next = document.querySelector('#leftBottom > a.next')
        let picList = document.querySelector('#picList')
        let ul = document.querySelector('#picList > ul')
        let liNodes = document.querySelectorAll('#picList > ul > li')
        
        let start = 0
        let step = (liNodes[0].offsetWidth + 20) * 2
        let end = (liNodes[0].offsetWidth + 20) * (liNodes.length - 5)
        
        prev.onclick = function () {
            start -= step
            if (start <= 0) {
                start = 0
            }
            ul.style.left = -start + 'px'
        }
        
        next.onclick = function () {
            start += step
            if (start >= end) {
                start = end
            }
            ul.style.left = -start + 'px'
        }
        
    }
    
    // 商品详情数据动态渲染
    function rightTopData() {
        /*
        * 查找 rightTop元素
        * 查找数据
        * 重新渲染
        */
        let rightTop = document.querySelector('.rightTop')
        let goodsDetail = goodData.goodsDetail
        
        // 拼接字符串
        let strs = `<h3>Apple iPhone 6s（A1700）64G玫瑰金色 移动通信电信4G手机bbb123</h3>
							<p>推荐选择下方[移动优惠购],手机套餐齐搞定,不用换号,每月还有花费返</p>
							<div class="priceWrap">
								<div class="priceTop">
									<span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
									<div class="price">
										<span>￥</span>
										<p>${goodsDetail.price}</p>
										<i>降价通知</i>
									</div>
									<p>
										<span>累计评价</span>
										<span>${goodsDetail.evaluateNum}</span>
									</p>
								</div>
								<div class="priceBootom">
									<span>促&nbsp;&nbsp;&nbsp;&nbsp;销</span>
									<p>
										<span>${goodsDetail.promoteSales.type}</span>
										<span>${goodsDetail.promoteSales.content}</span>
									</p>
								</div>
							</div>
							<div class="support">
								<span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
								<p>${goodsDetail.support}</p>
							</div>
							<div class="address">
								<span>配&nbsp;送&nbsp;至</span>
								<p>${goodsDetail.address}</p>
							</div>`
        
        rightTop.innerHTML = strs
    }
    
    //路径导航数据动态渲染
    navPathDataBine()
    //放大镜移入移出
    bigClassBind()
    //动态渲染放大镜缩略数据
    thumbnailData()
    //点击缩略图的效果
    thunbnailClick()
    //点击缩略图左右两个箭头的效果
    thumbnailLeftRightClick()
    // 商品详情数据动态渲染
    rightTopData()
    
    
}