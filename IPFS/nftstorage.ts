import { NFTStorage } from 'nft.storage'

export async function storeFileWithNftStorage(file: File) {
    const token = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN
    if (!token) {
        throw new Error('No NFT Storage token')
    }

    const client = new NFTStorage({ token: token })
    const cid = await client.storeDirectory([file])
    const gatewayUrl = `https://nftstorage.link/ipfs/${cid}/${file.name}`

    return {
        cid,
        gatewayUrl
    }
}

export async function storeFancyNFTData(image: File, projectData: { name: string, description: string, properties: Record<string,any> }) {
    const token = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN
    if (!token) {
        throw new Error('No NFT Storage token')
    }

    const client = new NFTStorage({ token: token })

    // https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#store
    client.store({ 
        ...projectData,
        image,
        properties: {
            foo: new Blob()
        }
    })
}