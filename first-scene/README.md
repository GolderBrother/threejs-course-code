# 总结

了解了下 Three.js 是如何描述三维世界的。

Three.js 通过 Scene 来管理各种物体，这些所有的物体组成一棵树。

每个物体（常用的是 Mesh）都有几何体 Geometry、材质 Material 来描述形状、颜色等。

通过相机 Camera 在不同角度来观察，通过灯光 Light 来照亮这个三维世界。

最后通过 Renderer 把这个 Scene 渲染到 canvas 画布上，把返回的 canvas 元素挂载到 dom 就可以了。

这就是 Three.js 里的几个核心概念。