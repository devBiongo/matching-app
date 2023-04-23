const path = require('path')
const CracoLessPlugin = require('craco-less');
const { loaderByName } = require('@craco/craco');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function (webpackEnv) {
  const lessModuleRegex = /\.module\.less$/;
  return {
    // wepack配置
    webpack: {
      // 別名
      alias: {
        // 使用@就表示src路徑
        '@': path.resolve(__dirname, 'src')
      },
      // 编辑器代码高亮配置
      plugins: {
        add: [
          // monaco-editor
          new MonacoWebpackPlugin({
            languages: ['sql','java']
          })
        ]
      }
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          // less loader option
          lessLoaderOptions: {
            lessOptions: {
              /*
                  如果项目中有使用TDesign或AntDesign组件库需要自定义主题，可以在modifyVars中添加对应less变量
              */
              // modifyVars: {
              //     @primary-color: '#2378ff'
              // },
              javascriptEnabled: true,
            },
          },
          modifyLessRule(lessRule) {
            lessRule.exclude = lessModuleRegex;
            return lessRule;
          },
          modifyLessModuleRule(lessModuleRule) {
            // configure the file suffix
            lessModuleRule.test = lessModuleRegex;

            // configure the generated local ident name
            const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'));
            cssLoader.options.modules = {
              /* 
                  注意这里的命名规则：
                  - CRA脚手架创建的项目是可以直接使用css modules的，css文件的命名规则默认是[local]_[hash:base64:5]
                  - 这里使用css modules的命名规则
              */

              localIdentName: '[local]_[hash:base64:5]',
            };

            return lessModuleRule;
          },
        },
      }
    ],
  };
};