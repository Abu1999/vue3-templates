let addConfig = require('./addConfig')
let fs = require('fs')
let path = require('path')

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

  if (config.page == 'table') {
    let tablePaths = path.resolve(`${addConfig.pageBase}/${config.url? config.url:config.class}`)
    console.log('table页面地址:' + tablePaths)
    fs.mkdir(tablePaths, function () {
      let strTable
      strTable = handleStr(
        fs.readFileSync(path.resolve('./src/auto-build-page/template/table.vue'), 'utf-8', (err) => {}),
        config
      )

      // 写入文件
      console.log('开始写入table文件:' + config.class)
      fs.writeFileSync(tablePaths + '/index.vue', strTable, (err) => {})
      console.log('table文件写入成功:' + config.class)
    })

  }


  // 生成model页面
  let modelsPaths = path.resolve(`${addConfig.modelsBase}/${config.class}`)
  console.log('models页面地址:' + modelsPaths)
  fs.mkdir(modelsPaths, function () {
    let strConfig, strTS, strList, strType

    if (config.page == 'models' || config.page == 'table') {
      // 新建空白页，读取空白页模版
      strConfig = handleStr(
        fs.readFileSync(path.resolve('./src/auto-build-page/template/template.config.ts'), 'utf-8', (err) => {}),
        config
      )
      strTS = handleStr(
        fs.readFileSync(path.resolve('./src/auto-build-page/template/template.ts'), 'utf-8', (err) => {}),
        config
      )
      strList = handleStr(
        fs.readFileSync(path.resolve('./src/auto-build-page/template/template.list.tsx'), 'utf-8', (err) => {}),
        config
      )
      strType = handleStr(
        fs.readFileSync(path.resolve('./src/auto-build-page/template/types.ts'), 'utf-8', (err) => {}),
        config
      )
    }


    // 写入文件
    console.log('开始写入models文件:' + config.class)
    fs.writeFileSync(modelsPaths + `/${config.class}.config.ts`, strConfig, (err) => {})
    fs.writeFileSync(modelsPaths + `/${config.class}.ts`, strTS, (err) => {})
    fs.writeFileSync(modelsPaths + `/${config.class}.list.tsx`, strList, (err) => {})
    fs.writeFileSync(modelsPaths + `/types.ts`, strType, (err) => {})
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

  return str
}