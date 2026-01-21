import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const UeberUns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl mb-6">Über Urban Artery</h1>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto">
              Darum gibt es Urban Artery
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8">
                Wir leben in einer Zeit, in der die Regel ist, dass jeder früher oder später haben kann, 
                was er begehrt. Im Bereich der bildenden Kunst ist das schon etwas anders. Es gibt 
                zahlreiche Künstler, bei denen die erste Frage nicht die des Preises ist, sondern wer 
                eines der begehrten Werke überhaupt kaufen darf. In der Urban-Art bzw. Street-Art ist 
                das nochmals zugespitzt.
              </p>
              <p className="text-lg text-muted-foreground">
                Hinzu kommt, dass der Weg zum passenden Kunstobjekt oft ein langwieriger ist. Neben dem 
                eigenen Geschmack machen auch Faktoren wie der dafür vorgesehene Platz, die optische 
                Stimmigkeit im Kontext und natürlich der Wunsch nach Individualität die Suche schwierig: 
                das Kunst-Objekt soll natürlich perfekt in die Räume und zur eigenen Person passen.
              </p>
            </div>
          </div>
        </section>

        {/* Street Art Section */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl text-foreground mb-8">
                Die Streetart-Szene und unsere Intention
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Die allermeisten Künstler dieses Genres arbeiten im Verborgenen. Ihre Künstlernamen 
                sind Pseudonyme und es ist nur wenigen Eingeweihten bekannt, wer sich hinter den 
                Phantomen verbirgt.
              </p>
              <p className="text-lg text-muted-foreground">
                Mit Urban Artery könnt ihr am wohl coolsten Kunsttrend seit Andy Warhols Factory 
                teilhaben und euch, eure Kids, euer Auto oder ein anderes Objekt eurer Wahl als 
                Stencil verewigen lassen.
              </p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl text-foreground text-center mb-12">
              Wir sind die Gründer von Urban Artery
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Daniela */}
              <div className="bg-muted p-6">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil text-primary">
                  Daniela Willers
                </h3>
                <p className="text-muted-foreground text-sm">
                  „Neben meinem Job im Medienbereich begleitet mich das Interesse an Kunst - im 
                  Speziellen Urban Art/Street Art - seit jeher. Nach der Geburt meiner Kinder 
                  nutzte ich die berufliche Auszeit, mich immer mehr der Kunst zu widmen und 
                  merkte schnell, dass die Nachfrage nach kundenindividueller Kunst sehr groß ist."
                </p>
              </div>

              {/* Heiko */}
              <div className="bg-muted p-6">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil text-primary">
                  Heiko Willers
                </h3>
                <p className="text-muted-foreground text-sm">
                  „Am Anfang war es nur eine wilde Idee: Wie bekommt man echte Street Art Unikate 
                  in das Wohnzimmer? Als dann so viele Künstler sofort dabei sein wollten, wurde 
                  es konkreter. Die ersten Bilder wurden produziert und wir bekamen tolles Feedback 
                  unserer Kunden."
                </p>
              </div>

              {/* René */}
              <div className="bg-muted p-6">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 font-stencil text-primary">
                  René S. Spiegelberger
                </h3>
                <p className="text-muted-foreground text-sm">
                  „Eine Künstlerbegegnung hat mich in der Kindheit besonders geprägt: Keith Haring 
                  bemalte mir einst eine Swatch-Uhr. Als Teenager wurde er dann einer meiner Helden 
                  und führte mich zur Kunst. Mit Urban Artery kann nun jeder auch ohne zugige Ecken 
                  und absolutes Insider-Wissen in den Genuss dieser Kunst kommen."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl mb-6">
              Werde Teil von Urban Artery!
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Du bist Urban Art-Künstler und möchtest gerne bei Urban Artery mitmachen? 
              Wir freuen uns! Schreib uns einfach eine Mail an{" "}
              <a href="mailto:artist@urban-artery.de" className="underline hover:no-underline">
                artist@urban-artery.de
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UeberUns;
