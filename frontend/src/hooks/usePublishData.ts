import { useState, useEffect } from 'react'
import { useWallets } from '@privy-io/react-auth'
import { useGlobalContext } from '@/contexts/GlobalContext'
import {
  extractTextFromFile,
  computeCreate2Address,
  getTokenPriceInUSD,
} from '@/utils/helpers'
import {
  deployNFTContract,
  encryptFileWithLitProtocol,
  getAuthSig,
  getlitNodeClient,
  updateNFTCID,
  uploadEncryptedFile,
  uploadMetadata,
  generateImage,
} from '@/utils/marketplace'
import { sepolia } from 'viem/chains'

export const usePublishData = () => {
  const { wallets } = useWallets()
  const { smartAccountClient } = useGlobalContext()
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<any>(null)
  const [nftTitle, setNftTitle] = useState('')
  const [nftAddress, setNftAddress] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [price, setPrice] = useState(0)
  const [ethPrice, setEthPrice] = useState('0')
  const [coverImage, setCoverImage] = useState<any | null>(null)
  const [termsChecked, setTermsChecked] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorTitle, setErrorTitle] = useState('')
  const [generating, setGenerating] = useState(false)
  const [prompt, setPrompt] = useState('')
  const closeError = () => setIsError(false)
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType !== 'privy',
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      if (
        (file && file.type === 'application/msword') ||
        (file &&
          file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      ) {
        setFile(file)
        localStorage.removeItem('savedDocument')
        const reader = new FileReader()
        reader.onload = async () => {
          const content = reader.result as ArrayBuffer
          const textContent = await extractTextFromFile(content)
          setFileContent(textContent)
        }
        reader.readAsArrayBuffer(file)
      } else {
        setIsError(true)
        setErrorTitle('Unsupported File Format')
        setErrorMessage(
          'Currently, we only accept documents in .doc or .docx format.',
        )
      }
    }
  }

  useEffect(() => {
    if (fileContent) {
      localStorage.setItem('savedDocument', JSON.stringify(fileContent))
    }
  }, [fileContent])

  const publish = async () => {
    if (!file) {
      console.log('please upload a valid document')
      setLoading(false)
      setProgress('')
      return
    }
    setLoading(true)
    const smartAccount = await smartAccountClient()
    const ownerAddress = embeddedWallet?.address!
    const provider = await embeddedWallet?.getEthereumProvider()
    try {
      const litNodeClient = await getlitNodeClient()
      const nonce = await litNodeClient.getLatestBlockhash()

      const predictedNFTAddress = await computeCreate2Address(
        ownerAddress,
        ethPrice,
        nonce,
      )

      setProgress('deploying NFT Contract')
      const deployResponse = await deployNFTContract(
        ownerAddress,
        nonce,
        provider,
        ethPrice,
      )

      if (!deployResponse) {
        console.log('Could not deploy NFT contract')
        return
      }

      setProgress('Signing encryption')
      const authSig = await getAuthSig(
        await embeddedWallet?.getEthersProvider(),
        ownerAddress,
        sepolia.id.toString(),
        nonce,
      )

      setProgress('Encrypting with LIT')
      const encryptedJSON = await encryptFileWithLitProtocol(
        authSig,
        ownerAddress,
        predictedNFTAddress,
        litNodeClient,
        file,
      )

      setProgress('Updating NFT metadata')
      const metadata = await uploadEncryptedFile(encryptedJSON, ownerAddress, {
        nftTitle,
        description,
        category,
        coverImage,
      })

      const metaDataCID = await uploadMetadata(metadata)

      const updateResponse = await updateNFTCID(
        predictedNFTAddress,
        metaDataCID,
        ownerAddress,
        provider,
      )
      console.log(updateResponse)
      setNftAddress(predictedNFTAddress)
      setLoading(false)
      setSuccess(true)
    } catch (e) {
      setLoading(false)
      setSuccess(false)
      setProgress('')
    }
  }

  const generateThumbnail = async () => {
    setGenerating(true)
    const _prompt = `$${prompt} 
    
    please use context to generate a thumbnail of an NFT representing the ${
      category || ''
    } document, ${nftTitle}, ${description}

    don't add texts to image
    `
    const image = await generateImage(_prompt)
    if (image) {
      setGenerating(false)
      setCoverImage(image)
    }
  }

  const handleInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >,
  ) => {
    const { name, value, type, checked } = event.target
    if (type === 'checkbox') {
      setTermsChecked(checked)
    } else if (name === 'price') {
      setPrice(parseFloat(value))
    } else {
      switch (name) {
        case 'nftTitle':
          setNftTitle(value)
          break
        case 'description':
          setDescription(value)
          break
        case 'category':
          setCategory(value)
          break
        case 'prompt':
          setPrompt(value)
          break
        case 'price':
          setPrice(parseFloat(value))
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    async function fetchPrice() {
      const x = await getTokenPriceInUSD(price)
      setEthPrice(x.toString())
    }
    if (price) {
      fetchPrice()
    }
  }, [price])

  return {
    file,
    fileContent,
    nftTitle,
    description,
    category,
    price,
    ethPrice,
    coverImage,
    termsChecked,
    isError,
    errorMessage,
    errorTitle,
    generating,
    prompt,
    progress,
    loading,
    success,
    nftAddress,
    handleFileChange,
    handleInput,
    closeError,
    publish,
    setPrice,
    generateThumbnail,
  }
}
