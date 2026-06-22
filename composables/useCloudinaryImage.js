export const useCloudinaryImage = () => {
  const config = useRuntimeConfig()

  function resolve(filename) {
    if (!filename) return null

    if (filename.includes('mp4')) {
      return `https://res.cloudinary.com/${config.public.cloudinaryCloudName}/video/upload/${filename.replace(/\.[^.]+$/, '')}`
    }

    return `https://res.cloudinary.com/${config.public.cloudinaryCloudName}/image/upload/${filename.replace(/\.[^.]+$/, '')}`
  }

  return { resolve }
}