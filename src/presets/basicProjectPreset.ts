import { appendFileSystemItem, appendFileSystemProjectRoot, createProjectStructure, defaultStyle, uniqueId } from "../services/Core";
import { loadPackages } from "../services/PackagesLoader";
import { IProjectStructure } from "../interfaces/IProjectStructure";
import { store } from "../store/store";
import { IInstanseType } from "../interfaces/IINstanseType";

const basicProjectStructure: IProjectStructure = [
  {
    path: '',
    name: 'webpack.config.js',
    content: `const path = require("path");
    const webpack = require("webpack");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    
    module.exports = {
      mode: "development",
      devtool: "source-map",
      entry: {
        app: ['@babel/polyfill', path.resolve(__dirname, "src/index.tsx")],
      },
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].index.js",
      },
      module: {
        rules: [
          {
            test: /\.tsx?/,
            exclude: /node_modules/,
            use: "babel-loader",
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|ttf)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src/index.ejs"),
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
      devServer: {
        hot: true,
        quiet: true,
      },
      watchOptions: {
        poll: true,
        ignored: /node_modules/
      }
    };`
  },
  {
    path: '',
    name: 'tsconfig.json',
    content: `{
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "jsx": "react",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "noImplicitAny": false
      }
    }`
  },
  {
    path: '',
    name: 'babel.config.js',
    content: `module.exports = {
      presets: [
        "@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"
      ],
      plugins: [
        "babel-plugin-styled-components",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from",
      ]
    };`
  },
  {
    path: '',
    name: 'package.json',
    content: `{
      "name": "${name}",
      "version": "1.0.0",
      "description": "${name}",
      "main": "src/index.ts",
      "scripts": {
        "start": "webpack serve",
        "build": "webpack"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
          "react": "17.0.2",
          "react-dom": "17.0.2",
          "react-router": "5.2.0",
          "react-router-dom": "5.2.0",
          "styled-components": "5.2.3",
          "vienna-ui": "2.0.4",
          "stream": "0.0.2",
          "emitter": "0.0.5"
      },
      "devDependencies": {
        "@babel/core": "^7.14.0",
        "@babel/plugin-proposal-class-properties": "^7.13.0",
        "@babel/plugin-proposal-export-default-from": "^7.12.13",
        "@babel/polyfill": "^7.12.1",
        "@babel/preset-env": "^7.14.0",
        "@babel/preset-react": "^7.13.13",
        "@babel/preset-typescript": "^7.13.0",
        "@types/react": "^17.0.5",
        "@types/react-dom": "^17.0.3",
        "@types/react-router": "^5.1.13",
        "@types/react-router-dom": "^5.1.7",
        "@types/requirejs": "^2.1.32",
        "babel-loader": "^8.2.2",
        "babel-plugin-styled-components": "^1.12.0",
        "css-loader": "^5.2.4",
        "file-loader": "^6.2.0",
        "html-webpack-plugin": "^5.3.1",
        "style-loader": "^2.0.0",
        "typescript": "^4.2.4",
        "webpack": "^5.36.2",
        "webpack-cli": "^4.6.0",
        "webpack-dev-server": "^3.11.2"
      }
    }`
  },
  {
    path: '',
    name: 'src',
    isFolder: true,
  },
  {
    path: '/src',
    name: 'index.ejs',
    content: `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        <body>
            <div id="app"></div>
        </body>
    </html>`
  },
  {
    path: '/src',
    name: 'index.tsx',
    content: `import React from 'react';
    import ReactDOM from 'react-dom';
    import { Body } from 'vienna-ui';
    import { App } from "./containers/App/index.ts";
    ReactDOM.render(<Body><App /></Body>, document.getElementById('app'));`
  },
  {
    path: '/src',
    name: 'containers',
    isFolder: true,
  },
  {
    path: '/src',
    name: 'components',
    isFolder: true,
  },
]

export const createEmptyLayer = (name: string, type: IInstanseType) => {
  const folderId = appendFileSystemItem(`/src/${type}s`, name, true);

  appendFileSystemItem(
    `/src/${type}s/${name}`,
    'index.ts',
    false,
    `export * from './${name}.tsx';`)

  appendFileSystemItem(
    `/src/${type}s/${name}`,
    `${name}.styled.tsx`,
    false,
    `import styled from 'styled-components';
      // [[styled:start]]
      export const Box = styled.div\`\`;
      // [[styled:end]]`)

  appendFileSystemItem(
    `/src/${type}s/${name}`,
    `${name}.tsx`,
    false,
    `import React from 'react';
            
    // [[styled:start]]
    import { Box } from './${name}.styled.tsx';
    // [[styled:end]]

    // [[imports:start]]
    // [[imports:end]]

    export const ${name} = () => {

        // [[slots:start]]
        // [[slots:end]]

        return (
        // [[code:start]]
        // [[code:end]]
        );
    };

    export default ${name};`)

  const root = store.project.structure.find(item => !item.parentId)

  store.project.structure.push({
    id: uniqueId(),
    toolIcon: 'Body',
    parentId: root?.id,
    name,
    namespace: 'layer',
    isOpen: false,
    folderId,
    type,
    style: {...defaultStyle}
  });

  store.meta[name] = {
    namespace: 'custom',
    type: type,
    toolIcon: 'Body',
    allowChildren: null,
    resizable: 'none',
    nowrapChildren: true,
    nowrap: true,
  };

  return folderId;

};

export const baseProjectInit = async (name, isSimple) => {

  store.project.structure.push({
    id: uniqueId(),
    toolIcon: 'Body',
    name,
    namespace: 'root',
    isOpen: true,
  });

  appendFileSystemProjectRoot(name);
  createProjectStructure(basicProjectStructure);
  createEmptyLayer('App', 'container');

  if (!isSimple) {
    return await loadPackages(name);
  }
  return true;
}