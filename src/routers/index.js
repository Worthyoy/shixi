<<<<<<< HEAD
import * as VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Show from '../views/Show.vue'
import Home from '../views/Home.vue'
import Connection from '../views/Connection.vue'
import Department from '../views/Department.vue'
import Evaluation from '../views/Evaluation.vue'
import Personnel from '../views/Personnel.vue'
import Record from '../views/Record.vue'
import Statistics from '../views/Statistics.vue'
import System from '../views/System.vue'
import Resources from '../views/Resources.vue'
import ProjectManagement from '../views/ProjectManagement.vue'
import Blacklist from '../views/Blacklist.vue'
import EmailTemplate from '../views/EmailTemplate.vue'
import EmailServer from '../views/EmailServer.vue'
import ResponseServer from '../views/ResponseServer.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/show', component: Show },
    {
        path: '/home',
        component: Home,
        children: [
            { path: 'connection', component: Connection },
            { path: 'department', component: Department },
            { path: 'evaluation', component: Evaluation },
            { path: 'personnel', component: Personnel },
            { path: 'record', component: Record },
            { path: 'statistics', component: Statistics },
            { path: 'system', component: System },
            { path: 'resources', component: Resources },
            { path: 'projectManagement', component: ProjectManagement },
            { path: 'blacklist', component: Blacklist },
            { path: 'emailTemplate', component: EmailTemplate },
            { path: 'emailServer', component: EmailServer },
            { path: 'responseServer', component: ResponseServer }
        ]
    },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

=======
import * as VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Show from '../views/Show.vue'
import Home from '../views/Home.vue'
import Connection from '../views/Connection.vue'
import Department from '../views/Department.vue'
import Evaluation from '../views/Evaluation.vue'
import Personnel from '../views/Personnel.vue'
import Record from '../views/Record.vue'
import Statistics from '../views/Statistics.vue'
import System from '../views/System.vue'
import Resources from '../views/Resources.vue'
import ProjectManagement from '../views/ProjectManagement.vue'
import Blacklist from '../views/Blacklist.vue'
import EmailTemplate from '../views/EmailTemplate.vue'
import EmailServer from '../views/EmailServer.vue'
import ResponseServer from '../views/ResponseServer.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/show', component: Show },
    {
        path: '/home',
        component: Home,
        children: [
            { path: 'connection', component: Connection },
            { path: 'department', component: Department },
            { path: 'evaluation', component: Evaluation },
            { path: 'personnel', component: Personnel },
            { path: 'record', component: Record },
            { path: 'statistics', component: Statistics },
            { path: 'system', component: System },
            { path: 'resources', component: Resources },
            { path: 'projectManagement', component: ProjectManagement },
            { path: 'blacklist', component: Blacklist },
            { path: 'emailTemplate', component: EmailTemplate },
            { path: 'emailServer', component: EmailServer },
            { path: 'responseServer', component: ResponseServer }
        ]
    },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

>>>>>>> ljy
export default router;