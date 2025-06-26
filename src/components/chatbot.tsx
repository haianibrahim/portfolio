"use client"

import React, { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export function Chatbot() {
  const { t, language } = useLanguage()
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasWelcomed, setHasWelcomed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add welcome message when chatbot opens for the first time
  useEffect(() => {
    if (isOpen && !hasWelcomed && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: t('chatbot.welcome'),
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
      setHasWelcomed(true)
    }
  }, [isOpen, hasWelcomed, messages.length, t])

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          language: language,
          history: messages.slice(-10) // Send last 10 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: language === 'ar' 
          ? 'عذراً، حدث خطأ أثناء الاستجابة. يرجى المحاولة مرة أخرى.'
          : 'Sorry, there was an error getting a response. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
        style={{
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))'
        }}
        aria-label="Open AI Assistant"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className={`fixed bottom-6 left-6 z-50 w-96 h-[500px] rounded-lg shadow-2xl border transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[500px]'
        }`}
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 border-b rounded-t-lg"
            style={{ borderColor: 'hsl(var(--border))' }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'hsl(var(--primary))' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="10" x="3" y="11" rx="2"/>
                  <circle cx="12" cy="5" r="2"/>
                  <path d="m12 7 0 4"/>
                  <line x1="8" x2="8" y1="16" y2="16"/>
                  <line x1="16" x2="16" y1="16" y2="16"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm">
                <span className={language === 'ar' ? 'arabic-text' : ''}>
                  {t('chatbot.title')}
                </span>
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={t('chatbot.minimize')}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" x2="19" y1="12" y2="12"/>
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={t('chatbot.close')}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" x2="6" y1="6" y2="18"/>
                  <line x1="6" x2="18" y1="6" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? ''
                          : theme === 'dark'
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                      style={{
                        backgroundColor: message.role === 'user' ? 'hsl(var(--primary))' : undefined,
                        color: message.role === 'user' ? 'hsl(var(--primary-foreground))' : undefined
                      }}
                    >
                      <div className={`text-sm ${language === 'ar' && message.role === 'assistant' ? 'arabic-text' : ''}`}>
                        {message.role === 'assistant' ? (
                          <div>
                            {message.content.includes('<cv-download') || message.content.includes('<social-') ? (
                              // Handle special interactive responses (CV download or social links)
                              <div>
                                {message.content.split(/(<(?:cv-download|social-linkedin|social-github).*?<\/(?:cv-download|social-linkedin|social-github)>)/g).map((part, index) => {
                                  // Handle CV download
                                  const cvMatch = part.match(/<cv-download href="([^"]*)">(.*?)<\/cv-download>/)
                                  if (cvMatch) {
                                    const [, href, text] = cvMatch
                                    return (
                                      <button
                                        key={index}
                                        onClick={() => {
                                          if (href && href !== '#') {
                                            window.open(href, '_blank', 'noopener,noreferrer')
                                          }
                                        }}
                                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                          <polyline points="7,10 12,15 17,10"/>
                                          <line x1="12" x2="12" y1="15" y2="3"/>
                                        </svg>
                                        {text}
                                      </button>
                                    )
                                  }
                                  
                                  // Handle LinkedIn
                                  const linkedinMatch = part.match(/<social-linkedin href="([^"]*)">(.*?)<\/social-linkedin>/)
                                  if (linkedinMatch) {
                                    const [, href, text] = linkedinMatch
                                    return (
                                      <button
                                        key={index}
                                        onClick={() => {
                                          if (href) {
                                            window.open(href, '_blank', 'noopener,noreferrer')
                                          }
                                        }}
                                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                        >
                                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        {text}
                                      </button>
                                    )
                                  }
                                  
                                  // Handle GitHub
                                  const githubMatch = part.match(/<social-github href="([^"]*)">(.*?)<\/social-github>/)
                                  if (githubMatch) {
                                    const [, href, text] = githubMatch
                                    return (
                                      <button
                                        key={index}
                                        onClick={() => {
                                          if (href) {
                                            window.open(href, '_blank', 'noopener,noreferrer')
                                          }
                                        }}
                                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                        >
                                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        {text}
                                      </button>
                                    )
                                  }
                                  
                                  return <span key={index}>{part}</span>
                                })}
                              </div>
                            ) : (
                              // Regular markdown content
                              <ReactMarkdown
                                components={{
                                  p: ({ children }) => <span>{children}</span>,
                                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                  em: ({ children }) => <em className="italic">{children}</em>,
                                  code: ({ children }) => (
                                    <code className="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs font-mono">
                                      {children}
                                    </code>
                                  ),
                                  ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
                                  ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1">{children}</ol>,
                                  li: ({ children }) => <li>{children}</li>,
                                  a: ({ href, children }) => (
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                      {children}
                                    </a>
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            )}
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div 
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}
                    >
                      <p className={`text-sm ${language === 'ar' ? 'arabic-text' : ''}`}>
                        {t('chatbot.typing')}
                      </p>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div 
                className="p-4 border-t"
                style={{ borderColor: 'hsl(var(--border))' }}
              >
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('chatbot.placeholder')}
                    className="flex-1 px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    style={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      textAlign: language === 'ar' ? 'right' : 'left'
                    }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))'
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z"/>
                      <path d="M22 2 11 13"/>
                    </svg>
                    <span className={language === 'ar' ? 'arabic-text' : ''}>
                      {t('chatbot.send')}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
} 