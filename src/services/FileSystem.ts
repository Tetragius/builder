import fs from 'memfs';
import path from 'path-browserify';
import { getPackageJson } from '../utils/getPackage';

// core

fs.vol.fromJSON({}, '/');

export const readFileAsync = async (path: string): Promise<any> => new Promise(resolve => {
  const file = fs.readFileSync(path, 'utf8');
  resolve(file);
})

export const readFileSync = (path: string, format: string) => fs.readFileSync(path, format);

export const writeFileSync = (name: string, data: string | ArrayBuffer) => fs.writeFileSync(name, data);

export const writeFileAsync = async (name: string, data: string | ArrayBuffer) => {
  return new Promise(resolve => {
    fs.writeFile(name, data, resolve);
  })
}

export const mkdirSync = (path: string, opt?: any) => fs.mkdirSync(path, opt);

export const existsSync = (path: string) => fs.existsSync(path);

export const mkdirSyncReqFoeFile = (filePath: string) => {
  const dirName = path.dirname(filePath);
  fs.mkdirSync(dirName, { recursive: true });
}

// end core

export const createAppContainer = () => {
  fs.writeFileSync(`/project/src/containers/index.ts`, `
        export * from './App/index.ts';
    `);
  fs.mkdirSync('/project/src/containers/App');
  fs.writeFileSync(`/project/src/containers/App/index.ts`, `
        export * from './App.tsx';
    `);
  fs.writeFileSync(`/project/src/containers/App/App.styled.tsx`, `
  import styled from 'styled-components';
  export const Box = styled.div\`\`;
    `);
  fs.writeFileSync(`/project/src/containers/App/App.tsx`, `
        import React from 'react';
        import {Body} from 'vienna-ui';

        // [[imports]]

        export const App = () => {

            // [[slots]]

            return (
                <Body>
                   {/* [[code]] */}
                </Body>
            );
        }
    `);
};

export const createIndexTs = () => {
  fs.writeFileSync(`/project/src/index.tsx`, `
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { App } from "./containers/index.ts";

        ReactDOM.render(<App />, document.getElementById('app'));
    `);
};

export const createContainer = (containerName: string) => {
  fs.writeFileSync(`/project/src/containers/${containerName}/${containerName}.tsx`, `
        import React, {useEffect} from 'react';
        import { Box } from './${containerName}.styled.tsx';

        // [[imports]]

        export const ${containerName} = () => {

            // [[slots]]

            useEffect(()=>{
              console.log('ok');
            })

            return (
                <Box>
                    {/* [[code]] */}
                </Box>
            );
        };

        export default ${containerName};
    `);
};

export const createEmptyContainer = (containerName: string) => {
  fs.mkdirSync(`/project/src/containers/${containerName}`);
  fs.writeFileSync(`/project/src/containers/${containerName}/index.ts`, `
        export * from './${containerName}.tsx';
    `);
  fs.writeFileSync(`/project/src/containers/${containerName}/${containerName}.styled.tsx`, `
        import styled from 'styled-components';
        export const Box = styled.div\`\`;
    `);
  createContainer(containerName);
};

export const createIndexEjs = () => {
  fs.writeFileSync(`/project/src/index.ejs`, `<!DOCTYPE html>
<html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
    <body>
        <div id="app"></div>
    </body>

</html>`);
};

export const createPackageJson = () => {
  fs.writeFileSync(`/project/package.json`, `{
  "name": "project",
  "version": "1.0.0",
  "description": "",
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
}`);
};

export const createBabelConfig = () => {
  fs.writeFileSync(`/project/babel.config.js`, `module.exports = {
  presets: [
    "@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"
  ],
  plugins: [
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
  ]
};`);
};

export const tsConfig = () => {
  fs.writeFileSync(`/project/tsconfig.json`, `{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "jsx": "react",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false
  }
}`);
};

export const createWebpackConfig = () => {
  fs.writeFileSync(`/project/webpack.config.js`, `const path = require("path");
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
};`);
};


export const fsInit = async () => {
  mkdirSync('/project');
  mkdirSync('/project/src');
  mkdirSync('/project/src/containers');
  createIndexEjs();
  createIndexTs();
  createAppContainer();
  createPackageJson();
  createWebpackConfig();
  createBabelConfig();
  tsConfig();
  getPackageJson();
}