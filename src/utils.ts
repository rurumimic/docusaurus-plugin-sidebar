import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

let _siteDir: string
let _sidebarDir: string

// List of files in a directory. non-recursive.
const ls = (directory: string, extension: string[]): string[] => {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .filter(dirent => extension.includes(path.extname(dirent.name)))
    .map(dirent => path.parse(dirent.name).name)
}

// YAML items
const doc = (id: string): Object => ({ type: 'doc', id: id })
const ref = (id: string): Object => ({ type: 'ref', id: id })
const link = (label: string, href: string): Object => ({ type: 'link', label: label, href: href })
const category = (label: string, items: Object[]): Object => ({ type: 'category', label: label, items: items })
const dir = (name: string, prefix: string, items?: any[]): Object => {
  const extension: string[] = ['.md', '.mdx']
  if (typeof items === 'undefined') {
    const directory = path.join(_siteDir, 'docs', prefix)
    const ids = ls(directory, extension)
    return dir(name, prefix, ids)
  } else {
    return category(name, items
      .map(item => path.join(prefix, String(item)).replace(/\\/g, '/'))
      .map(element => converter(element)))
  }
}

// YAML items -> Docusaurus Sidebar items
const converter = (element: string | { [x: string]: any }) => {
  if (typeof element === 'string') return doc(element)
  if (element.hasOwnProperty('ref')) return ref(element['ref'])
  if (element.hasOwnProperty('link')) return link(element['name'], element['link'])

  const key = Object.keys(element)[0]
  const value = Object.values(element)[0]

  if (value == null) return dir(key, '')
  if (typeof value === 'string') return dir(key, value, element['items'])
  return category(key, value.map((element: string | { [x: string]: any }) => converter(element)))
}

// YAML files in sidebar directory
const sidebarFiles = () => ls(path.resolve(_siteDir, _sidebarDir), ['.yml']).map(name => `./${_sidebarDir}/${name}.yml`)

// All YAML files in sidebar directory -> Docusaurus Sidebar items
const sidebarItems = () => {
  return sidebarFiles()
    .map(name => fs.readFileSync(name, 'utf8')) // Load File
    .map(file => YAML.parse(file)) // Parse YAML
    .filter(Boolean) // Drop empty file
    .reduce((map, menu: { key: string, value: any }) => {
      for (let [key, value] of Object.entries(menu)) {
        const submenu = value.map((e: string | { [x: string]: any }) => converter(e))
        map[key] = submenu
      }
      return map;
    }, {})
}

// sidebar.js module
const template = `module.exports = items;`

// Rewrite sidebars.js
const update = (sidebarFile: string, sidebarItems: string): void => {
  const rewrite = sidebarItems
  fs.writeFileSync(`./${sidebarFile}`, rewrite, 'utf8')
}

// Create Sidebar
const createSidebar = (siteDir: string, sidebarDir: string, sidebarFile: string): void => {
  _siteDir = siteDir
  _sidebarDir = sidebarDir
  const items = sidebarItems()
  const result = template.replace('items', JSON.stringify(items, null, 2))
  update(sidebarFile, result)
}

export default createSidebar
