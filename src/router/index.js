import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

import {sysMenu} from '@/api/user'
import {authRoute} from '@/utils/authRoute'

// const ArtWrite = ()=> import('@/views/art/artWrite/index');

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [ // 公共模块
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '总览', icon: 'dashboard', affix: true }
      }
    ]
  }
  
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// const indexRouter = {
//   ArtWrite:()=> import('@/views/art/artWrite/index'),
//   ArtManage:()=> import('@/views/art/artManage/index'),
//   Classify:() => import('@/views/categories/classify/index'),
//   Tag:() => import('@/views/categories/tag/index')
// }
// console.log(indexRouter.ArtWrite)
// function checkRouter(vals){
//   let val=null;
//   for(let key in indexRouter){
//     if(key == vals){
//       val = indexRouter[key];
//     }
//   }

//   return val;
// }
// checkRouter();

// let jsons = {"data":[
//   {id:1,parentId:0,name:'Art',path:'Art',component:'Layout',meta: { title: '文章', icon: 'example' }},
//   {id:2,parentId:1,name:'ArtWrite',path:'ArtWrite',component:'ArtWrite',meta: { title: '写文章', icon: 'table'}},
//   {id:3,parentId:1,name:'ArtManage',path:'ArtManage',component:'ArtManage',meta: { title: '文章管理', icon: 'tree'}}
// ]};

// var formatdata=[];
// for(var i in jsons.data){     // parentId为0时表示为根节点
//   if(jsons.data[i].parentId=='0'){   
//     var tempObject={
//       id:jsons.data[i].id,
//       name:jsons.data[i].name,
//       path:'/'+jsons.data[i].path,
//       component:jsons.data[i].component==='Layout'?Layout:checkRouter(jsons.data[i].component),
//       meta: jsons.data[i].meta,
//       redirect: jsons.data[i].redirect,
//       alwaysShow:true
//     };
//     // tempObject.label=jsons.data[i].title;
//     // tempObject.id=jsons.data[i].id;
//     // if(jsons.data[i].component==='Layout'){
//     //   tempObject.component = Layout;
//     // }else{
//     //   tempObject.component = () => import(jsons.data[i].component+'')
//     // }

//     tempObject.children=getChildren(0,tempObject.id,jsons.data);
//     formatdata.push(tempObject);
//   }
// }

// function getChildren(checkItemId,id,data){    //递归体  即对每条data逐条递归找children
// 	    var tempArray=[];
// 	    for(var i in data){
// 	        if(data[i].parentId==id){
//             var tempChild={
//               id:data[i].id,
//               name:data[i].name,
//               path:data[i].path,
//               component:data[i].component==='Layout'?Layout:checkRouter(data[i].component),
//               meta:data[i].meta,redirect:data[i].redirect
//             };

//             // if(jsons.data[i].component==='Layout'){
//             //   tempChild.component = Layout;
//             // }else{
//             //   tempChild.component = () => import(jsons.data[i].component+'')
//             // }

// 				if(tempChild.id == checkItemId){
// 					 tempChild.checked = true
// 				}
// 	            if(selectChildren(data[i].id,data)){   //若存在子节点，继续递归；否则为叶节点，停止递归
// 	                tempChild.children=getChildren(checkItemId,data[i].id,data);
// 	            }
// 	            tempArray.push(tempChild);
// 	        }
// 	    }
// 	    return tempArray;
// 	}
// 	function selectChildren(id,data){   // 是否存在子节点
// 	    for(var i in data){
// 	        if(data[i].parentId==id){
// 	            return true;
// 	        }
// 	    }
// 	    return false;
//   }
// console.log(formatdata)
// 

let baseRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    name: 'System',
    meta: { title: '系统设置', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/webset/index'),
        meta: { title: '菜单管理', icon: 'form'}
      },
      {
        path: 'menu1',
        name: 'menu1',
        component: () => import('@/views/webset/index'),
        meta: { title: '权限管理', icon: 'form'}
      }
    ]
  },
  //   // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// let formatdata=[];
// sysMenu().then(res=>{
//   formatdata = authRoute(res.data);
//   console.log(formatdata)
// })

export const asyncRoutes = baseRoutes;
// export const asyncRoutes = [ // 私有模块
//   {
//     path: '/art',
//     component: Layout,
//     redirect: '/art/write',
//     name: 'Art',
//     meta: { title: '文章', icon: 'example' },
//     children: [
//       {
//         path: 'write',
//         name: 'ArtWrite',
//         component: ArtWrite,
//         meta: { title: '写文章', icon: 'table' }
//       },
//       {
//         path: 'manage',
//         name: 'ArtManage',
//         component: () => import('@/views/art/artManage/index'),
//         meta: { title: '文章管理', icon: 'tree' }
//       }
//     ]
//   },
//   {
//     path: '/categories',
//     component: Layout,
//     redirect: '/categories/classify',
//     name: 'Categories',
//     meta: { title: '分类/标签', icon: 'example' },
//     children: [
//       {
//         path: 'classify',
//         name: 'Classify',
//         component: () => import('@/views/categories/classify/index'),
//         meta: { title: '分类', icon: 'table' }
//       },
//       {
//         path: 'tag',
//         name: 'Tag',
//         component: () => import('@/views/categories/tag/index'),
//         meta: { title: '标签', icon: 'tree' }
//       }
//     ]
//   },
//   {
//     path: '/webset',
//     component: Layout,
//     children: [
//       {
//         path: 'webset',
//         name: 'Webset',
//         component: () => import('@/views/webset/index'),
//         meta: { title: '网站设置', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/system',
//     component: Layout,
//     redirect: '/system/menu',
//     name: 'System',
//     meta: { title: '系统设置', icon: 'example', roles: ['admin'] },
//     children: [
//       {
//         path: 'menu',
//         name: 'menu',
//         component: () => import('@/views/webset/index'),
//         meta: { title: '菜单管理', icon: 'form'}
//       },
//       {
//         path: 'menu1',
//         name: 'menu1',
//         component: () => import('@/views/webset/index'),
//         meta: { title: '权限管理', icon: 'form'}
//       }
//     ]
//   },
//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
