const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    errorLogs: state => state.errorLog.logs,
    token: state => state.member.token,
    avatar: state => state.member.avatar,
    name: state => state.member.name,
    roles: state => state.member.roles,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
}
export default getters
