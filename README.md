## 概述
[wx_UIModule]结合了微信的视觉规范，为用户提供更加统一的使用感受。

包含 底部弹出视图(Dialog)、支付密码输入框(PassWordInput)、商品数量加减(Quantity)、提示消息(Toast)、顶部提示(Toptip)、角标(Badge)、星级评分(Rater) 共计 7 类组件或元素。

## 下载
``` bash
git clone https://github.com/ccmarios/wx_UIModule.git
```

注：本项目基础库版本为1.5.2，如运行失败，请尝试升级更新【微信开发者工具】。

## 声明
转载请注明原创地址：https://github.com/ccmarios/wx_UIModule.git

请尊重作者的劳动成果，尽管不写我也不能把你怎么样~
***
## 底部弹出视图
![Dialog.gif](http://upload-images.jianshu.io/upload_images/1374689-9bda57f9dc39da9f.gif?imageMogr2/auto-orient/strip)
* ###### 实现思路
在当前视图顶部利用z-index添加一层半透明的遮罩层，充当背景。在该背景上添加view，利用transition完成由底部向上滑出的效果。
* ###### 如何复用到你的项目
所有组件的复用模板都存放在'module'文件夹中，底部弹出视图的模板名为'Dialog.wxml'。模块部分代码如下所示，在需要加入该组件的wxml文件中引入Dialog.wxml，比如：`<import src="你的路径/module/Dialog.wxml" />`。代码中写入`<template is="diaView" data="{{showDialog:showDialog}}" />`，记得在.js文件中添加showDialog数据源以及.wxss添加模板所需样式。
```
 <template name="diaView">
  <view class="dialog {{ showDialog ? 'dialog_show' : '' }}">
    <view class="dialog_mask" bindtap="onClickdiaView" />
    <view class="dialog_container">

      <!--  //此区域自定义视图  -->
      <view class="flex_Center" style="height:500rpx;background:white;"> 
        <view style="color:#333;font-size:30rpx;">自定义视图</view>
      </view>

    </view>
  </view>
</template>
```
***
## 支付密码输入框
![PassWordInput.gif](http://upload-images.jianshu.io/upload_images/1374689-4b6ede6a29420c4b.gif?imageMogr2/auto-orient/strip)
* ###### 实现思路
六个密码输入框使用view+border展示，在view上层利用z-index添加一个透明色的input控件用于调起键盘输入，但是input在输入时会有光标闪烁。我的处理办法是，将控件left设置为-100rpx，这样光标出现在屏幕外，视觉上达到了效果。这不是最优的处理方式，有想法的朋友可以交流~
* ###### 如何复用到你的项目
所有组件的复用模板都存放在'module'文件夹中，底部弹出视图的模板名为'pwdInput.wxml'。引用方法同上，就不再赘述了，记得添加wxss
```
<template name="pwdInput">
  <view class="pwdInputStyle">
      <input class="pas_input" type="number" maxlength="6" focus="true" bindinput="onChangeInput" />
      <block wx:for="{{[0,1,2,3,4,5]}}">
        <view class="itemStyle flex_Center">
          <view wx:if="{{passWordArr[item] == true}}" class="PwdStyle"></view>
        </view>
      </block>
    </view>
</template>
```
***
## 商品数量加减
![Quantity.gif](http://upload-images.jianshu.io/upload_images/1374689-306bc9a2f1ccec5f.gif?imageMogr2/auto-orient/strip)
* ###### 实现思路
首先要确定业务需求，右侧减号左侧加号中间是可以输入的框。需要注意的是，当商品数量减至1时，左侧减号不可点击。当商品数量增至最大值时，右侧加号不可点击。中间输入需要留意的是，可能会输入0或者大于商品数量上限时的处理。我的处理方式是：当输入0时，数量默认变为1；当输入数量大于上限时，变为最大值。详细见代码
* ###### 如何复用到你的项目
所有组件的复用模板都存放在'module'文件夹中，底部弹出视图的模板名为'numberPlusMinus.wxml'。注意加减号点击方法和input的处理。
```
<template name="quantity">
  <view class="quantityViewStyle">
    <view class="minusStyle" style="color:{{num==1?'#DADADA':white}}" bindtap="onTapMinus">-</view>
    <view class="inputViewStyle">
      <input class="inputView1Style" style="height:54rpx;" value="{{num}}" type="number" maxlength="2" bindinput="onInputNum" bindblur="lossFocus" />
    </view>
    <view class="plusStyle" style="color:{{num==totalNum?'#DADADA':white}}" bindtap="onTapPlus">+</view>
  </view>
</template>
```
***
## 提示消息
![Toast.gif](http://upload-images.jianshu.io/upload_images/1374689-f14e15114b8d184a.gif?imageMogr2/auto-orient/strip)
* ###### 实现思路
这个就是普通的消息提示，没多少可说的。O(∩_∩)O哈哈~
* ###### 如何复用到你的项目
所有组件的复用模板都存放在'module'文件夹中，底部弹出视图的模板名为'messageView.wxml'。在.js中有个isShowToast的方法，传入文字即可。
```
<template name="UI-toast">
  <view class="UI-toast" wx:if="{{ toastShow }}">{{title}}</view>
</template>
```
***
## 顶部提示
![Toptip.gif](http://upload-images.jianshu.io/upload_images/1374689-f867c7a843ed0007.gif?imageMogr2/auto-orient/strip)
* ###### 实现思路
z-index + transition搞定~
* ###### 如何复用到你的项目
所有组件的复用模板都存放在'module'文件夹中，底部弹出视图的模板名为'topMessage.wxml'。
```
<template name="toptips">
  <view class="toptips {{ isTopTips ? 'toptips--show' : '' }}">{{ TopTipscontent }}</view>
</template>
```
***
## 角标
![Badge.png](http://upload-images.jianshu.io/upload_images/1374689-f727fe645d8dbbc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/540)
* ###### 实现思路
利用css样式即可达到效果，详见代码
* ###### 如何复用到你的项目
所有组件的复用模板都存放在'module'文件夹中，底部弹出视图的模板名为'badge.wxml'。
```
<template name="badge">
  <view class="demo__item">
    <view class="demo__icon badge">
        <view wx:if="{{number > 0}}" class="badge__count">{{number > 99 ? '99+' : number}}</view>
    </view>
</view>
</template>
```
***
## 星级评分

![Rater.gif](http://upload-images.jianshu.io/upload_images/1374689-be42aab1ac23af24.gif?imageMogr2/auto-orient/strip)

* ###### 实现思路
五角星和心形图案在搜狗输入法找的😜，大小改变设置font-size，颜色改变设置color。我用了一个数组存评分数据，点击了第几个图案，数组存几个true，根据true/false展示不同的颜色。
* ###### 如何复用到你的项目
好吧，这个没有模板！因为用了不同的数据源，懒得抽方法了😒   需要的同学，自己写一下吧~😳
***
# 结束语
如果你有更好的处理方案，欢迎交流~
希望有更多的同学能加入进来，完善这套组件~
最后，各位大佬觉得不错的，请[Star](https://github.com/ccmarios/wx_UIModule)哦~

