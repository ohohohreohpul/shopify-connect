import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Placeholder images - replace with actual design images later
const designImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

export const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: [null, "-50%"],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    }
  }, [isPaused, controls]);

  // Start animation on mount
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <section className="py-20 md:py-32 bg-foreground overflow-hidden" ref={ref}>
      {/* Infinite scrolling carousel */}
      <div 
        className="mb-12 md:mb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-4"
          animate={controls}
        >
          {/* Double the images for seamless loop */}
          {[...designImages, ...designImages].map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 md:w-64 aspect-[4/3] bg-background/10 overflow-hidden relative cursor-pointer"
            >
              <img
                src={src}
                alt={`Design ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 font-stencil">
            Design Service
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-background mb-6">
            Urban Artery Design Service
          </h2>
          <p className="text-lg md:text-xl text-background/70 mb-10 max-w-2xl mx-auto">
            Du hast eine Vision? Wir machen sie zur Realität. Lass uns gemeinsam dein individuelles Street-Art Kunstwerk erschaffen.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold text-sm tracking-wider h-14 px-8 font-stencil"
          >
            <Link to="/kontakt">
              Kontaktiere uns
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

