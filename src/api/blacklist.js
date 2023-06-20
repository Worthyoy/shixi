import http from './http'

// 获取名单
export function getlist() {
    return http.get('/blacklist/');
}
export function getItem(id) {
    return http.get(`/blacklist/${id}`);
}
// 新增
export function addlist(data) {
    return http.post('/blacklist/', data);
}
// 删除
export function delItem(id) {
    return http.delete(`/blacklist/${id}`);
}
export function mulDel(data) {
    return http.patch('/blacklist/',{"data": data});
}