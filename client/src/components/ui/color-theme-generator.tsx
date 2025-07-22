import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Check, RefreshCw } from 'lucide-react';

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

const predefinedThemes: ColorTheme[] = [
  {
    id: 'warm-nude',
    name: 'Warm Nude (Default)',
    description: 'Modern and inviting with warm earth tones',
    colors: {
      primaryBrown: '28 25% 23%',
      accentNude: '30 30% 85%',
      secondaryDark: '20 14.3% 4.1%',
      background: '0 0% 100%',
      surface: '30 20% 95%'
    },
    preview: {
      primary: 'hsl(28, 25%, 23%)',
      secondary: 'hsl(30, 30%, 85%)',
      accent: 'hsl(20, 14.3%, 4.1%)'
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Calming blues with sandy neutrals',
    colors: {
      primaryBrown: '200 35% 25%',
      accentNude: '200 20% 85%',
      secondaryDark: '210 40% 15%',
      background: '0 0% 100%',
      surface: '200 15% 95%'
    },
    preview: {
      primary: 'hsl(200, 35%, 25%)',
      secondary: 'hsl(200, 20%, 85%)',
      accent: 'hsl(210, 40%, 15%)'
    }
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural greens with earthy undertones',
    colors: {
      primaryBrown: '140 35% 25%',
      accentNude: '120 15% 85%',
      secondaryDark: '160 40% 15%',
      background: '0 0% 100%',
      surface: '120 10% 95%'
    },
    preview: {
      primary: 'hsl(140, 35%, 25%)',
      secondary: 'hsl(120, 15%, 85%)',
      accent: 'hsl(160, 40%, 15%)'
    }
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Vibrant oranges with warm highlights',
    colors: {
      primaryBrown: '25 45% 35%',
      accentNude: '35 25% 85%',
      secondaryDark: '15 35% 20%',
      background: '0 0% 100%',
      surface: '30 15% 95%'
    },
    preview: {
      primary: 'hsl(25, 45%, 35%)',
      secondary: 'hsl(35, 25%, 85%)',
      accent: 'hsl(15, 35%, 20%)'
    }
  },
  {
    id: 'purple-luxury',
    name: 'Purple Luxury',
    description: 'Sophisticated purples with elegant grays',
    colors: {
      primaryBrown: '280 35% 30%',
      accentNude: '290 15% 85%',
      secondaryDark: '270 40% 20%',
      background: '0 0% 100%',
      surface: '285 10% 95%'
    },
    preview: {
      primary: 'hsl(280, 35%, 30%)',
      secondary: 'hsl(290, 15%, 85%)',
      accent: 'hsl(270, 40%, 20%)'
    }
  },
  {
    id: 'minimalist-gray',
    name: 'Minimalist Gray',
    description: 'Clean monochromatic with subtle warmth',
    colors: {
      primaryBrown: '0 0% 25%',
      accentNude: '0 0% 85%',
      secondaryDark: '0 0% 15%',
      background: '0 0% 100%',
      surface: '0 0% 95%'
    },
    preview: {
      primary: 'hsl(0, 0%, 25%)',
      secondary: 'hsl(0, 0%, 85%)',
      accent: 'hsl(0, 0%, 15%)'
    }
  }
];

interface ColorThemeGeneratorProps {
  onThemeChange: (theme: ColorTheme) => void;
  currentThemeId: string;
}

export function ColorThemeGenerator({ onThemeChange, currentThemeId }: ColorThemeGeneratorProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>(currentThemeId);
  const [isApplying, setIsApplying] = useState(false);

  const handleThemeSelect = async (theme: ColorTheme) => {
    setIsApplying(true);
    setSelectedTheme(theme.id);
    
    // Add a slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onThemeChange(theme);
    setIsApplying(false);
  };

  const generateRandomTheme = () => {
    const randomHue1 = Math.floor(Math.random() * 360);
    const randomHue2 = (randomHue1 + 30) % 360;
    const randomHue3 = (randomHue1 - 30 + 360) % 360;

    const randomTheme: ColorTheme = {
      id: `random-${Date.now()}`,
      name: 'Custom Random',
      description: 'Randomly generated color scheme',
      colors: {
        primaryBrown: `${randomHue1} 35% 25%`,
        accentNude: `${randomHue2} 20% 85%`,
        secondaryDark: `${randomHue3} 40% 15%`,
        background: '0 0% 100%',
        surface: `${randomHue2} 10% 95%`
      },
      preview: {
        primary: `hsl(${randomHue1}, 35%, 25%)`,
        secondary: `hsl(${randomHue2}, 20%, 85%)`,
        accent: `hsl(${randomHue3}, 40%, 15%)`
      }
    };

    handleThemeSelect(randomTheme);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Palette className="h-6 w-6 text-[hsl(var(--primary-brown))]" />
          <h2 className="text-2xl font-bold text-[hsl(var(--secondary-dark))]">
            Color Theme Generator
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our curated color themes or generate a random one to personalize your website's look and feel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {predefinedThemes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTheme === theme.id 
                  ? 'ring-2 ring-[hsl(var(--primary-brown))] bg-[hsl(var(--accent-nude))]/20' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleThemeSelect(theme)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  {selectedTheme === theme.id && (
                    <Badge variant="secondary" className="bg-[hsl(var(--primary-brown))] text-white">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm">
                  {theme.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-3">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: theme.preview.primary }}
                    title="Primary Color"
                  />
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: theme.preview.secondary }}
                    title="Secondary Color"
                  />
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: theme.preview.accent }}
                    title="Accent Color"
                  />
                </div>
                {selectedTheme === theme.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-[hsl(var(--primary-brown))] font-medium"
                  >
                    Currently Applied
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={generateRandomTheme}
          disabled={isApplying}
          className="bg-gradient-to-r from-[hsl(var(--primary-brown))] to-[hsl(var(--primary-brown))]/80 text-white hover:from-[hsl(var(--primary-brown))]/90 hover:to-[hsl(var(--primary-brown))]/70"
        >
          {isApplying ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Generate Random Theme
        </Button>
      </div>

      {isApplying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 animate-spin text-[hsl(var(--primary-brown))]" />
              <span className="text-[hsl(var(--secondary-dark))] font-medium">
                Applying theme...
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}