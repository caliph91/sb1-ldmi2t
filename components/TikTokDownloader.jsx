import React, { useRef, useEffect } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Music } from 'lucide-react'
import { motion } from 'framer-motion'

const TikTokDownloader = ({ url, setUrl, handleSubmit, data, loading, error }) => {
  const videoRef = useRef(null)
  let player = useRef(null)

  useEffect(() => {
    if (data && data.video && videoRef.current) {
      player.current = videojs(videoRef.current, {
        controls: true,
        preload: 'auto',
        responsive: true,
        fluid: true,
      })

      return () => {
        if (player.current) {
          player.current.dispose()
        }
      }
    }
  }, [data])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">TikTok Downloader</CardTitle>
        <CardDescription className="text-center">Enter a TikTok URL to download photos, videos, or music</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="Enter TikTok URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Downloading...' : 'Download'}
          </Button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-4"
          >
            <div className="flex items-center space-x-4">
              <img src={data.author.avatar} alt={data.author.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-semibold">{data.author.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{data.author.unique_id}</p>
              </div>
            </div>
            <p className="text-lg">{data.title}</p>
            {data.images ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg" />
                    <Button asChild className="w-full">
                      <a href={`https://cdn.tiklydown.eu.org/id/?hex=${encodeURIComponent(btoa(image.url))}&id=${data.id}-${index + 1}&ext=png`}
                        download={`${data.id}-${index + 1}.png`} rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : data.video ? (
              <div className="space-y-2">
                <div data-vjs-player>
                  <video
                    ref={videoRef}
                    className="video-js vjs-default-skin w-full h-auto rounded-lg"
                    poster={data.video.cover}
                  >
                    <source src={data.video.noWatermark} type="video/mp4" />
                  </video>
                </div>
                <Button asChild className="w-full">
                  <a href={`https://cdn.tiklydown.eu.org/id/?hex=${encodeURIComponent(btoa(data.video.noWatermark))}&id=${data.id}&ext=mp4`} download={`${data.id}.mp4`} rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Download Video
                  </a>
                </Button>
              </div>
            ) : null}
            {data.music && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Music className="mr-2 h-4 w-4" /> Music Information
                </h4>
                <p><strong>Title:</strong> {data.music.title}</p>
                <p><strong>Author:</strong> {data.music.author}</p>
                <p><strong>Duration:</strong> {data.music.duration} seconds</p>
                <Button asChild className="mt-2 w-full">
                  <a href={`https://cdn.tiklydown.eu.org/id/?hex=${encodeURIComponent(btoa(data.music.play_url))}&id=${data.id}&ext=mp3`}
                    download={`${data.id}.mp3`}
                    target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Download Music
                  </a>
                </Button>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{data.stats.likeCount} Likes ♥️</span>
              <span>{data.stats.commentCount} Comments 💬</span>
              <span>{data.stats.shareCount} Shares 🔗</span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default TikTokDownloader