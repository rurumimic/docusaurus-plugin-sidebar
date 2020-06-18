# [Docusaurus 2](https://v2.docusaurus.io/) with Sidebar Plugin

## Setup

```bash
yarn
```

### Sidebar Plugin

```bash
yarn add docusaurus-plugin-sidebar
```

#### Add Configuration

`docusaurus.config.js`

```js
module.exports = {
  plugins: [require.resolve('docusaurus-plugin-sidebar')],
}
```

#### Create Sidebar YAML Files

```bash
mkdir sidebar
vi sidebar/basic.yml
```

```yml
someSidebar: 
  - Docusaurus:
    - doc1
    - doc2
    - doc3
  - Features:
    - mdx
```

## Run

### Local Development

```
$ yarn start
```

### Build

```
$ yarn build
```
