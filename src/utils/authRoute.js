import Layout from '@/layout'

const indexRouter = {
    ArtWrite:()=> import('@/views/art/artWrite/index'),
    ArtManage:()=> import('@/views/art/artManage/index'),
    Classify:() => import('@/views/categories/classify/index'),
    Tag:() => import('@/views/categories/tag/index')
}

function checkRouter(vals){
    let val=null;
    for(let key in indexRouter){
        if(key == vals){
        val = indexRouter[key];
        }
    }

    return val;
}

function getChildren(checkItemId,id,data,parents){    //递归体  即对每条data逐条递归找children
    var tempArray=[];
    for(var i in data){
        if(data[i].parentId==id){
        var tempChild={
          id:data[i]._id,
          name:data[i].name,
          path:data[i].path,
          title:data[i].meta.title,
          component:data[i].component==='Layout'?Layout:checkRouter(data[i].component),
          meta:data[i].meta,
          parents:parents,
          sort:data[i].sort
        };
            if(selectChildren(data[i].id,data)){   //若存在子节点，继续递归；否则为叶节点，停止递归
                tempChild.children=getChildren(checkItemId,data[i].id,data);
            }
            tempArray.push(tempChild);
        }
    }
    return tempArray;
}
function selectChildren(id,data){   // 是否存在子节点
    for(var i in data){
        if(data[i].parentId==id){
            return true;
        }
    }
    return false;
}

// var tempChild={
//     id:data[i].id,
//     name:data[i].name,
//     path:data[i].path,
//     component:data[i].component==='Layout'?Layout:checkRouter(data[i].component),
//     meta:data[i].meta,redirect:data[i].redirect
//   };

export function authRoute(params) {
    var formatdata=[];
    for(var i in params){     // parentId为0时表示为根节点
        if(params[i].parentId=='0'){   
            var tempObject={
            id:params[i]._id,
            name:params[i].name,
            path:'/'+params[i].path,
            title:params[i].meta.title,
            component:params[i].component==='Layout'?Layout:checkRouter(params[i].component),
            meta:params[i].meta,
            alwaysShow:true,
            sort:params[i].sort
            };
            let parents = tempObject;
            tempObject.children=getChildren(0,tempObject.id,params,parents);
            formatdata.push(tempObject);
        }
    }

    return formatdata;
}