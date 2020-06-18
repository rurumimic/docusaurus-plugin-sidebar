# Docusaurus Plugin Sidebar

## Installation

```bash
yarn add docusaurus-plugin-sidebar
```

## Usage

### docusaurus.config.js

Add plugin:

```js
module.exports = {
  plugins: [require.resolve('docusaurus-plugin-sidebar')],
}
```

Options:

```js
module.exports = {
  plugins: [
    [ 
      require.resolve('docusaurus-plugin-sidebar'), 
      {
        dir: 'sidebar', // default sidebar directory
        file: 'sidebars.js' // default sidebar file
      }
    ]
  ],
}
```

### Sidebar Directory

Create a sidebar directory:

```bash
mkdir sidebar
```

### Sidebar Item Files

Create sidebar item files

```bash
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

### Run

#### Local Development

```
$ yarn start
```

#### Build

```
$ yarn build
```

---

## Advanced

### Document

```yml
- doc
```

### Ref

```yml
- ref: doc
```

### Link

```yml
- name: Link Name
  link: https://example.com
```

### Category

```yml
- upper category:
  - doc1
  - ref: doc2
  - name: Link Name
    link: https://example.com
  - category:
    - sub category:
      - doc3
      - doc4
```

### Auto-import

This is not the original option for docusaurus; it is easy to use when there are many documents.

There are three types.

1. All files in the directory will be included, in alphabetical order.

```yml
- Category Name: path/to/dir
```

2. You can also select files from the directory.

```yml
- Category Name: path/to/dir
  items:
    - doc1
    - doc2
    - doc5
    - doc4
```

3. If it leaves as the empty value, top directory (`docs`) documents are included. It is easier to know if you set it as an empty string.

```yml
- Category Name:
- Category Name: ''
```

Look at the [example code](example).
