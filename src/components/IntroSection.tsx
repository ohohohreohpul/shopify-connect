import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Echte Street-Art für Dein zu Hause. Gestaltet von Dir.",
  "Handgefertigt von unseren Künstlern."
];

export const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      filter: "blur(12px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {lines.map((line, index) => (
            <motion.h2
              key={index}
              variants={lineVariants}
              className={`text-xl md:text-3xl lg:text-4xl leading-snug text-foreground ${index === 0 ? 'lg:whitespace-nowrap' : 'md:whitespace-nowrap'}`}
            >
              {line}
            </motion.h2>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

