import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const lines = [
  "Echte Street-Art für Dein zu Hause.",
  "Gestaltet von Dir.",
  "Handgefertigt von unseren Künstlern."
];

export const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {lines.map((line, index) => (
            <motion.h2
              key={index}
              variants={lineVariants}
              className="text-2xl md:text-4xl lg:text-5xl leading-tight text-foreground"
            >
              {line}
            </motion.h2>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
