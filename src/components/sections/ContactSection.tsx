import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, Linkedin, Mail, Send, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const socialLinks = [
  { name: 'GitHub', icon: <Github className="w-6 h-6" />, href: 'https://github.com', color: 'hover:text-foreground' },
  { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" />, href: 'https://linkedin.com', color: 'hover:text-blue-400' },
  { name: 'Email', icon: <Mail className="w-6 h-6" />, href: 'mailto:vjain5375@gmail.com', color: 'hover:text-primary' },
];

const FloatingSocialIcon = ({ link, index }: { link: typeof socialLinks[0]; index: number }) => {
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      className={`group relative flex items-center justify-center w-16 h-16 glass rounded-2xl border border-border/50 text-muted-foreground transition-all duration-300 ${link.color} hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20`}
    >
      {link.icon}
      <span className="absolute -bottom-8 text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        {link.name}
      </span>
    </motion.a>
  );
};

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-accent border border-accent/30 rounded-full">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Let's </span>
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Interested in collaborating or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Social links */}
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Find Me Online
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <FloatingSocialIcon key={link.name} link={link} index={index} />
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center justify-center w-12 h-12 glass rounded-xl border border-border/50">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/70">Location</p>
                  <p className="text-foreground">Bathinda, Punjab</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center justify-center w-12 h-12 glass rounded-xl border border-border/50">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/70">Email</p>
                  <p className="text-foreground">vjain5375@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center justify-center w-12 h-12 glass rounded-xl border border-border/50">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/70">Phone</p>
                  <p className="text-foreground">+91 6280436730</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-border/50">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 font-display font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-lg btn-glow transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
