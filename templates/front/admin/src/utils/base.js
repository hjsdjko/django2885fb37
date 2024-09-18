const base = {
    get() {
        return {
            url : "http://localhost:8080/django2885fb37/",
            name: "django2885fb37",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于Django花卉商城系统的设计与实现"
        } 
    }
}
export default base
