import axios from 'axios';
import qs from 'qs'
import Vue from 'vue'
import {alertWarning} from './alert';
axios.interceptors.response.use(res => {
    console.log('-----s----');
    // console.log(res);
    if (res.data.code != 200) {
        alertWarning(res.data.msg)
    }
    return res
})
const baseUrl = '/api'
const baseImgUrl = 'http://localhost:3000'
Vue.prototype.$imgUrl=baseImgUrl
// menu添加
export const reqMenuAdd = (from) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data:qs.stringify(from)
    })
}
export const reqMenuList = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'GET',
        params:{istree:true}
    })
}
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method:"post",
        data: { id: id}
    })
}
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'GET',
        params:{id:id}
    })
}
export const reqMenuUpdata = (form) =>{
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'POST',
        data: qs.stringify(form)
    })
}
// role
export const reqRoleList = () => {
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
    })
}
export const reqRoleAdd = (form) => {
    return axios({
        url:baseUrl+'/api/roleadd',
        method: 'post',
        data:qs.stringify(form)
    })
}
export const reqRoledel = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data:{id:id}
    })
}
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'get',
       params:{id:id}
    })
}
export const reqRoleUpdata = (form) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data:qs.stringify(form)
    })
}
// manage
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params:params
    })
}
export const reqManageAdd = (form) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data:qs.stringify(form)
    })
}
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data:{uid:uid}
    })
}
export const reqManageUpdata = (form) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data:qs.stringify(form)
    })
}
//管理员总数
export const reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get",
    })
}
export const reqManageDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method: "get",
        params:{uid:uid}
    })
}
// 分类添加
export const reqCateAdd = (form) => {
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data:form
    })
}
// 分类list
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + '/api/catelist',
        method: 'get',
        params: params
    }) 
}
// 分类删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: {
            id:id
        }
    })
}
// 分类请求一条
export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: 'get',
        params: {
            id:id
        }
    })
}
// 分类修改
export const reqCateUpdata = (form) => {
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: form
    })
}
// 规格添加
export const reqSpecAdd = (form) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: form
    })
}
// 规格list
export const reqSpecList = (params) => {
    return axios({
        url: baseUrl + '/api/specslist',
        method: 'get',
        params: params
    })
}
// 规格综述
export const reqSpecTotal = () => {
    return axios({
        url: baseUrl + '/api/specscount',
        method: 'get',
    })
}
// 规格删除
export const reqSpecDel = (id) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data:{id:id}
    })
}
export const reqSpecDetail = (id) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        method: 'get',
        params:{id:id}
    })
}
//规格修改
export const reqSpecUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// goods商品
//商品添加
export const reqGoodsAdd = (form) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: form
    })
}
export const reqGoodsList = (form) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: form
    })
}
export const reqGoodsTotal = () => {
    return axios({
        url: baseUrl + '/api/goodscount',
        method: 'get',
    })
}
// goods删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + '/api/goodsdelete',
        method: 'post',
        data:{id:id}
    })
}
export const reqGoodsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {id:id}
    })
}

