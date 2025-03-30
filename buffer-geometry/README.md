# 顶点生成各种几何体

Three.js 提供了很多几何体，它们都是基于 BufferGeometry 封装出来的。

通过 geometry.attributes.position 存储顶点数据，通过 geometry.index 存储顶点索引，每三个顶点索引构成一个三角形，所有的三角形就构成了各种几何体。

网格模型 Mesh 就是由三角形构成的，不管是简单的几何体，还是加载的复杂的外部模型，都是三角形构成。

几何体的本质就是顶点和三角形，理解了这个就理解了各种 Geometry 和网格模型。