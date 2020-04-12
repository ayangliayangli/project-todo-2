# project-todo-2

# data
 * project
   * id
   * version
   * name
   * subName
   * pressTime
   * desc
   * env
     * stg
     * testAccount
     * testAccountPwd
   * urls
     * {url, desc}
   * createdTime
   * updatedTime
 * todo
   * id
   * projectId
   * type -- feat bug style optimize rebuild
   * title
   * desc
   * status -- new dev test check
   * createdTime
   * updateTIme
   * logs
     * title
     * desc
     * createdTime
     * updatedTime

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
