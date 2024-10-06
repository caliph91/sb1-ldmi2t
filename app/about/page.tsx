import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'

export default function About() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">About Tiklydown</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg mb-4">
            Tiklydown is a powerful and user-friendly TikTok video, photo, and music downloader. Our service allows you to easily save your favorite TikTok content for offline viewing or sharing.
          </p>
          <p className="text-lg mb-4">
            With Tiklydown, you can:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Download TikTok videos without watermarks</li>
            <li>Save TikTok photos in high quality</li>
            <li>Extract and download TikTok music</li>
            <li>Quickly process and download content</li>
            <li>Use our service on any device with a web browser</li>
          </ul>
          <p className="text-lg">
            We're committed to providing a seamless experience for TikTok enthusiasts. Our team is constantly working to improve Tiklydown and ensure it remains compatible with TikTok's latest updates.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}