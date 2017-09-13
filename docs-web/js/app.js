const accessToken = window.$cookies.get('accessToken');
const apiBaseUrl = 'http://localhost:9000/api';
const authBaseUrl = 'http://localhost:9100/auth';
const refreshAuthTokenUrl = authBaseUrl + '/refresh';

var defaultAlert = {type: 'secondary', secs: 6, countDown: 0};

var Api = axios.create({
    baseURL: apiBaseUrl,
    headers: {'authority': 'bearer ' + accessToken}
});

var Auth = axios.create({
    baseURL: authBaseUrl,
    headers: {'authority': 'bearer ' + accessToken}
});

// request拦截器
Api.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// response拦截器
Api.interceptors.response.use(function (response) {
    refreshAuthToken();
    // 返回调用接口的Result
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

Auth.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

// 设置登录相关Cookie
function setLoginCookie(result) {
    window.$cookies.set('accessToken', result.accessToken, result.expiredIn);
    window.$cookies.set('user', JSON.stringify(result.user), result.expiredIn);
}

// 删除登录相关Cookie
function deleteLoginCookie() {
    window.$cookies.remove('user');
    window.$cookies.remove('accessToken');
}

// 刷新token
function refreshAuthToken() {
    Auth.get(refreshAuthTokenUrl).then(function (result) {
            if (result.code === 200) {
                setLoginCookie(result.data);
            } else {
                console.warn('更新授权信息失败');
            }
        }).catch(function (error) {
            console.error('更新授权信息出错');
        });
}

// tree元素组件
Vue.component('tree-item', {
    template: '#tree-template',
    props: {
        model: Object,
        id: String
    },
    data: function () {
        return {
            open: false
        }
    },
    computed: {
        isFolder() {
            return this.model.children &&
                this.model.children.length;
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.open = !this.open;
            } else {
                alert('show document');
            }
        },
        addChild: function () {
            alert('add');
        }
    }
});