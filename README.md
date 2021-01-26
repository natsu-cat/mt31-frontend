# mt31-frontend

# 環境構築

## webpack

`npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`

## React

`npm install --save-dev react react-bootstrap bootstrap react-dom react-router react-router-dom axios react-responsive react-select react-file-reader react-anchor-link-smooth-scroll react-bootstrap-table-next react-bootstrap-table2-paginator react-bootstrap-table2-filter`

## CSS & SCSS

`npm install --save-dev css-loader style-loader sass-loader`

## TypeScript

`npm install --save-dev typescript tslint ts-loader @types/react @types/react-dom @types/react-responsive @types/react-select @types/react-bootstrap-table-next @types/react-bootstrap-table2-paginator @types/react-bootstrap-table2-filter`

## fortawesome

`npm install --save-dev @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome`


### もしAllGrade.tsxがエラー出る場合
node_modules > @types > react-bootstrap-table2-pagenator > index.d.tsの18行目の
これを`declare function paginationFactory(options: PaginationOptions): PaginationCtxOptions;`
こうする`declare function paginationFactory(options?: PaginationOptions): PaginationCtxOptions;`