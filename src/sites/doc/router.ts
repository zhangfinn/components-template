
const modulesPage = import.meta.globEager('/src/packages/**/doc.md', {
  as: 'raw',
})
const routes: any[] = []
for (const path in modulesPage) {
  let name = (/packages\/(.*)\/doc\.md/.exec(path) as any[])[1]
  routes.push({
    path: '/component/' + name,
    component: modulesPage[path],
    name,
  })
}


export default routes
