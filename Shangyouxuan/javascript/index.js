// 先加载所有dom元素以及相关资源
window.onload = function () {
    
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
        console.log(navPath)
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
            bigImg.src = "../images/b1.png"
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
                if(left < 0) {
                    left = 0
                } else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if(top < 0) {
                    top = 0
                } else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
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
    
    navPathDataBine()
    bigClassBind()

    
    
    
    
}