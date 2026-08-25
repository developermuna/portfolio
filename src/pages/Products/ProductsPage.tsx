import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Eye } from 'lucide-react';
import { useSupabaseData, type Product } from '../../hooks/useSupabaseData';

const AllProductsPage = () => {
  const { products } = useSupabaseData();
  const [activeCategory, setActiveCategory] = useState('all');

  const dynamicCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return [
      { id: 'all', label: 'All Products' },
      ...uniqueCategories.map(cat => ({ id: cat, label: cat }))
    ];
  }, [products]);

  // Parse URL search params or hash for category parameter and ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check search query (e.g. "?category=app") or hash (e.g. "#all-products?category=app")
    const searchParams = new URLSearchParams(window.location.search);
    let categoryParam = searchParams.get('category');
    
    if (!categoryParam && window.location.hash.includes('?category=')) {
      categoryParam = window.location.hash.split('?category=')[1];
    }
    
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'all' 
      ? products 
      : products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.buyUrl) {
      window.open(product.buyUrl, '_blank');
    } else {
      alert('Buy URL not available for this product.');
    }
  };

  const handleView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.viewUrl) {
      window.open(product.viewUrl, '_blank');
    } else {
      alert('View URL not available for this product.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pb-20 relative z-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-[#D7E2EA]/10 w-full pt-20 sm:pt-24 pb-4 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } }
            }}
          >
            <h1 className="hero-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase leading-none mb-2 overflow-hidden flex">
              {"All Products".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 100, rotate: 10 },
                    show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } }
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="text-[#D7E2EA]/60 max-w-xl text-sm sm:text-base font-light"
            >
              Browse premium digital products, templates, and 3D assets ready for your next project.
            </motion.p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full xl:w-auto mt-4 xl:mt-0">
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden max-w-full">
              {dynamicCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs whitespace-nowrap transition-colors duration-300 flex-shrink-0 ${
                    activeCategory === cat.id 
                      ? 'bg-white text-[#0C0C0C]' 
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <a 
              href="/#services" 
              className="flex items-center justify-center gap-2 text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white px-4 py-2 rounded-full transition-colors group flex-shrink-0 w-max text-xs sm:text-sm"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-wide uppercase">Back</span>
            </a>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1400px] mx-auto mt-8 px-6 sm:px-12 md:px-16 lg:px-24">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col group cursor-pointer"
              >
                {/* Image Container */}
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative mb-6">
                  <div className="absolute inset-0 bg-[#0C0C0C]/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.Price && (
                    <div className="absolute bottom-3 right-3 z-20 font-black text-amber-400 text-lg sm:text-xl drop-shadow-md">
                      ₹{product.Price.toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 px-2 py-0.5 rounded-sm border border-white/10">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold uppercase tracking-wide mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-row gap-3 mt-auto pt-2">
                    <button
                      type="button"
                      onClick={(e) => handleBuyNow(e, product)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-white text-black
                        font-bold uppercase tracking-widest px-3 py-2 text-[10px] sm:text-xs
                        cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:scale-[1.02]"
                    >
                      <ShoppingCart size={14} />
                      Buy Now
                    </button>
                    
                    <button
                      type="button"
                      onClick={(e) => handleView(e, product)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-gray-500 text-gray-300
                        font-bold uppercase tracking-widest px-3 py-2 text-[10px] sm:text-xs
                        cursor-pointer transition-all duration-300
                        hover:bg-white/10 hover:border-white hover:text-white"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllProductsPage;
