import { Phone, Mail, Copyright } from 'lucide-react';
import Logo from '@/components/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <a href="#hero" className="flex items-center gap-3 mb-4">
              <Logo />
              <span className="font-bold text-xl font-headline">Delvare</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              Crafting high-quality software solutions to drive your business forward.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:delvaresoftwares@gmail.com" className="hover:text-primary transition-colors">delvaresoftwares@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:8606281125" className="hover:text-primary transition-colors">8606281125</a>
              </li>
            </ul>
          </div>
           <div className="flex flex-col items-center md:items-start">
             <h3 className="font-headline text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="flex items-center gap-2">
              <Copyright className="w-4 h-4" /> {currentYear} Delvare Software Solutions. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
