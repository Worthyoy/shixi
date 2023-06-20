import axios from "axios";
import http from "./http"

// for sysusers:
// 获取数据
export function getdata() {
    return http.get('/sysuser/');
}
export function getAsysuser(id) {
    return http.get(`/sysuser/${id}`);
}
// 新增
export const addNew = data => {
    return http.post('/sysuser/',data);
}
// 修改
export function sysEdit(id, data) {
    return http.put(`/sysuser/${id}`, data);
}
// 查询
export function sysSearch(data) {
    return http.post('/sysuser/search',data);
}
// sysuser: un/lock, un/freeze
export function Opera(id, data) {
    return http.patch(`/sysuser/actionforasysuser/${id}`,{"operate": data});
}
export function mulOpera(operator, data) {
    return http.patch(`/sysuser/action/${operator}`, {"data": data});
}
// for targetusers:
export function getAlluser() {
    return http.get('/taguser/');
}
export function getAtaguser(id) {
    return http.get(`/taguser/${id}`)
}
export function addtaguser(data) {
    return http.post('/taguser/',data);
}
export function tagEdit(id,data) {
    return http.put(`/taguser/${id}`,data);
}
export function tagopera(id, data) {
    return http.patch(`/taguser/actionforataguser/${id}`,{"operate": data});
}
export function multagopera(operator, data) {
    return http.patch(`/taguser/action/${operator}`, {"data": data});
}
// 搜索
export function tagSearch(data) {
    return http.post('/taguser/search',data);
}
// tricksituation中招情况
export function getTagTrick() {
    return http.get('/tricksituation/')
}
export function AuserTrick(id) {
    return http.get(`/tricksituation/${id}`)
}