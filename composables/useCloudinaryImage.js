export const useCloudinaryImage = () => {
  const config = useRuntimeConfig()

  async function resolve(filename) {
    if (!filename) return null
    const cloudinaryUrl = `https://res.cloudinary.com/${config.public.cloudinaryCloudName}/image/upload/${filename.replace(/\.[^.]+$/, '')}`

    try {
      const res = await fetch(cloudinaryUrl, { method: 'HEAD' })
      if (res.ok) return cloudinaryUrl
    } catch {
      console.log("woops")
    }
  }

  return { resolve }
}
