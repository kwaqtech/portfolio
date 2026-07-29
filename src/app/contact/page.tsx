"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col p-8 md:p-12 lg:p-16 max-w-[900px] mx-auto w-full gap-12">
      <div className="flex flex-col gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold tracking-tight text-white flex items-center gap-3"
        >
          <Mail className="w-8 h-8" />
          Contact
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[var(--color-muted-foreground)] text-lg max-w-2xl"
        >
          Interested in working together or have a question? I'm always open to discussing engineering challenges and new opportunities.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-xl font-medium text-white mb-2">Connect with me</h2>
          
          <a href="mailto:caomq12062004@gmail.com" className="group flex flex-col p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)] transition-colors hover:bg-[var(--color-panel-hover)]">
            <div className="flex items-center gap-3 mb-1">
              <Mail className="w-5 h-5 text-white" />
              <span className="font-medium text-white">Email</span>
            </div>
            <span className="text-sm font-mono text-[var(--color-muted-foreground)] group-hover:text-white transition-colors">
              caomq12062004@gmail.com
            </span>
          </a>

          <a href="https://github.com/kwaqtech" target="_blank" rel="noreferrer" className="group flex flex-col p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)] transition-colors hover:bg-[var(--color-panel-hover)]">
            <div className="flex items-center gap-3 mb-1">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-white"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.09 1.84 1.22 1.84 1.22 1.07 1.83 2.8 1.3 3.48 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.37 1.24-3.2-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.22a11.53 11.53 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.25 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.56-2.8 5.56-5.48 5.86.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" /></svg>
              <span className="font-medium text-white">GitHub</span>
            </div>
            <span className="text-sm font-mono text-[var(--color-muted-foreground)] group-hover:text-white transition-colors">
              github.com/kwaqtech
            </span>
          </a>

          <a href="https://www.linkedin.com/in/minh-quang-cao-37b223333/" target="_blank" rel="noreferrer" className="group flex flex-col p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-panel-border)] transition-colors hover:bg-[var(--color-panel-hover)]">
            <div className="flex items-center gap-3 mb-1">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-white"><path d="M5.03 3.5A1.53 1.53 0 1 1 5 6.56a1.53 1.53 0 0 1 .03-3.06ZM3.7 8h2.63v12H3.7V8Zm6.14 0h2.52v1.64h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4v7.72h-2.63v-6.84c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.63V20H9.84V8Z" /></svg>
              <span className="font-medium text-white">LinkedIn</span>
            </div>
            <span className="text-sm font-mono text-[var(--color-muted-foreground)] group-hover:text-white transition-colors">
              linkedin.com/in/minh-quang-cao-37b223333/
            </span>
          </a>
        </motion.div>

        {/* Form (Visual only for portfolio) */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col gap-4 p-6 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-panel-border)]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-muted-foreground)]">Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-2 bg-black/40 border border-[var(--color-panel-border)] rounded-md text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-muted-foreground)]">Email</label>
            <input type="email" placeholder="john@example.com" className="w-full px-4 py-2 bg-black/40 border border-[var(--color-panel-border)] rounded-md text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-muted-foreground)]">Message</label>
            <textarea placeholder="How can I help you?" rows={4} className="w-full px-4 py-2 bg-black/40 border border-[var(--color-panel-border)] rounded-md text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors resize-none" />
          </div>
          
          <button type="submit" className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors">
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
}
