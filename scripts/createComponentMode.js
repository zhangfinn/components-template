// 创建模板
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const config = require('../src/config.json')
const demoModel = require('./demo')
const nav = config.nav
const pNameList = nav.map((item) => item.name)

var newCpt = {
  version: '0.0.1',
  name: '',
  cName: '',
  desc: '',
  pName: '',
  show: true,
  author: '',
}
function init() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '组件英文名(小写，长命名使用短横线连，如text-box)：',
        validate(value) {
          let repeat = false
          for (var i = 0; i < nav.length; i++) {
            for (var j = 0; j < nav[i].packages.length; j++) {
              if (nav[i].packages[j].name === value) {
                repeat = true
              }
            }
          }

          if (repeat) {
            return '该组件名已存在！'
          }
          const pass = value && value.match(/^[A-Z]/)
          if (!pass) {
            return true
          }
          return '不能为空，且每个单词的首字母都要小写，如text、text-box'
        },
      },
      {
        type: 'input',
        name: 'cName',
        message: '组件中文名(十个字以内)：',
        validate(value) {
          const pass = value && value.length <= 10
          if (pass) {
            return true
          }
          return '不能为空，且不能超过十个字符'
        },
      },
      {
        type: 'input',
        name: 'desc',
        message: '组件描述(五十个字以内)：',
      },
      {
        type: 'list',
        name: 'pName',
        message: '请选择组件分类：',
        choices: pNameList,
      },
      {
        type: 'input',
        name: 'author',
        message: '组件作者(可署化名):',
      },
    ])
    .then(function (answers) {
      newCpt = Object.assign(newCpt, answers)
      createNew()
    })
}
function createIndexJs() {
  const nameLc = newCpt.name.toLowerCase()
  const destPath = path.join('src/packages/' + nameLc)
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath)
  }

  if (newCpt.type == 'method') return
  return new Promise((resolve, reject) => {
    resolve(`生成index.js文件成功`)
  })
}

function createReact() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase()
    const name = newCpt.name
    let content = demoModel(name).react
    let indexFileContent = demoModel(name).index
    const dirPath = path.join(__dirname, `../src/packages/${nameLc}/`)
    const filePath = path.join(dirPath, `${nameLc}.tsx`)
    const indexFilePath = path.join(dirPath, `index.ts`)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(filePath)
    }
    try {
      fs.writeFileSync(filePath, content)
      fs.writeFileSync(indexFilePath, indexFileContent)
    } catch (e) {
      throw e
    }
    resolve(`生成index.ts文件成功`)
  })
}

function createDemo() {
  return new Promise((resolve, reject) => {
    const name = newCpt.name
    const nameLc = newCpt.name.toLowerCase()
    let content = demoModel(name).demo
    const dirPath = path.join(__dirname, '../src/packages/' + nameLc)
    const filePath = path.join(dirPath, `demo.tsx`)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(filePath)
    }
    fs.writeFile(filePath, content, (err) => {
      if (err) throw err
      resolve(`生成demo.tsx文件成功`)
    })
  })
}

function addToPackageJson() {
  return new Promise((resolve, reject) => {
    const item = nav.filter((item) => item.name === newCpt.pName)
    delete newCpt.pName
    item[0].packages.push(newCpt)
    config.nav = nav
    const dirPath = path.join(__dirname, `../`)
    const filePath = path.join(dirPath, `src/config.json`)

    var tempfile = JSON.stringify(config, null, 2)
    fs.writeFile(filePath, tempfile, (err) => {
      if (err) throw err
      resolve(`修改config.json文件成功`)
    })
  })
}

function createScss() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase()
    let content = ''
    const dirPath = path.join(__dirname, '../src/packages/' + nameLc)
    const filePath = path.join(dirPath, `${nameLc}.scss`)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(filePath)
    }
    fs.writeFile(filePath, content, (err) => {
      if (err) throw err
      resolve(`${nameLc}.scss文件成功`)
    })
  })
}

function createDoc() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase()
    const name = newCpt.name

    let content = demoModel(name).doc
    const dirPath = path.join(__dirname, '../src/packages/' + nameLc)
    const filePath = path.join(dirPath, `doc.md`)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(filePath)
    }
    fs.writeFile(filePath, content, (err) => {
      if (err) throw err
      resolve(`doc.md文件成功`)
    })
  })
}

function addTest() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase()
    const name = newCpt.name

    let testContent = demoModel(name).test
    const dirPath = path.join(__dirname, '../src/packages/' + nameLc)
    const testPath = path.join(
      __dirname,
      '../src/packages/' + nameLc + '/__tests__'
    )
    const testFilePath = path.join(testPath, `${nameLc}.spec.tsx`)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(filePath)
    }

    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath)
    }

    fs.writeFile(testFilePath, testContent, (err) => {
      if (err) throw err
      resolve(`单元测试文件成功`)
    })
  })
}

function createNew() {
  createIndexJs()
    .then(() => {
      return createReact()
    })
    .then(() => {
      return createScss()
    })
    .then(() => {
      return createDemo()
    })
    .then(() => {
      return createDoc()
    })
    .then(() => {
      return addTest()
    })
    .then(() => {
      return addToPackageJson()
    })
    .then(() => {
      console.log('组件模板生成完毕，请开始你的表演~')
      process.exit()
    })
}

function createComponent() {
  init()
}

createComponent()
