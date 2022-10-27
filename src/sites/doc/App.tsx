import React, { Suspense, useEffect, useMemo, useState } from 'react'
import routers from './router'
import ReactMarkdown from 'react-markdown'
import { Switch, Route, HashRouter, useLocation } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import './App.scss'
import { nav } from '@/config.json'
import '../assets/styles/markdown.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Nav from '@/sites/doc/components/nav'
import Header from '@/sites/doc/components/header'
import toUpperCaseName from '@/utils/toUpperCaseName'
const Title = () => {
  let location = useLocation()

  const getComponentName = () => {
    const s = window.location.hash.split('/')
    const cname = s[s.length - 1].toLowerCase()
    const component: any = {}
    nav.forEach((item: any) => {
      item.packages.forEach((sItem: any) => {
        if (sItem.name.toLowerCase() == cname) {
          component.name = toUpperCaseName(sItem.name)
          component.cName = sItem.cName
          return
        }
      })
    })
    return component
  }
  useEffect(() => {
    const componentName = getComponentName()
    setComponentName(componentName)
  }, [location])
  const [componentName, setComponentName] = useState({ name: '', cName: '' })
  return (
    <div className="title">
      {componentName.name}&nbsp;{componentName.cName}
    </div>
  )
}

const imageHandler = (data: any) => {
  const { alt, src, node } = data
  if (alt.includes('component-demo/')) {
    const name = alt.match(/component-demo\/(\S*)/)[1]
    const DemoComponent = React.lazy(
      () => import(/* @vite-ignore */ '../../packages/' + name)
    )
    return (
      <Suspense fallback={<span>Loading...</span>}>
        <DemoComponent />
      </Suspense>
    )
  }
  return <img alt={alt} src={src} />
}

const paragraphHandler = (props: any) => {
  return props.node.tagName === 'p' ? (
    <div children={props.children} />
  ) : (
    <p children={props.children} />
  )
}

const App = () => {
  return (
    <HashRouter>
      <Header></Header>
      <Nav></Nav>
      <div className="doc-content">
        <div className="doc-title">
          <div className="doc-title-position">
            <Title />
          </div>
        </div>
        <div className="doc-content-document">
          <Switch>
            {routers.map((ru, k) => {
              return (
                <Route key={Math.random()} path={ru.path}>
                  <ReactMarkdown
                    className="markdown-body"
                    children={ru.component}
                    remarkPlugins={[remarkGfm, remarkDirective]}
                    components={{
                      p: paragraphHandler,
                      img: imageHandler,
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  />
                </Route>
              )
            })}
          </Switch>
        </div>
      </div>
    </HashRouter>
  )
}
export default App
