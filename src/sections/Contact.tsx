import { useEffect, useRef, useState } from 'react';
import { contactConfig } from '../config';
import { Send, Github, Linkedin, Facebook, Instagram, MapPin, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          section.querySelectorAll('.animate-in'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(titleTrigger);

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative z-[2] w-full py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 circuit-pattern opacity-10" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 font-japanese text-[7rem] text-[#facc15]/5 leading-none select-none">
        連絡
      </div>
      <div className="absolute bottom-20 right-10 font-japanese text-[5rem] text-[#facc15]/5 leading-none select-none">
        コンタクト
      </div>

      <div className="relative z-10 w-full px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Section Header */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 animate-in">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />
            <span className="section-label">{contactConfig.sectionLabel}</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />
          </div>
          
          <div className="flex items-center justify-center gap-4 animate-in">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white">
              {contactConfig.sectionTitle}
            </h2>
            <span className="font-japanese text-2xl xl:text-3xl text-[#facc15]/40">
              {contactConfig.kanjiAccent}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="animate-in">
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h3 className="font-display text-2xl text-white mb-6">
                Let's Work Together
              </h3>
              <p className="text-white/60 mb-8">
                Have a project in mind or want to collaborate? Feel free to reach out. 
                I'm always open to discussing new opportunities and interesting ideas.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#facc15]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#facc15]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white/40 text-sm">Email</div>
                    <div className="text-white break-all">{contactConfig.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#facc15]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#facc15]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white/40 text-sm">Location</div>
                    <div className="text-white flex items-center gap-2 flex-wrap">
                      {contactConfig.location}
                      <span className="font-japanese text-[#facc15]/50 text-sm">
                        {contactConfig.locationKanji}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <div className="text-white/40 text-sm mb-4">Follow Me</div>
                <div className="flex gap-3">
                  {contactConfig.socialLinks.map((link) => {
                    const Icon = socialIcons[link.platform as keyof typeof socialIcons];
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white/60 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
                        aria-label={link.label}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 bg-[#facc15] rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-[#facc15] rounded-full animate-ping" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-medium">Available for Work</div>
                <div className="text-white/40 text-sm">Open to freelance & full-time opportunities</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-in">
            <form onSubmit={handleSubmit} className="glass-form rounded-2xl p-8">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-[#facc15]/10 border border-[#facc15]/30 rounded-lg flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#facc15]" />
                  <span className="text-[#facc15]">{contactConfig.successMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-400" />
                  <span className="text-red-400">Something went wrong. Please try again.</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {contactConfig.formFields.name.label}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={contactConfig.formFields.name.placeholder}
                    required={contactConfig.formFields.name.required}
                    className="form-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {contactConfig.formFields.email.label}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={contactConfig.formFields.email.placeholder}
                    required={contactConfig.formFields.email.required}
                    className="form-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {contactConfig.formFields.subject.label}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={contactConfig.formFields.subject.placeholder}
                    required={contactConfig.formFields.subject.required}
                    className="form-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {contactConfig.formFields.message.label}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={contactConfig.formFields.message.placeholder}
                    required={contactConfig.formFields.message.required}
                    rows={5}
                    className="form-input w-full px-4 py-3 rounded-lg resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 rounded-lg font-display tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed interactive"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {contactConfig.submitButton}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
