

const indexRouter = [
    {path:()=> import('@/views/art/artWrite/index'),name:'ArtWrite'},
    {path:()=> import('@/views/art/artManage/index'),name:'ArtManage'},
    {path:() => import('@/views/categories/classify/index'),name:'Classify'},
    {path:() => import('@/views/categories/tag/index'),name:'Tag'}
];

export default indexRouter