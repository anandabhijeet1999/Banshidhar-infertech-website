export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // If it's a local path (starts with /), return it as-is for static export
  if (src.startsWith('/')) {
    return src
  }
  
  // Otherwise, use Cloudinary loader
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/demo/image/upload/${params.join(
    ','
  )}${src}`
}