'use client';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { profile } from '@/data/portfolio-data';
import SectionHeading from '@/components/common/SectionHeading';
import MagneticElement from '@/components/cursor/MagneticElement';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Message received! I'll get back to you soon.");
    console.log('Form submitted:', values);
    form.reset();
  }

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: '#22D3EE',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Ved1030',
      href: profile.github,
      color: '#60A5FA',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ved140609',
      href: profile.linkedin,
      color: '#4FD1C5',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
      href: '#',
      color: '#94A3B8',
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden section-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Connect"
          title="Let's"
          highlight="Collaborate"
          description="Ready to bring intelligent systems to life. Let's build something amazing together."
        />

        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            {contactLinks.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card flex items-center gap-3 rounded-xl p-3 sm:gap-4 sm:p-4"
                data-cursor="button"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110 sm:h-12 sm:w-12"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/30 sm:text-xs">
                    {item.label}
                  </span>
                  <p className="truncate text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <div className="pt-2 sm:pt-4">
              <MagneticElement strength={0.15}>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-cyan hover:bg-cyan-hover text-navy font-semibold px-6 py-5 gap-2 transition-all hover:shadow-glow-cyan-lg sm:px-8 sm:py-6"
                  data-cursor="button"
                >
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="h-5 w-5" />
                    Say Hello
                  </a>
                </Button>
              </MagneticElement>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-5 sm:rounded-3xl sm:p-8">
              <div className="mb-4 flex items-center gap-2 sm:mb-6">
                <Sparkles className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
                <span className="font-heading text-base font-bold text-white sm:text-lg">
                  Send a Message
                </span>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 sm:space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/60">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-cyan/50 focus:ring-cyan/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/60">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            className="border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-cyan/50 focus:ring-cyan/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/60">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            {...field}
                            className="min-h-[120px] border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-cyan/50 focus:ring-cyan/20 resize-none sm:min-h-[140px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <MagneticElement strength={0.15} className="w-full">
                    <Button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-cyan to-teal py-5 text-sm font-bold text-navy transition-all hover:shadow-glow-cyan-lg sm:py-6 sm:text-base"
                      data-cursor="button"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </MagneticElement>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
