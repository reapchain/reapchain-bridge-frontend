# Reapchain Bridge

The Reapchain Bridge provides two important features:

- Convert classic REAP(cREAP) to REAP with MetaMask wallet
- Convert REAP to classic REAP(cREAP) with Keplr wallet
- [Bridge WebApp](https://bridge.reapchain.org)
- [GitBook Docs](https://reapchain.gitbook.io/mainnet/bridge/bridge)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set congig variables

Check the settings of the following files in the src/components path.

- bridgeConfig : fees for transaction
- chainConfig : network info for Reapchain & Ethereum
- contractConfig : contract address for ERC-20 & Bridge

## Available Scripts

In the project directory, you can run:

### `yarn`

Install modules in package.json file.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
