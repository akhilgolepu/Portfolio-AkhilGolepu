import { useState, useRef } from 'react';
import SlideButton from '@/components/ui/SlideButton';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import CTAFooter from '@/components/footer/CTAFooter';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    handle: 'akhilgolepu',
    description: 'Open source & project code',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    href: 'https://github.com/akhilgolepu',
    color: '#2563EB',
  },
  {
    label: 'LinkedIn',
    handle: 'Akhil Golepu',
    description: 'Professional network',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: 'https://www.linkedin.com/in/akhil-golepu-6648272b9/',
    color: '#2563EB',
  },
  {
    label: 'Email',
    handle: 'akhilgolepu9@gmail.com',
    description: 'Direct message',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    href: 'mailto:akhilgolepu9@gmail.com',
    color: '#2563EB',
  },
  {
    label: 'Twitter / X',
    handle: '@akhil_golepu',
    description: 'Thoughts & updates',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: 'https://x.com/akhil_golepu',
    color: '#2563EB',
  },
];

export default function Contact() {
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true });
  const rightInView = useInView(rightRef, { once: true });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitState('loading');
    await new Promise(r => setTimeout(r, 1800));
    setSubmitState('success');
    reset();
    setTimeout(() => setSubmitState('idle'), 4000);
  };

  return (
    <main style={{ background: 'var(--surface)', minHeight: '100vh' }}>
      <div style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-layout mx-auto px-8">
          {/* Page header */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: '#2563EB', letterSpacing: '0.1em' }}>
              Contact
            </span>
            <h1 className="font-heading font-black" style={{
              fontSize: 'clamp(40px, 7vw, 88px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--text-primary)',
            }}>
              Get in Touch.
            </h1>
          </motion.div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Social Modules */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -20 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-heading font-bold mb-2" style={{
                fontSize: '18px',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}>
                System Modules
              </h2>
              <p className="font-body mb-8" style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7 }}>
                Connect via any channel. Response time typically within 24 hours.
              </p>

              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 p-5 rounded-2xl no-underline transition-all duration-300 group"
                    style={{
                      border: '1px solid var(--border-line)',
                      background: 'var(--surface-elevated)',
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={leftInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${social.color}40`;
                      e.currentTarget.style.boxShadow = `0 8px 32px ${social.color}12`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-line)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: `${social.color}12`,
                        border: `1px solid ${social.color}20`,
                        color: social.color,
                      }}
                    >
                      {social.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-sm" style={{
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                        marginBottom: '2px',
                      }}>
                        {social.label}
                      </div>
                      <div className="font-mono text-xs truncate" style={{ color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
                        {social.handle}
                      </div>
                      <div className="font-mono text-xs mt-0.5" style={{ color: `${social.color}90`, letterSpacing: '0.04em' }}>
                        {social.description}
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{ color: 'var(--text-muted)', flexShrink: 0, opacity: 0.5 }}>
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 20 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="font-heading font-bold mb-2" style={{
                fontSize: '18px',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}>
                Send a Message
              </h2>
              <p className="font-body mb-8" style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7 }}>
                Have a project in mind? Let's discuss how we can collaborate.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                    <span style={{ color: '#2563EB' }}>user@portfolio</span>:~$ enter_name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Your full name"
                    className="w-full rounded-xl px-5 py-3.5 font-body text-sm transition-all duration-200 outline-none"
                    style={{
                      background: 'var(--surface-elevated)',
                      border: `1px solid ${errors.name ? '#DC2626' : 'var(--border-line)'}`,
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => { if (!errors.name) e.target.style.borderColor = '#2563EB'; }}
                    onBlur={e => { if (!errors.name) e.target.style.borderColor = 'var(--border-line)'; }}
                  />
                  {errors.name && (
                    <p className="font-mono text-xs mt-1.5" style={{ color: '#DC2626' }}>{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                    <span style={{ color: '#2563EB' }}>user@portfolio</span>:~$ enter_email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                    })}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl px-5 py-3.5 font-body text-sm transition-all duration-200 outline-none"
                    style={{
                      background: 'var(--surface-elevated)',
                      border: `1px solid ${errors.email ? '#DC2626' : 'var(--border-line)'}`,
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => { if (!errors.email) e.target.style.borderColor = '#2563EB'; }}
                    onBlur={e => { if (!errors.email) e.target.style.borderColor = 'var(--border-line)'; }}
                  />
                  {errors.email && (
                    <p className="font-mono text-xs mt-1.5" style={{ color: '#DC2626' }}>{errors.email.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                    <span style={{ color: '#2563EB' }}>user@portfolio</span>:~$ enter_message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Minimum 20 characters' } })}
                    placeholder="Tell me about your project, timeline, and goals..."
                    rows={5}
                    className="w-full rounded-xl px-5 py-3.5 font-body text-sm transition-all duration-200 outline-none resize-none"
                    style={{
                      background: 'var(--surface-elevated)',
                      border: `1px solid ${errors.message ? '#DC2626' : 'var(--border-line)'}`,
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => { if (!errors.message) e.target.style.borderColor = '#2563EB'; }}
                    onBlur={e => { if (!errors.message) e.target.style.borderColor = 'var(--border-line)'; }}
                  />
                  {errors.message && (
                    <p className="font-mono text-xs mt-1.5" style={{ color: '#DC2626' }}>{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                {submitState === 'idle' ? (
                  <SlideButton
                    type="submit"
                    className="w-full rounded-xl py-4 font-mono text-xs uppercase font-medium"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    Send Message →
                  </SlideButton>
                ) : (
                  <div
                    className="w-full rounded-xl py-4 font-mono text-xs uppercase font-medium flex items-center justify-center gap-3"
                    style={{
                      background: submitState === 'success' ? '#059669' : '#2563EB',
                      color: '#fff',
                      letterSpacing: '0.08em',
                      border: 'none',
                    }}
                  >
                    {submitState === 'loading' && (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    )}
                    {submitState === 'success' && (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <span>Message Delivered</span>
                      </>
                    )}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <CTAFooter />
    </main>
  );
}