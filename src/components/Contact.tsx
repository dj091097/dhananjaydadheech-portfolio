import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RectangleEllipsis, Phone, MapPin, Linkedin, SendIcon, Github, Twitter, Bookmark } from 'lucide-react';
import resumeData from '@/data/resume';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Message sent successfully!',
        description: 'Thank you for your message. I will get back to you soon.',
        variant: 'default',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error sending message',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  const contactItems = [
    { icon: <RectangleEllipsis />, title: 'Email', content: resumeData.email },
    { icon: <Phone />, title: 'Phone', content: resumeData.phone },
    { icon: <MapPin />, title: 'Location', content: resumeData.location },
    { 
      icon: <Linkedin />, 
      title: 'LinkedIn', 
      content: <a 
        href={resumeData.linkedin} 
        target="_blank" 
        className="text-white opacity-90 hover:opacity-100 hover:underline"
      >
        linkedin.com/in/dhananjay-dadheech-850439150
      </a> 
    }
  ];

  const socialLinks = [
    { icon: <Linkedin />, url: resumeData.linkedin },
    { icon: <Github />, url: '#' },
    { icon: <Twitter />, url: '#' },
    { icon: <Bookmark />, url: '#' }
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="section-header mb-12 text-center">
          <h2 className="text-3xl font-heading font-bold mb-2">Get In Touch</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 max-w-xl mx-auto">Let's discuss how my analytics expertise can benefit your organization. Feel free to reach out!</p>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white text-primary rounded-lg p-6 shadow-lg">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your Message" rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-accent hover:bg-opacity-90 text-white font-bold w-full"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? 'Sending...' : (
                    <>Send Message <SendIcon className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="lg:w-1/2 lg:pl-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-heading font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="contact-icon bg-accent rounded-full p-3 mr-4">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'text-white' })}
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-1">{item.title}</h4>
                      {typeof item.content === 'string' ? (
                        <p className="opacity-90">{item.content}</p>
                      ) : item.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-heading font-semibold mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" className="social-icon bg-white text-primary hover:text-accent w-10 h-10 rounded-full flex items-center justify-center transition">
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
