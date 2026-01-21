import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-foreground" ref={ref}>
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

