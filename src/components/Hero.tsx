const HERO_VIDEO_URL = "https://cdn.shopify.com/videos/c/o/v/f6553138823543e7a732c900a191f151.mov";
export const Hero = () => {
  return <section className="relative bg-foreground overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={HERO_VIDEO_URL} type="video/quicktime" />
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-foreground/50" />
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl">
          {/* Main headline only */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-background font-stencil uppercase">
            Dein Street-Art Unikat.
          </h1>
        </div>
      </div>
    </section>;
};