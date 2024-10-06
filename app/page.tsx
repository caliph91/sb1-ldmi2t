"use client"

import React, { useState } from 'react'
import TikTokDownloader from '@/components/TikTokDownloader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { Download, Code, Info } from 'lucide-react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setData(null)

    try {
      const response = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError('An error occurred while fetching the data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <TikTokDownloader
        url={url}
        setUrl={setUrl}
        handleSubmit={handleSubmit}
        data={data}
        loading={loading}
        error={error}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="mr-2" /> Easy Download
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Download TikTok videos, photos, and music without watermarks quickly and easily.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2" /> API Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Integrate our TikTok downloader into your own applications with our API.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2" /> How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Simply paste the TikTok URL, click download, and save your favorite content, including music!</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}