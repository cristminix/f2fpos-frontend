import { useEffect, useState } from "react"
import FileUploadService from "~/services/FileUploadService"
// import { ProductImageService } from "~/services/ProductImageService"
//@ts-ignore
export const ProductImageItem = ({ imageUpload }) => {
  const [imageContent, setImageContent] = useState("")
  //   const productImageService = new ProductImageService()
  const loadImage = async () => {
    const fileInfo = await FileUploadService.getFile(imageUpload.key)
    console.log({ fileInfo })
    //@ts-ignore
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
      <div
        className="w-[250px] h-[250px] my-4 "
        style={{
          backgroundImage: `url(${imageContent}) center center`,
          backgroundAttachment: "cover",
        }}
      >
        <img src={imageContent} />
      </div>
    )
  }
}
