 function addDisplay(classNone,disBlock){
     var div=$("."+classNone);
     if(div.hasClass(disBlock)){
       div.removeClass(disBlock);
     }else{
       div.addClass(disBlock);
     }
   }
 //功能点0异步加载页头页尾
 $('#header').load('data/header.php',function(){
   //功能点1 点击显示头部的下拉菜单
   $('.dropdown-click').click(function(){
     addDisplay('dropdown_menu',"display_block");
   });
   //功能点击显示菜单
   $('.menu').click(function(){
     addDisplay('text-color',"display_block");
   })
   //点击关闭菜单
    $('.text-color').on('click','a',function(){
      if($('.menu').css('display')==='block') {
        $('.text-color').css('display', 'none');
      }
    })
 });
 $('#footer').load('data/footer.php',function(){
   $('.address a').click(function(e){
     if(e && e.preventDefault){
       e.preventDefault();
     }
     //IE中组织浏览器行为
     else{
       window.event.returnValue=false;
     }
     $('.circle').css('display','none');
   })
   /*百度地图*/
   if ((navigator.userAgent.indexOf('MSIE') >= 0)
     && (navigator.userAgent.indexOf('Opera') < 0)){
     alert('请使用Windows Edge或者更换其他浏览器获得更好的体验')
   }else{
     funMap();
   }

 });
 /*轮播*/ /*--此功能没有实现点击切换--*/
/*var add={
  ul:null,
  li:null,
  timer:null,
  init:function(){
    this.ul=$('#slider');
    //找到当前的LI
      var lis=$(this.ul).children();
      /!*console.log(lis);*!/
    this.updateView();
  },
  remove:function (li){
    this.timer=setTimeout(function(){
      $(li).animate({opacity:1},1200);
      $('.active').animate({opacity:0},1200);
      $(li).addClass('active').siblings('.active').removeClass('active');
        add.updateView();
      /!*console.log(li.next());*!/
    },3000)
  },
  updateView:function(){
    var lis=$(this.ul).children();
    lis=lis.splice(1,2).concat(lis);
    $(this.ul).html(lis);
    var li=this.ul.children()[0];
    this.remove(li);
  }
  }
add.init();*/
 /*//删除imgs结尾的n个元素拼到开头
 imgs=imgs.splice(-n,n).concat(imgs)*/
/*
console.log($('#slider').children()[0]);*/
 var add={
   timer:null,
   i:null,
   init:function(){
     this.i=$('.active').index();
     this.autoRemove(this.i);
     /*this.liclick();*/
     this.lihover();
   },
   /*liclick:function(){
     $('.focus').on('click','li',function(){
       var i=$(this).index();
       /!*console.log(i);*!/
       add.Remove(i);
     })
   },*/
   Remove:function(i){
     $('.active').animate({opacity: 0}, 500)
     $($('#slider').children()[i]).addClass('active')
       .animate({opacity: 1}, 800).siblings('.active').removeClass('active');
     $($('.focus').children()[i]).addClass('ol_active').siblings('.ol_active').removeClass('ol_active');
   },
   autoRemove:function(i){
     this.timer=setInterval(function(){
       i=i+1;
       if(i>$('#slider').children().length-1){
         i=0;
       }
       add.Remove(i);

     },3000);
   },
   lihover:function() {
     $('.focus li').on('mouseover mouseout', function (event) {
       if (event.type == 'mouseover') {
         /*console.log(i);*/
         var i=$(this).index();
         if(i!=$('.ol_active').index()){
         add.Remove(i);
         clearInterval(add.timer);}{
           clearInterval(add.timer);
         }
       } else if (event.type == "mouseout") {
         i = $(this).index();
         add.autoRemove(i);
       }
     })
   }
 }
 add.init();
 //功能点3底部轮播
 var lunbo={
   div:null,
   timer:null,
   init:function(){
     this.div=$('.wmuSlider');
     this.updateView();
   },
   Remove:function (li){
     this.timer=setTimeout(function(){
       $(li).animate({opacity:1},500);
       $('.article').animate({opacity:0},0);
       $(li).addClass('article').siblings('.article').removeClass('article');
       lunbo.updateView();
     },3000)
   },
   updateView:function(){
     var lis=$(this.div).children();
     /*console.log(lis);*/
     lis=lis.splice(1,2).concat(lis);
     $(this.div).html(lis);
     var li=$(this.div).children()[0];
     this.Remove(li);
   }
 }
 lunbo.init();
 //路由
 var  route = {
   "/about":[about],
   "/products":[products],
    "/services":[services],
   "/blog":[blog],
   "/contact":[contact],
   "/signin":[signin],
   "/signup":[signup],
   "/single":[single],
   "/lotteryDraw":[lotteryDraw]
 }
 //初始化路由
 var router = Router(route);
 router.init();
 function about(){
   $('#me-router').load('about.html',function(){
       txtCor("1")
   });
 }
 function txtCor(a){
   $('.text-color>li:nth-child('+a+')').addClass('txtcor').siblings('.txtcor').removeClass('txtcor');
 }
 function products(){
   $('#me-router').load('products.html',function(){
     txtCor("2");
     function category(){
       $('.category-nav').on('click','a',function(e){
         e.preventDefault();
         $(this).parent().addClass('category-active').siblings('.category-active').removeClass('category-active');
         var i=$(this).parent().index();
         $('.table').css('display','none');
         $($('.resp-tab').children()[i]).css('display','block').addClass('table').siblings('.table').removeClass('table');
       });
       $('.amplify').click(function(){
         addDisplay("amplify_bg","display_block");
         addDisplay("amplify_img","display_block");
         $(".amplify_img> div img").attr("src",$(this).parent().prev().children('.img-responsive').attr("src"));
       });
       $(".amplify_close").click(function(e){
         e.preventDefault();
         $(".amplify_bg").removeClass("display_block");
         $(".amplify_img").removeClass("display_block");
       });
     }
     category();
   });
 }
function services(){
  $('#me-router').load('services.html',function(){
    txtCor("3");
  });
}
 function blog(){
  $("#me-router").load('blog.html',function(){
    txtCor("4");
  });
 }
 function contact(){
  $('#me-router').load('contact.html',function(){
    txtCor("5");
    inputRemoveText();
  })
 }
 function signin(){
    $("#me-router").load('Signin.html',function(){
      inputRemoveText()
   })
 }
 function signup(){
  $('#me-router').load('signup.html',function(){
    inputRemoveText()
  })
 }
 function single(){
   $('#me-router').load('Single.html',function(){
     $(window).scrollTop(0);
     txtCor("4")
     inputRemoveText()
   })
 }

 function lotteryDraw(){
   $('#me-router').load('lotteryDraw.html',function(){
     $('.text-color>li:last-child').addClass('txtcor').siblings('.txtcor').removeClass('txtcor');
     function lotteryPlay() {
       //找到开始抽奖的a元素
       var $btn = $('#playbtn');
       var playnum = 100;//抽奖次数
       $('.playnum').html(playnum);
       var isture = 0;
       var clickfunc = function () {
         var data = [1, 2, 3, 4, 5, 6];
         //通过随机数获取data【随机数】的值
         data = data[Math.floor(Math.random() * data.length)];
         switch (data) {
           case 1:
             rotateFunc(1, 0, '恭喜您获得2000元理财金!');

             break;
           case 2:
             rotateFunc(2, 60, '谢谢参与~再来一次吧~');
             break;
           case 3:
             rotateFunc(3, 120, '恭喜您获得5200元理财金!');
             break;
           case 4:
             rotateFunc(4, 180, '恭喜您获得100元京东E卡，将在次日以短信形式下发到您的手机上，请注意查收!');
             break;
           case 5:
             rotateFunc(5, 240, '谢谢参与~再来一次吧~');
             break;
           case 6:
             rotateFunc(6, 300, '恭喜您获得1000元理财金!');
             break;
         }
       }
       $btn.click(function(){
         if(isture) return;
         isture=true;
         //判断是否登录
         if(1==2){
           $('.playnum').html('0');
           alert('请先登录');
           isture=false;
         }else{
           if(playnum<=0){//当前可抽奖数为0时
             alert("抽奖次数用尽，请重新购买商品");
             $('.playnum').html(0);
             isture = false;
           }else{
             playnum = playnum - 1; //执行转盘了则次数减1
             if(playnum <= 0) {
               playnum = 0;
             }
             $('.playnum').html(playnum);
             clickfunc();
           }
         }
       });
       var rotateFunc=function(awards,angle,text){
         isture=true;
         $btn.stopRotate();
         $btn.rotate({
           angle:0,
           duration:4000,
           animateTo: angle + 1800, //让它根据得出来的结果加上1440度旋转
           callback:function(){
             isture=false;
             alert("抽奖结果:"+text);
           }
         });
       }
     }
     lotteryPlay();
   });
 }
 //为所有input定义获得焦点删除提示文本的函数
 function inputRemoveText(){
   var text;
   $('body').on('focus','input',function(){
     text=$(this).val();
     if($(this).val()!=''){
      $(this).val('');}
   });
   $('body').on('blur','input',function(){
       if($(this).val()=='')
         $(this).val(text);
   })
 }
