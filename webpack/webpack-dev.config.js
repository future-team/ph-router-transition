var webpackConfig = require('./webpack.config');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var gutil = require("gulp-util");

module.exports= function(){
    var devPort = 8081;
    var wbpk = Object.create(webpackConfig);

    wbpk.devtool = 'eval';
    wbpk.entry={index:[path.join(process.cwd(),'example/src/index.js')]};
    wbpk.output.filename = 'example.js';
    for (var key in wbpk.entry) {
        var ar = wbpk.entry[key];

        if (key != "common" && key!='dev') {
            ar.unshift('webpack-dev-server/client?http://127.0.0.1:'+devPort , "webpack/hot/dev-server");
        }
    }
    wbpk.externals = [];
    wbpk.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

    wbpk.module.loaders=wbpk.module.loaders.filter(function(item){
        return item.test.toString().match(/less|css/i)==null;
    }).concat([
        {
            test: /\.(less$)$/,
            loader:"style!css!less"
        },
        {
            test: /\.css$/,
            loader: "style!css?-restructuring"
        }
    ]);

    wbpk.resolve =  {
        alias: { "ph-router-transition" : "../../src/index.js" }
    };

    var compiler = webpack(wbpk);

    new WebpackDevServer(compiler, {
        publicPath: "/dist/",
        contentBase:path.join(process.cwd(),'example/'),
        hot: true,
        historyApiFallback: true,
        port: devPort,
        stats: {
            colors: true
        }
    }).listen(devPort, "127.0.0.1", function (err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);

        });
};
