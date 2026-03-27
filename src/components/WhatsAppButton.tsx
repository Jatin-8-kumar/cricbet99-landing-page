import { motion } from 'motion/react';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface WhatsAppButtonProps {
  className?: string;
  text?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function WhatsAppButton({ 
  className = "", 
  text = "Get ID via WhatsApp", 
  variant = 'primary',
  size = 'md'
}: WhatsAppButtonProps) {
  
  const variants = {
    primary: "bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]",
    secondary: "bg-gold text-obsidian shadow-[0_0_20px_rgba(246,196,69,0.3)] hover:shadow-[0_0_30px_rgba(246,196,69,0.4)]",
    outline: "glass border-gold/30 text-gold hover:border-gold/60"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-4 text-sm md:text-base",
    lg: "px-10 py-5 text-base md:text-xl",
    xl: "px-12 py-6 text-xl md:text-2xl"
  };

  return (
    <motion.a
      href="https://wa.me/yournumber"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center justify-center gap-3 
        rounded-full font-black uppercase tracking-widest 
        transition-all duration-300 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
    >
      <MessageCircle className={`${size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'} fill-current`} />
      {text}
      <ChevronRight className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6'}`} />
    </motion.a>
  );
}
