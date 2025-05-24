
import { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MessageForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using FormSubmit service
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Send the form data
      await fetch('https://formsubmit.co/vigneshmasani@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      // Reset the form
      if (formRef.current) formRef.current.reset();
      setFormData({ name: "", email: "", message: "" });
      
      // Show success message
      toast({
        title: "Message sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="message"
      className="section-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
    >
      <motion.h2 
        className="section-title text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Send a Message
      </motion.h2>
      
      <motion.form
        ref={formRef}
        action="https://formsubmit.co/vigneshmasani@gmail.com"
        method="POST"
        className="flex flex-col gap-4 max-w-md mx-auto"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: false }}
      >
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="rounded-md shadow-sm p-4 focus:ring-2 focus:ring-primary/50 transition-all"
        />
        
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="rounded-md shadow-sm p-4 focus:ring-2 focus:ring-primary/50 transition-all"
        />
        
        <Textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="rounded-md shadow-sm p-4 focus:ring-2 focus:ring-primary/50 resize-y min-h-[120px] transition-all"
        />
        
        {/* Hidden input for FormSubmit configuration */}
        <input type="hidden" name="_subject" value="New message from portfolio!" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={window.location.href} />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 text-lg font-medium hover:scale-[1.02] transition-all duration-300"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </motion.form>
    </motion.section>
  );
};

export default MessageForm;
