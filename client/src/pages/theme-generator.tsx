import { motion } from 'framer-motion';
import { ColorThemeGenerator } from '@/components/ui/color-theme-generator';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette } from 'lucide-react';
import { Link } from 'wouter';

interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primaryBrown: string;
    accentNude: string;
    secondaryDark: string;
    background: string;
    surface: string;
  };
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function ThemeGeneratorPage() {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = (theme: ColorTheme) => {
    setTheme(theme);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--surface))]">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-[hsl(var(--primary-brown))]" />
              <span className="font-semibold text-[hsl(var(--secondary-dark))]">
                Theme Generator
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ColorThemeGenerator 
            onThemeChange={handleThemeChange}
            currentThemeId={currentTheme.id}
          />
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-[hsl(var(--secondary-dark))] mb-6 text-center">
            Live Preview
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-[hsl(var(--surface))] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-[hsl(var(--secondary-dark))] mb-3">
                  Sample Content
                </h4>
                <p className="text-gray-600 mb-4">
                  This is how your website content will look with the selected theme. 
                  The colors automatically adapt to create a cohesive design.
                </p>
                <Button className="bg-[hsl(var(--primary-brown))] text-white hover:bg-[hsl(var(--primary-brown))]/90">
                  Sample Button
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[hsl(var(--accent-nude))] rounded-lg p-6">
                <h4 className="text-lg font-semibold text-[hsl(var(--secondary-dark))] mb-3">
                  Theme Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {currentTheme.name}
                  </div>
                  <div>
                    <span className="font-medium">Description:</span> {currentTheme.description}
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-medium">Color Palette:</span>
                    <div className="flex gap-2">
                      <div 
                        className="w-6 h-6 rounded border-2 border-white shadow"
                        style={{ backgroundColor: currentTheme.preview.primary }}
                        title="Primary"
                      />
                      <div 
                        className="w-6 h-6 rounded border-2 border-white shadow"
                        style={{ backgroundColor: currentTheme.preview.secondary }}
                        title="Secondary"
                      />
                      <div 
                        className="w-6 h-6 rounded border-2 border-white shadow"
                        style={{ backgroundColor: currentTheme.preview.accent }}
                        title="Accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/">
              <Button className="bg-[hsl(var(--primary-brown))] text-white hover:bg-[hsl(var(--primary-brown))]/90">
                Apply & Return to Website
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}