window.onload=function (argument) {
	// body...
	//顶部栏变色
	headScroll();
   
   //轮播图效果
   banner();

   // 倒计时效果
   cutDownTimer();

}
  function headScroll(){

  	var jHeader=document.querySelector(".jd_header");
  	var navDom=document.querySelector(".jd_nav");
  	var navTop=navDom.offsetTop;
  	var navHeight=navDom.offsetHeight;
  	jHeader.style.backgroundColor="rgba(201,21,35,0)";

  	//获取顶部到导航栏底部的距离
  	var maxDistance=navTop+navHeight;
  	window.onscroll=function(){
  		//获取滚动body的距离
  		var scrollDistance = window.document.documentElement.scrollTop;
  		var percent=scrollDistance/maxDistance;
  		if (percent>1) {
  			percent=1;
  		}
  		jHeader.style.backgroundColor="rgba(201,21,35,"+percent+")";
  	}

  }

  // 轮播图
  function banner(){
  	var timer=null;
	var banner_img=document.querySelector(".banner .banner_img");
	// 添加过度效果
	
	var indexLi=document.querySelectorAll(".banner_index li")
	var index=1;
	var width=document.body.offsetWidth;
		 timer=setInterval(function(){
         index++;
         banner_img.style.transition="all .3s";
         banner_img.style.transform="translateX("+index*width*-1+"px)";
         
  	},1000)
	banner_img.addEventListener("webkitTransitionEnd",function(){
       console.log("过度结束")
        if(index>8){
         	index=1;
         	// 关闭过度，瞬间切换到第一张
         	banner_img.style.transition="";
         	banner_img.style.transform="translateX("+index*width*-1+"px)";
         }else if(index<1){
         	index=8;

         }
         /*修改url位置*/
         for(var i=0;i<indexLi.length;i++){
         	indexLi[i].className="";
         }
         indexLi[index-1].className="current";
	})

	var startX=0;
	var startY=0;
	var moveX=0;
	var moveY=0;
	var distanceX=0;
	var distanceY=0;
	banner_img.addEventListener("touchstart",function(event){
		// 关闭定时器
		clearInterval(timer);
		// 关闭过渡
        banner_img.transition="";
        // 开始记录值
		startX=event.touches[0].clientX;
		
	})
   // 触摸中
    banner_img.addEventListener("touchmove",function(event){
    	// 计算移动的值
    	moveX=event.touches[0].clientX-startX;
        console.log(moveX);
    	banner_img.style.transform="translateX("+(index*width*-1+moveX)+"px)";

    })

    banner_img.addEventListener("touchend",function(event){
    
    // 定义 最大的 偏移值
		var maxDistance = width/2;

		// 判断 是否超过
		if (Math.abs(moveX)>maxDistance) {
			// 判断 到底是 往左 还是往右移动
			if (moveX>0) {
				index--;
			}else{
				index++;
			}
			// 为了好看 将 过渡效果开启
			banner_img.style.transition = 'all 0.3s';

			// 吸附 一整页
			banner_img.style.transform = 'translateX('+(index*-1*width)+'px)';

		}else{
			// 如果 进到这里了 说明 没有超过 我们定义的 最大偏移值 吸附回去即可

			// 为了好看 将 过渡效果开启
			banner_img.style.transition = 'all .3s';

			// 吸附回去
			banner_img.style.transform = 'translateX('+(index*-1*width)+'px)';
		}

		// 记录结束值

		// 开启定时器
		timer = setInterval(function () {
			// 累加
			index++;

			// 将 过渡开启 管你三七二十一 只要进来 就开启过渡 保证 过渡效果一直存在
			banner_img.style.transition = 'all .3s';

			// 修改 ul的位置
			banner_img.style.transform = 'translateX('+index*width*-1+'px)';
		},1000)
	})
    
 
  }

  // 倒计时的时间
  // 定义一个总时间，获取想要修改的li
  // 开启定时器

  function cutDownTimer(){
  	var liArr=document.querySelectorAll(".main_content:nth-child(1) .main_content_top li");
  	console.log(liArr);
  	var total_hours=3;
  	var total_sec=total_hours*60*60;
  	// var total_sec=5;
    total_sec++
  	//  开启定时器
  	var timer=null;
  	timer=setInterval(function(){
  		if(total_sec<=0){
  			clearInterval(timer);
  			console.log("活动已结束，请下次抓紧哦");
  			return false;
  		}
  		total_sec--;
  		var hour=Math.floor(total_sec/3600);
  		var min=Math.floor(total_sec%3600/60);
  		var sec=total_sec%60;
  		liArr[0].innerHTML=Math.floor(hour/10);
  		liArr[1].innerHTML=hour%10;
  		liArr[3].innerHTML=Math.floor(min/10);
  		liArr[4].innerHTML=min%10;
  		liArr[6].innerHTML=Math.floor(sec/10);
  		liArr[7].innerHTML=sec%10;

  	},1000)
  }

