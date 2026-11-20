"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
import { Award, ExternalLink } from "lucide-react";

export default function CertificationsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="certifications" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </motion.div>

        {certifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-12 rounded-3xl bg-card border border-border/50 text-center shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12 hover:rotate-0 transition-transform duration-500">
                <Award size={40} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Certifications will be updated soon.</h3>
              <p className="text-muted-foreground">
                I am currently pursuing several professional certifications to validate my skills and knowledge. Stay tuned!
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted rounded-full"
                      aria-label="View Credential"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cert.name}</h3>
                <p className="text-muted-foreground font-medium mb-1">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground mb-4">{cert.date}</p>
                
                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-border/50">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-muted-foreground">Verified Credential</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
