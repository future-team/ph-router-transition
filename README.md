# ph-router-transition
一个基于React的移动端页面切换组件。

## Install
```
    $ npm install ph-router-transition --save
```

## Usage
 ```code
    import RouterTransition from 'ph-router-transition';

    const PageTransition = (props)=>(
        <RouterTransition {...props} transitionName="slide-left" loadedCallback={()=>{console.log('end!!!');}} timeout={500}>{props.children}</RouterTransition>
    );

    let Index = class index extends Component {
        render() {
            return (
                 <div className="menu ph-transition-index">
                  ...
                 </div>
            );
        }
    };

    <Router history={this.history}>
        <Route component={PageTransition}>
            <Route path="/index" name="index" component={Index} />
            <Route path="/detail" name="detail" component={Detail} />
            ...
            <Redirect from="/" to="/index" />
        </Route>
    </Router>
```

## Documentation
文档随时更新,请关注:
[http://future-team.github.io/ph-router-transition/doc/index.html](http://future-team.github.io/ph-router-transition/doc/index.html)

## Examples

[http://future-team.github.io/ph-router-transition/example/index.html](http://future-team.github.io/ph-router-transition/example/index.html)

```
    $ cd ph-router-transition
    $ npm install
    $ bower install

    生成文件：
    build：npm run build || gulp build

    开发调试：
    demo：npm run demo || gulp demo

    测试：
    npm run test

    生成文档：
    npm run doc

    查看示例：
    $npm install anywhere -g
    $ anywhere
```

## Command
```
    $ npm run demo
    $ npm run build
    $ npm run doc
    $ npm run test
```

## Repair

`version 0.1.0` new<br/>