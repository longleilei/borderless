# Borderless

Borderless is a B2C cross-border transfer and foreign exchange application developed using OMG Network, a Layer-2 solution on top of Ethereum blockchain. 


![alt text](https://github.com/longleilei/borderless/blob/wzc1/welcome.png)

![alt text](https://github.com/longleilei/borderless/blob/wzc1/FXWallet.png)


# Quick Instruction  
Requirement: Node 12.16.1

To run the app:
Install dependencies in both “client” and “server” folder.

### `npm install`

Make sure you are using the correct version of Node (12.16.1).

Start the app by running 

### `npm run start`

from the server directory first, then client directory.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Detailed Instruction  

Our application has two parts: client and server. Client side is a wallet built with React.js which allows to make interactions with the OMG network from the browser. Server side is a backend that stores user information, built with Node, Express and MongoDB. To run this application locally, make sure you have a local instance of elixir-omg running (Private Network) or have access to an already deployed network (Public Test Network, such as Rinkeby).
To run the app:
1.	Install dependencies by running npm install command from both “client” and “server” folder.
2.	Create a .env file in the root and add the following configuration. 
![alt text](https://github.com/longleilei/borderless/blob/wzc1/network.png)
Switch between Private Network and Rinkeby Network by commenting out corresponding lines.
5. Make sure you are using the correct version of Node (12.16.1).
6.	Start the app by running  npm run start  from the server directory first, then client directory.
Now you are running the wallet locally. Open up your browser and navigate to http://localhost:3000.

# Register 
As a new user, you may choose to register or Google sign-in. Or use these credentials: 

username: project 
password: project12 

# Testing Exchange 
Exchange allows to send amount of money converted to another currency. 

1. Make sure that you have Metamask wallet preinstalled. Choose Rinkeby Network on Metamask (in case you test on Rinkeby). 
2. Import OMG Network Accounts which will have test Ether. Or you can use other two accounts and get test Ether from Rinkeby faucet. 
3. Try to deposit some amount of money from Metamask Wallet. Just click "Deposit" inside of our app. 
4. Try to make a transfer from one account to another using Metamask address hashes. Choose currency you want to convert your amount of money to. 

# Testing Transfer  
Transfer allows to send same currency to another wallet. 

1. You can test this function if you add your custom ERC-20 token. 
2. To deposit, choose ERC-20 token option and input smart contract address along with the amount of tokens for transfer. 
3. For transfering, steps are similar to Exchange. 

Good luck with Borderless! 


