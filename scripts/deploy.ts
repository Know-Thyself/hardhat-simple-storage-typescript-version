import { ethers, run, network } from 'hardhat'
import '@nomiclabs/hardhat-etherscan'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
	const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
	console.log('Deploying contract please wait ...')
	const simpleStorage = await simpleStorageFactory.deploy()
	await simpleStorage.deployed()
	// Contract gets deployed to hardhat network by default
	console.log(`Deployed contract to : ${simpleStorage.address}`)
	if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(4)
		await verify(simpleStorage.address, [])
	}

	const currentValue = await simpleStorage.retrieve()
	console.log(`Current value is: ${currentValue}`)
	const transactionResponse = await simpleStorage.store(7)
	await transactionResponse.wait(1)
	const updatedValue = await simpleStorage.retrieve()
	console.log(`Updated value is: ${updatedValue}`)
}

const verify = async (contractAddress: string, args: any[]) => {
	console.log('Verifying contract ...')
	try {
		await run('verify:verify', {
			address: contractAddress,
			constructorArguments: args,
		})
	} catch (err: any) {
		err.message.toLowerCase().includes('already verified')
			? console.log('Already Verified!')
			: console.log(err)
	}
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
