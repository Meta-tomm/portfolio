import { useEffect, useState } from "react";
import { useTheme } from "../../context/themecontext";
import { useScrollAnimation } from "../../hooks/UseScrollAnimation";
import { Quote, Sparkles, Image as ImageIcon, Bitcoin, Rocket, TrendingUp } from "lucide-react";

// Interesting data from public APIs
interface QuoteData {
  content: string;
  author: string;
}

interface NasaData {
  title: string;
  url: string;
  explanation: string;
  date: string;
}

interface CryptoData {
  bitcoin: { usd: number; usd_24h_change: number };
  ethereum: { usd: number; usd_24h_change: number };
}

interface RandomFact {
  text: string;
}

// Fun Data Dashboard - Display interesting real-time data from public APIs
export default function Analytics() {
  const [ref, isVisible] = useScrollAnimation();
  const { isDark } = useTheme();

  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [nasa, setNasa] = useState<NasaData | null>(null);
  const [crypto, setCrypto] = useState<CryptoData | null>(null);
  const [fact, setFact] = useState<RandomFact | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      // Fetch quote - using ZenQuotes API (more reliable)
      try {
        const quoteRes = await fetch('https://zenquotes.io/api/random');
        const quoteArr = await quoteRes.json();
        if (quoteArr && quoteArr[0]) {
          setQuote({ content: quoteArr[0].q, author: quoteArr[0].a });
        }
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        // Fallback quote
        setQuote({
          content: "The only way to do great work is to love what you do.",
          author: "Steve Jobs"
        });
      }

      // Fetch NASA - using fallback data if fails
      try {
        const nasaRes = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        if (nasaRes.ok) {
          const nasaData = await nasaRes.json();
          setNasa(nasaData);
        }
      } catch (error) {
        console.error('Failed to fetch NASA data:', error);
      }

      // Fetch crypto prices
      try {
        const cryptoRes = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
        );
        const cryptoData = await cryptoRes.json();
        setCrypto(cryptoData);
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
      }

      // Fetch random fact - using API Ninjas
      try {
        const factRes = await fetch('https://api.api-ninjas.com/v1/facts', {
          headers: { 'X-Api-Key': 'DEMO' }
        });
        const factArr = await factRes.json();
        if (factArr && factArr[0]) {
          setFact({ text: factArr[0].fact });
        }
      } catch (error) {
        console.error('Failed to fetch fact:', error);
        // Fallback fact
        setFact({
          text: "The world's oldest known living tree is over 5,000 years old and is located in California."
        });
      }

      setLoading(false);
    };

    fetchAllData();
  }, []);

  // LOADING STATE
  if (loading) {
    return (
      <section
        id="analytics"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden py-20 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? "bg-blue-500" : "bg-blue-300"}`} style={{ top: "20%", left: "-10%" }} />
          <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? "bg-purple-500" : "bg-purple-300"}`} style={{ bottom: "20%", right: "-10%" }} />
        </div>

        <div className={`relative z-10 p-12 rounded-3xl max-w-md mx-6 text-center backdrop-blur-sm border shadow-2xl ${isDark ? "bg-white/5 border-white/10" : "bg-white shadow-lg border-gray-100"}`}>
          <div className={`w-20 h-20 border-8 rounded-full animate-spin mx-auto mb-8 ${isDark ? "border-gray-700 border-t-blue-500" : "border-gray-200 border-t-blue-600"}`} />
          <h2 className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Chargement des données...
          </h2>
          <p className={`text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Récupération depuis les APIs publiques
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="analytics"
      ref={ref}
      className={`relative min-h-screen py-20 transition-all duration-1000 overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? "bg-blue-500" : "bg-blue-300"}`} style={{ top: "10%", right: "10%" }} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? "bg-purple-500" : "bg-purple-300"}`} style={{ bottom: "10%", left: "10%" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
          }`}>
            Données Insolites
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4" />
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Informations en temps réel depuis des APIs publiques
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Quote of the Day */}
          {quote && (
            <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
              isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
            }`}>
              <div className="flex items-start gap-4">
                <Quote className={`w-8 h-8 flex-shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Citation du Jour
                  </h3>
                  <p className={`text-lg italic mb-4 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    "{quote.content}"
                  </p>
                  <p className={`text-sm font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                    — {quote.author}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Random Fact */}
          {fact && (
            <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
              isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
            }`}>
              <div className="flex items-start gap-4">
                <Sparkles className={`w-8 h-8 flex-shrink-0 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Le Saviez-vous ?
                  </h3>
                  <p className={`text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {fact.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Crypto Prices */}
          {crypto && (
            <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
              isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
            }`}>
              <div className="flex items-start gap-4 mb-6">
                <Bitcoin className={`w-8 h-8 flex-shrink-0 ${isDark ? "text-yellow-400" : "text-yellow-600"}`} />
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  Crypto en Direct
                </h3>
              </div>

              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Bitcoin</span>
                    <span className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      ${crypto.bitcoin.usd.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${crypto.bitcoin.usd_24h_change >= 0 ? "text-green-500" : "text-red-500"}`} />
                    <span className={`text-sm font-semibold ${crypto.bitcoin.usd_24h_change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {crypto.bitcoin.usd_24h_change >= 0 ? "+" : ""}{crypto.bitcoin.usd_24h_change.toFixed(2)}% (24h)
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Ethereum</span>
                    <span className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      ${crypto.ethereum.usd.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${crypto.ethereum.usd_24h_change >= 0 ? "text-green-500" : "text-red-500"}`} />
                    <span className={`text-sm font-semibold ${crypto.ethereum.usd_24h_change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {crypto.ethereum.usd_24h_change >= 0 ? "+" : ""}{crypto.ethereum.usd_24h_change.toFixed(2)}% (24h)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NASA Picture of the Day */}
          {nasa && (
            <div className={`p-8 rounded-2xl backdrop-blur-sm border transition-all hover:shadow-2xl ${
              isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white shadow-lg border-gray-100 hover:shadow-xl"
            }`}>
              <div className="flex items-start gap-4 mb-4">
                <Rocket className={`w-8 h-8 flex-shrink-0 ${isDark ? "text-pink-400" : "text-pink-600"}`} />
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  NASA - Photo du Jour
                </h3>
              </div>

              {nasa.url && nasa.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img
                  src={nasa.url}
                  alt={nasa.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              ) : (
                <div className={`w-full h-48 rounded-xl mb-4 flex items-center justify-center ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                  <ImageIcon className={`w-12 h-12 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                </div>
              )}

              <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {nasa.title}
              </h4>
              <p className={`text-sm line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {nasa.explanation}
              </p>
              <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                {nasa.date}
              </p>
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className={`p-6 rounded-xl border-l-4 text-center ${isDark ? "bg-blue-500/10 border-blue-500" : "bg-blue-50 border-blue-500"}`}>
          <p className={`text-sm ${isDark ? "text-blue-300" : "text-blue-900"}`}>
            <strong>Données en temps réel</strong> provenant d'APIs publiques : Quotable, NASA, CoinGecko et Useless Facts
          </p>
        </div>
      </div>
    </section>
  );
}
