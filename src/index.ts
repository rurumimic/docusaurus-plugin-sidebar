import path from 'path'
import { PluginOptions } from './types'
import { LoadContext } from '@docusaurus/types'
import createSidebar from './utils'

const DEFAULT_OPTIONS: PluginOptions = {
  dir: 'sidebar',
  file: 'sidebars.js'
}

export default function pluginSidebar(
  context: LoadContext,
  opts: Partial<PluginOptions>
) {
  const options = { ...DEFAULT_OPTIONS, ...opts }
  const contentPath = path.resolve(context.siteDir, options.dir)
  createSidebar(context.siteDir, options.dir, options.file)
  return {
    name: 'docusaurus-plugin-sidebar',
    getPathsToWatch() {
      return [`${contentPath}/**/*.yml`];
    }
  }
}
