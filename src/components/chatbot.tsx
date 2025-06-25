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
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
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
        <div className={`fixed bottom-6 right-6 z-50 w-96 h-[500px] rounded-lg shadow-2xl border transition-all duration-300 ${
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
                      <p className={`text-sm ${language === 'ar' && message.role === 'assistant' ? 'arabic-text' : ''}`}>
                        {message.role === 'assistant' ? (
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
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          message.content
                        )}
                      </p>
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