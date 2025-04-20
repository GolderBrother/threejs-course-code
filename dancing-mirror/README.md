实现了练舞房的效果。

用 Reflector 创建了 4 面镜子，然后加载 gltf 人物模型，用 AnimationMixer 播放了跳舞的骨骼动画。

用 Tween.js 做了圆周的相机动画。

之后添加了矩形平面光，用它的 ReactAreaLightHelper 来做灯管效果。

最后添加了平行光的阴影。

这样，一个综合的小实战就完成了。以后用到镜子都可以用 Reflector 来做。