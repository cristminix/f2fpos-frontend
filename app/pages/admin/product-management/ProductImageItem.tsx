import { useEffect, useState } from "react"
import FileUploadService from "~/services/FileUploadService"
// import { ProductImageService } from "~/services/ProductImageService"

export const ProductImageItem = ({ imageUpload }) => {
  const [imageContent, setImageContent] = useState("")
  //   const productImageService = new ProductImageService()
  const loadImage = async () => {
    const fileInfo = await FileUploadService.getFile(imageUpload.key)
    console.log({ fileInfo })
    const { content } = fileInfo
    if (content) {
      setImageContent(content)
    }
  }
  useEffect(() => {
    loadImage()
  }, [])
  if (imageContent.length > 0) {
    return (
      <>
        <img src={imageContent} />
      </>
    )
  }
}
