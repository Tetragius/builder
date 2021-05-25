import { uniqueId } from "../frame/services";
import { mkdirSync, writeFileSync } from "../services";
import { loadPackages } from "../services/PackagesLoader";
import { store } from "../store/store";

export const createIndexTs = (name) => {
  writeFileSync(`/${name}/src/index.tsx`, `
          import React from 'react';
          import ReactDOM from 'react-dom';
          import { Body } from 'vienna-ui';
          import { App } from "./containers/App/index.ts";
  
          ReactDOM.render(<Body><App /></Body>, document.getElementById('app'));
      `);
};

export const createEmptyContainer = (projectName: string, containerName: string) => {
  mkdirSync(`/${projectName}/src/containers/${containerName}`);
  writeFileSync(`/${projectName}/src/containers/${containerName}/index.ts`, `
            export * from './${containerName}.tsx';
      `);
  writeFileSync(`/${projectName}/src/containers/${containerName}/${containerName}.styled.tsx`, `
            import styled from 'styled-components';
             export const Box = styled.div\`\`;
      `);
  writeFileSync(`/${projectName}/src/containers/${containerName}/${containerName}.tsx`, `
            import React, {useEffect} from 'react';
            import { Box } from './${containerName}.styled.tsx';

            // [[imports:start]]

            // [[imports:end]]

            export const ${containerName} = () => {

                // [[slots:start]]

                // [[slots:end]]

                useEffect(()=>{
                    console.log('ok');
                })

                return (
                    <Box>
                        {/* [[code:start]] */}
                        {/* [[code:end]] */}
                    </Box>
                );
            };

            export default ${containerName};
  `);
};

export const createIndexEjs = (name) => {
  writeFileSync(`/${name}/src/index.ejs`, `<!DOCTYPE html>
  <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${name}</title>
      
      <body>
          <div id="app"></div>
      </body>
  
  </html>`);
};

export const createPackageJson = (name) => {
  writeFileSync(`/${name}/package.json`, `{
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
  }`);
};

export const createBabelConfig = (name) => {
  writeFileSync(`/${name}/babel.config.js`, `module.exports = {
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

export const tsConfig = (name) => {
  writeFileSync(`/${name}/tsconfig.json`, `{
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

export const createWebpackConfig = (name) => {
  writeFileSync(`/${name}/webpack.config.js`, `const path = require("path");
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


export const baseProjectInit = async (name) => {
  mkdirSync(`/${name}`);
  mkdirSync(`/${name}/src`);
  mkdirSync(`/${name}/src/containers`);



  createIndexEjs(name);
  createIndexTs(name);
  createPackageJson(name);
  createWebpackConfig(name);
  createBabelConfig(name);
  tsConfig(name);
  createEmptyContainer(name, 'App');

  store.fileSystem.push({ id: uniqueId(), name: `${name}`, isFolder: true, path: '', editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `webpack.config.js`, isFolder: false, path: `/${name}`, editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `tsconfig.json`, isFolder: false, path: `/${name}`, editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `babel.config.js`, isFolder: false, path: `/${name}`, editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `package.json`, isFolder: false, path: `/${name}`, editable: false, isOpen: false });

  store.fileSystem.push({ id: uniqueId(), name: `src`, isFolder: true, path: `/${name}`, editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `index.ts`, isFolder: false, path: `/${name}/src`, editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `containers`, isFolder: true, path: `/${name}/src`, editable: false, isOpen: false });

  store.fileSystem.push({ id: uniqueId(), name: `index.ejs`, isFolder: false, path: `/${name}/src`, editable: false, isOpen: false });

  store.fileSystem.push({ id: uniqueId(), name: `App`, isFolder: true, path: `/${name}/src/containers`, editable: false, isOpen: false });
  // store.fileSystem.push({ id: uniqueId(), name: `index.ts`, isFolder: false, path: `/${name}/src/containers`, editable: false, isOpen: false });

  store.fileSystem.push({ id: uniqueId(), name: `index.ts`, isFolder: false, path: `/${name}/src/containers/App`, editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `App.tsx`, isFolder: false, path: `/${name}/src/containers/App`, editable: false, isOpen: false });
  store.fileSystem.push({ id: uniqueId(), name: `App.styled.tsx`, isFolder: false, path: `/${name}/src/containers/App`, editable: false, isOpen: false });

  const pId = uniqueId();
  store.project.structure.push({ id: pId, name: name });
  store.project.structure.push({ id: uniqueId(), name: `App`, custom: true, parentId: pId });

  loadPackages();
}