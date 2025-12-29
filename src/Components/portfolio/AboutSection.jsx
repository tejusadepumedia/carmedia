import { motion } from "framer-motion";
import btsimage from "./photos/DSC05840.webp";


export default function AboutSection() {
  return (
    <section className="bg-[#0f0f0f] py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={btsimage}
                alt="Behind the scenes"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#d4a853]/30 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#d4a853] text-xs uppercase tracking-[0.4em] mb-4">About</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              The Art of <br />
              <span className="italic font-extralight">Automotive Beauty</span>
            </h2>
            
            <div className="space-y-6 text-white/60 text-sm md:text-base leading-relaxed">
              <p>
                Every vehicle tells a story—of engineering brilliance, of design philosophy, 
                of the pure emotion that comes from mechanical perfection. My work captures 
                these narratives through light, shadow, and perspective.
              </p>
              <p>
                From vintage classics to modern hypercars, I find the angles that reveal 
                character, the moments where metal becomes art. Each photograph is a 
                celebration of automotive culture and the passion that drives it.
              </p>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-16 h-[1px] bg-[#d4a853] mt-10 origin-left"
            />

            <div className="mt-10 flex gap-12">
              <div>
                <p className="text-3xl font-light text-white">2.1K<span className="text-[#d4a853]">+</span></p>
                <p className="text-xs uppercase tracking-wider text-white/40 mt-1">Social Engagements</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">10<span className="text-[#d4a853]">+</span></p>
                <p className="text-xs uppercase tracking-wider text-white/40 mt-1">Private Shoots</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
