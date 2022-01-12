//node 引入path模块
const path = require('path')


module.exports = { 
    //设置开发模式   选择的模式告诉webpack使用相应的内置优化。
    mode:'development',

    // 模块打包的入口  这里是应用执行的开始   如果传递一个数组，那么数组的每一项都会执行。
    entry:'',

    //打包过后输出的路径 所有输出文件的目标路径  必须是绝对路径 resolve路径解析
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'',
        //作用，取决于output.libraryTarget 选项的值
        library:'MyLibrary',
        //输出解析文件的目录，url相当于HTML页面
        publicPath:''
    },

    //关于模块配置
    module:{
        rules:[
            //模块配置规则(配置loader、解析器等选项)
            {
                //配置的查找文件后缀未jsx的文件
                test:/\.jsx?$/,
                include:[
                    path.resolve(__dirname,'app')
                ],
                exclude:[
                    path.resolve(__dirname,'')
                ],
                //issuer表示条件导入
                issuer:{ test , include , exclude },
                //应该应用的loader
                loader:'babel-loader',
                options:{
                    presets:['es2015']
                }
            }
        ]
    },

    //解析模块请求的选项   不适用于对loader解析
    modules:[
        'node_modules',
        //用于查找模块的目录
        path.resolve(__dirname,'app'),
    ],
    //使用的扩展名
    extensions:['.js','.json','.jsx','.css'],

    //模板别名列表
    alias:{
        //// 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
        'module':'new-module',
        
    },

    //应用于解析器的附加插件
    plugin:[

    ],

    //性能---配置如何展示性能提示，比如超过某个限定值，如何给出提示
    performance:{
        hints:'warning || error  || false', //枚举, error性能提示中抛出错误    false关闭性能提示
        
    },
    
    // 此选项控制是否生成，以及如何生成 source map。
    // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    // 牺牲了构建速度的 `source-map' 是最详细的。
    devtool:'source-map',

    //构建目标  指定一个环境
    //包应该运行的环境
    target:'web',

    //不要遵循/打包这些模块，而是再运行环境从环境中请求他们
    external:[

    ],
    
    //开发中
    devServer:{
        //代理
        proxy:{},
        contentBase:path.join(__dirname,'public') , //布尔|字符串|数组，静态文件位置  
        compress:true, //启用gzip压缩
        historyApiFallback:true,//对于404的index.html为True，对于多路径为object  
        hot:true,//热模块替换。 取决于HotModuleReplacementPlugin  
        https:true ,// true表示自签名，object表示证书授权  
        onInfo:true,//热加载时只有错误和警告 
    }
}