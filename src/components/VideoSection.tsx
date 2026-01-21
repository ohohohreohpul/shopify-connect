const VIDEO_URL = "https://cdn.shopify.com/videos/c/o/v/f6553138823543e7a732c900a191f151.mov";

export const VideoSection = () => {
  return (
    <section className="py-12 md:py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl text-background text-center mb-8">
          Urban Artery
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-background/10">
            <video 
              controls
              playsInline
              className="w-full h-full object-cover"
              poster=""
            >
              <source src={VIDEO_URL} type="video/quicktime" />
              <source src={VIDEO_URL} type="video/mp4" />
              Dein Browser unterstützt das Video-Format nicht.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
