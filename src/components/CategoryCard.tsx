import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CategoryCardProps {
  title: string;
  icon: ReactNode;
  image: string;
  className?: string;
}

export default function CategoryCard({ title, icon, image, className }: CategoryCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    // Set CSS variables for radial gradient
    e.currentTarget.style.setProperty("--mouse-x", `${mouseX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative h-96 w-full rounded-2xl glass-gold group cursor-pointer overflow-hidden",
        className
      )}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
      
      <div 
        style={{ transform: "translateZ(75px)" }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="mb-4 text-gold transition-transform duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_15px_rgba(246,196,69,0.8)]">
          {icon}
        </div>
        <h3 className="font-outfit text-3xl font-extrabold italic text-white uppercase tracking-tighter">
          {title}
        </h3>
        <div className="mt-4 h-1 w-12 bg-gold transition-all duration-500 group-hover:w-24" />
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(246,196,69,0.15),transparent_80%)]" />
      </div>
    </motion.div>
  );
}
