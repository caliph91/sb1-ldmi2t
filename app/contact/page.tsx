import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
        <CardDescription className="text-center">Get in touch with us through these platforms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://t.me/caliphdev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div>
              <h3 className="font-semibold">Telegram</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">@caliphdev</p>
            </div>
          </a>
          <a
            href="https://instagram.com/caliph.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">@caliph.dev</p>
            </div>
          </a>
          <a
            href="mailto:support@tiklydown.eu.org"
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">support@tiklydown.eu.org</p>
            </div>
          </a>
        </motion.div>
      </CardContent>
    </Card>
  )
}