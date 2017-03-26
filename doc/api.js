YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "RouterTransition"
    ],
    "modules": [
        "路由动画"
    ],
    "allModules": [
        {
            "displayName": "路由动画",
            "name": "路由动画",
            "description": "路由切换组件<br/>\n- 通过`transitionName`设置动画类型，可选`[fade, slide-top, slide-bottom, slide-left, slide-right]`。\n- 通过`loadedCallback`函数设置动画完成的回调。\n- 可通过`timeout`设置动画时间，和设置的css的动画时间一致是最流畅的。\n- 在列表页的最外层元素加`ph-transition-index`类，其他页面跳转到列表页都是回退的效果，到另一个新页面都是前进的效果。\n\n主要属性和接口：\n- transitionName:动画类型/动画名称，默认fade。\n- loadedCallback:动画完成的回调函数。\n- timeout:动画时间。\n\n示例：\n```code\n import RouterTransition from 'ph-router-transition';\n\n const PageTransition = (props)=>(\n     <RouterTransition {...props} transitionName=\"slide-left\" loadedCallback={()=>{console.log('end!!!');}} timeout={500}>{props.children}</RouterTransition>\n );\n```\n```code\n let Index = class index extends Component {\n     render() {\n         return (\n             <div className=\"menu ph-transition-index\">\n                 ...\n             </div>\n         );\n     }\n };\n```\n```code\n <Router history={this.history}>\n     <Route component={PageTransition}>\n         <Route path=\"/index\" name=\"index\" component={Index} />\n         <Route path=\"/detail\" name=\"detail\" component={Detail} />\n         ...\n         <Redirect from=\"/\" to=\"/index\" />\n     </Route>\n </Router>\n```",
            "classes": [
                {
                    "name": "RouterTransition"
                }
            ]
        }
    ]
} };
});