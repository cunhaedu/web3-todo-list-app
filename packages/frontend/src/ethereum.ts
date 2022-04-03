import { ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import Todo from '@web3-todo-list-app/backend/artifacts/contracts/Todo.sol/Todo.json';
import { Todo as TodoType } from '@web3-todo-list-app/backend/typechain';

type EthereumProvider = Omit<ethers.providers.ExternalProvider, 'request'> & {
  request: (request: { method: string, params?: any[] }) => Promise<any>;
}

type IReturnProps = {
  todo: TodoType
}

export function getBlockchain(): Promise<IReturnProps> {
  return new Promise(async(resolve, reject) => {
    let metamaskProvider = await detectEthereumProvider() as EthereumProvider;

    if(!metamaskProvider) {
      reject('Please install MetaMask');
      return;
    }

    await metamaskProvider.request({ method: 'eth_requestAccounts' });
    // const networkId = await provider.request({ method: 'net_version' });

    const etherProvider = new ethers.providers.Web3Provider(metamaskProvider);
    const signer = etherProvider.getSigner();

    const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

    console.log(contractAddress);

    const todo = new Contract(
      contractAddress,
      Todo.abi,
      signer
    );

    resolve({ todo } as IReturnProps);
 });
}
