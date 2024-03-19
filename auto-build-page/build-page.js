let addConfig = require('./addConfig')
let fs = require('fs')
let path = require('path')

// 创建目录
function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      }
    }

addConfig.pageConfig.forEach((e) => {
  let UpperCase;
  if (e.class.includes('_') || e.class.includes('-')) {
    UpperCase = e.class.replace(/_[a-z]/g, (el) => el[1].toLocaleUpperCase())
    UpperCase = UpperCase.replace(UpperCase[0], UpperCase[0].toLocaleUpperCase())
  } else UpperCase = e.class.replace(e.class[0], e.class[0].toLocaleUpperCase())

  console.log(UpperCase, e.class)
  e.Class = UpperCase
  e.IClass = 'I' + UpperCase

  if (e.open) {
    console.log('-----开始新建页面')
    buildPage(e)
  } else {
    console.log(e.class + '-----关闭创建')
  }
})

function buildPage(config) {
  let tablePaths = path.resolve(`${addConfig.pageBase}/${config.dir}/${config.url? config.url:config.class}`)

  if (config.page == 'table') {
    console.log('table页面地址:' + tablePaths)
    fs.mkdir(tablePaths, function () {
      let strTable
      strTable = handleStr(
        fs.readFileSync(path.resolve('./auto-build-page/template/table.vue'), 'utf-8', (err) => {}),
        config
      )

      // 写入文件
      console.log('开始写入table文件:' + config.class)
    
      mkdirsSync(tablePaths)
      fs.writeFileSync(tablePaths + '/index.vue', strTable, (err) => {})
      console.log('table文件写入成功:' + config.class)
    })

  }else if(config.page == 'page'){
    console.log('table页面地址:' + tablePaths)
    fs.mkdir(tablePaths, function () {
      let strTable
      strTable = handleStr(
        fs.readFileSync(path.resolve('./auto-build-page/template/index.vue'), 'utf-8', (err) => {}),
        config
      )

      // 写入文件
      console.log('开始写入table文件:' + config.class)
      mkdirsSync(tablePaths)
      fs.writeFileSync(tablePaths + '/index.vue', strTable, (err) => {})
      console.log('table文件写入成功:' + config.class)
    })
  }


  // 生成model页面
  let modelsPaths = path.resolve(`${addConfig.modelsBase}/${config.dir}/${config.class}`)
  console.log('models页面地址:' + modelsPaths)
  fs.mkdir(modelsPaths, function () {
    let strConfig, strTS, strList, strType

      // 新建空白页，读取空白页模版
      strConfig = handleStr(
        fs.readFileSync(path.resolve('./auto-build-page/template/template.config.tsx'), 'utf-8', (err) => {}),
        config
      )
      strList = handleStr(
        fs.readFileSync(path.resolve('./auto-build-page/template/template.list.tsx'), 'utf-8', (err) => {}),
        config
      )
   
    // 写入文件
    console.log('开始写入models文件:' + config.class)
    mkdirsSync(modelsPaths)
    fs.writeFileSync(modelsPaths + `/${config.class}.config.tsx`, strConfig, (err) => {})
    fs.writeFileSync(modelsPaths + `/${config.class}.list.tsx`, strList, (err) => {})
    console.log('models文件写入成功:' + config.class)
  })

}


function handleStr(str, config) {
  if (config.helloworld) {
    return str
  }
  str = str.replace(/"%class%"/g, config.class)
  str = str.replace(/"%Class%"/g, config.Class)
  str = str.replace(/"%IClass%"/g, config.IClass)
  str = str.replace(/"%title%"/g, config.title)
  str = str.replace(/"%dir%"/g, config.dir)

  return str
}