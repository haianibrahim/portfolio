"use client"

import React, { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { animate } from "animejs"

interface ContactFormProps {
  closeModal?: () => void;
}

export function ContactForm({ closeModal }: ContactFormProps) {
  const { language } = useLanguage()
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formErrors, setFormErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})
  
  // Form animation on mount
  useEffect(() => {
    // Animate form elements with a staggered entrance
    animate(".form-element", {
      translateY: [20, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
      delay: (_el, i: number) => 700 + (i * 120)
    })
  }, [])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Get form data
    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Basic validation
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    
    const errors: typeof formErrors = {}
    
    if (!name || name.trim() === "") {
      errors.name = language === 'en' ? "Name is required" : "الاسم مطلوب"
    }
    
    if (!email || email.trim() === "") {
      errors.email = language === 'en' ? "Email is required" : "البريد الإلكتروني مطلوب"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = language === 'en' ? "Invalid email address" : "عنوان البريد الإلكتروني غير صالح"
    }
    
    if (!message || message.trim() === "") {
      errors.message = language === 'en' ? "Message is required" : "الرسالة مطلوبة"
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    // Clear errors and set status to submitting
    setFormErrors({})
    setFormStatus("submitting")
    
    try {
      // Send form data to Formspree
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      
      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`)
      }
      
      // Reset the form
      form.reset()
      setFormStatus("success")
      
      // Animate the success message
      animate(".form-success", {
        scale: [0.9, 1],
        opacity: [0, 1],
        easing: "easeOutElastic(1, 0.5)",
        duration: 800
      })
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
        if (closeModal) {
          setTimeout(() => {
            closeModal();
          }, 1000);
        }
      }, 5000)
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus("error")
      
      // Animate the error message
      animate(".form-error", {
        translateX: [10, 0, -10, 0, 10, 0],
        easing: "easeInOutSine",
        duration: 600
      })
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    }
  }
  
  const getButtonText = () => {
    switch (formStatus) {
      case "submitting":
        return language === 'en' ? "Sending..." : "جاري الإرسال..."
      case "success":
        return language === 'en' ? "Sent Successfully!" : "تم الإرسال بنجاح!"
      case "error":
        return language === 'en' ? "Failed to Send" : "فشل الإرسال"
      default:
        return language === 'en' ? "Send Message" : "إرسال الرسالة"
    }
  }
  
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden" style={{ backgroundColor: 'hsl(var(--card))' }}>
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-element opacity-0">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {language === 'en' ? "Name" : <span className="arabic-text">الاسم</span>}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                formErrors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              }`}
              style={{ background: 'hsl(var(--background))' }}
              disabled={formStatus === "submitting"}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>
          
          <div className="form-element opacity-0">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {language === 'en' ? "Email" : <span className="arabic-text">البريد الإلكتروني</span>}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                formErrors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              }`}
              style={{ background: 'hsl(var(--background))' }}
              disabled={formStatus === "submitting"}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          
          <div className="form-element opacity-0">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {language === 'en' ? "Message" : <span className="arabic-text">الرسالة</span>}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                formErrors.message ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              }`}
              style={{ background: 'hsl(var(--background))' }}
              disabled={formStatus === "submitting"}
            ></textarea>
            {formErrors.message && (
              <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
            )}
          </div>
          
          <div className="form-element opacity-0">
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className={`w-full py-3 px-4 rounded-md font-medium transition-all ${
                formStatus === "submitting" 
                  ? "bg-primary/70 text-primary-foreground cursor-not-allowed" 
                  : formStatus === "success" 
                  ? "bg-green-600 text-white cursor-pointer" 
                  : formStatus === "error" 
                  ? "bg-red-600 text-white cursor-pointer" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              }`}
            >
              {getButtonText()}
            </button>
          </div>
          
          {formStatus === "success" && (
            <div className="form-success p-4 rounded-md bg-green-100 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-800 text-green-700 dark:text-green-300 font-medium shadow-sm">
              {language === 'en' 
                ? "Thank you for your message! I'll get back to you as soon as possible." 
                : <span className="arabic-text">شكرًا لرسالتك! سأرد عليك في أقرب وقت ممكن.</span>}
            </div>
          )}
          
          {formStatus === "error" && (
            <div className="form-error p-4 rounded-md bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-800 text-red-900 dark:text-red-300">
              {language === 'en' 
                ? "There was an error sending your message. Please try again later or contact me directly." 
                : <span className="arabic-text">حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بي مباشرة.</span>}
            </div>
          )}
        </form>
      </div>
    </div>
  )
} 