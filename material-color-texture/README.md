过了一遍材质相关属性。

点模型、线模型、网格模型都有专门的材质。

线模型想要渲染几何体需要先用 EdgesGeometry 包裹来处理下顶点，之后可以设置 LineDashedMaterial 画虚线，但要调用 line.computeLineDistances() 做相关计算。

网格模型的材质有很多，主要是与光照有关，可以设置 color、map，transparent、opacity 等属性。

设置透明度需要 transparent 开启后，设置 opacity。

map 是颜色贴图也叫纹理贴图，用 TextureLoader 加载纹理图片后设置到 map。