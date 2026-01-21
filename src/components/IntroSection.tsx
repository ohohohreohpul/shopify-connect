export const IntroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl leading-tight text-foreground mb-6">
            Echte Street-Art für Dein zu Hause.{" "}
            <span className="text-primary">Gestaltet von Dir.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Handgefertigt von unseren Künstlern.
          </p>
        </div>
      </div>
    </section>
  );
};
