let addConfig = require('./addConfig')
let fs = require('fs')
let path = require('path')

const {pageConfig,pageBase,modelsBase} = addConfig

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

pageConfig.forEach((e) => {
  let UpperCase;
  if (e.className.includes('_') || e.className.includes('-')) {
    UpperCase = e.className.replace(/_[a-z]/g, (el) => el[1].toLocaleUpperCase())
    UpperCase = UpperCase.replace(UpperCase[0], UpperCase[0].toLocaleUpperCase())
  } else UpperCase = e.className.replace(e.className[0], e.className[0].toLocaleUpperCase())

  e.ClassName = UpperCase
  e.IClassName = 'I' + UpperCase

  if (e.open) {
    console.log('-----开始新建页面')
    buildPage(e)
  } else {
    console.log(e.className + '-----关闭创建')
  }
})

function buildPage(config) {
  const {dir,url,className, page} = config

  let tablePaths = path.resolve(`${pageBase}/${dir}/${url? url:className}`)

  if (page == 'table' || page == 'page') {
    console.log(`${page}页面地址:` + tablePaths)
    fs.mkdir(tablePaths, function () {
      let strTable
      strTable = handleStr(
        fs.readFileSync(path.resolve(`./auto-build-page/template/${page}/index.vue`), 'utf-8', (err) => {}),
        config
      )

      // 写入文件
      console.log(`开始写入${page}文件:` + className)
    
      mkdirsSync(tablePaths)
      fs.writeFileSync(tablePaths + '/index.vue', strTable, (err) => {})
      console.log(`${page}文件写入成功:` + className)
    })

  }

  // 生成model页面
  let modelsPaths = path.resolve(`${modelsBase}/${dir}/${className}`)
  console.log('models页面地址:' + modelsPaths)
  fs.mkdir(modelsPaths, function () {
    let strConfig, strTS, strList, strType

      // 新建空白页，读取空白页模版
      strConfig = handleStr(
        fs.readFileSync(path.resolve(`./auto-build-page/template/${page}/template.config.ts`), 'utf-8', (err) => {}),
        config
      )
      strList = handleStr(
        fs.readFileSync(path.resolve(`./auto-build-page/template/${page}/template.list.tsx`), 'utf-8', (err) => {}),
        config
      )
   
    // 写入文件
    console.log('开始写入models文件:' + className)
    mkdirsSync(modelsPaths)
    fs.writeFileSync(modelsPaths + `/${className}.tsx`, strConfig, (err) => {})
    fs.writeFileSync(modelsPaths + `/${className}.list.tsx`, strList, (err) => {})
    console.log('models文件写入成功:' + className)
  })

}


function handleStr(str, config) {
  const {dir,title,className,ClassName,IClassName} = config

  str = str.replace(/"%class%"/g, className)
  str = str.replace(/"%Class%"/g, ClassName)
  str = str.replace(/"%IClass%"/g, IClassName)
  str = str.replace(/"%title%"/g, title)
  str = str.replace(/"%dir%"/g, dir? `/${dir}`:'')

  return str
}