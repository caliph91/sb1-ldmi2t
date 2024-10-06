"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'

export default function API() {
  const [apiData, setApiData] = useState(null)
  const [selectedEndpoint, setSelectedEndpoint] = useState('')
  const [inputParams, setInputParams] = useState({})
  const [apiResponse, setApiResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    fetch('https://api.tiklydown.eu.org/swagger.json')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error('Error fetching API data:', error))
  }, [])

  const handleEndpointChange = (value) => {
    setSelectedEndpoint(value)
    setInputParams({})
    setApiResponse(null)
  }

  const handleInputChange = (paramName, value) => {
    setInputParams(prev => ({ ...prev, [paramName]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setApiResponse(null)
    const endpoint = apiData.paths[selectedEndpoint]
    const method = Object.keys(endpoint)[0]
    const url = new URL(`https://api.tiklydown.eu.org${selectedEndpoint}`)
    
    Object.keys(inputParams).forEach(key => 
      url.searchParams.append(key, inputParams[key])
    )

    try {
      const response = await fetch(url, { method: method.toUpperCase() })
      const data = await response.json()
      setApiResponse(data)
    } catch (error) {
      console.error('Error calling API:', error)
      setApiResponse({ error: 'An error occurred while calling the API' })
    } finally {
      setLoading(false)
    }
  }

  if (!apiData) {
    return <div>Loading API documentation...</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">{apiData.info.title}</CardTitle>
        <CardDescription className="text-center mt-2">
          <ReactMarkdown>{apiData.info.description}</ReactMarkdown>
        </CardDescription>
        <p className="text-center mt-2">Version: {apiData.info.version}</p>
        <div className="text-center mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h3 className="text-lg font-semibold mb-2">API Hostname</h3>
          <code className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-sm">https://api.tiklydown.eu.org</code>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="documentation">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
          </TabsList>
          <TabsContent value="documentation">
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(apiData.paths).map(([path, methods]) => (
                <AccordionItem value={path} key={path}>
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">{path}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(methods).map(([method, details]) => (
                      <div key={method} className="mb-4 p-4 border rounded">
                        <div className="flex items-center mb-2">
                          <Badge variant="outline" className="mr-2">{method.toUpperCase()}</Badge>
                          <span className="font-semibold">{details.summary}</span>
                        </div>
                        <ReactMarkdown className="text-sm text-gray-600 dark:text-gray-300 mb-2">{details.description}</ReactMarkdown>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                          Full URL: <code>https://api.tiklydown.eu.org{path}</code>
                        </p>
                        {details.parameters && (
                          <div className="mb-2">
                            <h4 className="font-semibold mb-1">Parameters:</h4>
                            <ul className="list-disc list-inside">
                              {details.parameters.map((param, index) => (
                                <li key={index} className="text-sm">
                                  {param.name} ({param.in}) - {param.required ? 'Required' : 'Optional'}: <ReactMarkdown className="inline">{param.description}</ReactMarkdown>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {details.responses && (
                          <div>
                            <h4 className="font-semibold mb-1">Responses:</h4>
                            <ul className="list-disc list-inside">
                              {Object.entries(details.responses).map(([code, response]) => (
                                <li key={code} className="text-sm">
                                  {code}: <ReactMarkdown className="inline">{response.description}</ReactMarkdown>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="playground">
            <div className="space-y-4">
              <Select onValueChange={handleEndpointChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an endpoint" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(apiData.paths).map(path => (
                    <SelectItem key={path} value={path}>{path}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedEndpoint && apiData.paths[selectedEndpoint] && (
                <div className="space-y-4">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Full URL: <code>https://api.tiklydown.eu.org{selectedEndpoint}</code>
                  </p>
                  {Object.values(apiData.paths[selectedEndpoint])[0].parameters?.map(param => (
                    <div key={param.name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {param.name} {param.required && <span className="text-red-500">*</span>}
                      </label>
                      <Input
                        type="text"
                        placeholder={param.description}
                        onChange={(e) => handleInputChange(param.name, e.target.value)}
                        required={param.required}
                      />
                    </div>
                  ))}
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Loading...' : 'Send Request'}
                  </Button>
                </div>
              )}
              {apiResponse && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">API Response:</h3>
                  <SyntaxHighlighter
                    language="json"
                    style={theme === 'dark' ? vscDarkPlus : vs}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      maxHeight: '400px',
                      overflow: 'auto'
                    }}
                  >
                    {JSON.stringify(apiResponse, null, 2)}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}