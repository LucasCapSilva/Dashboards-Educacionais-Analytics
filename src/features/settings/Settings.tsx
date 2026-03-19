import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { useThemeStore, themePresets } from '../../store/themeStore';
import { Moon, Sun, Monitor, Palette, Building2, Save, Upload, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Settings() {
  const { themeMode, toggleTheme, schoolName, setSchoolName, colors, setThemeColors, logoUrl, setLogoUrl } = useThemeStore();
  
  const [localSchoolName, setLocalSchoolName] = useState(schoolName);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setSchoolName(localSchoolName);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações White-Label</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Personalize a plataforma com a identidade visual da sua instituição.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Identidade */}
        <Card delay={0.1} className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Identidade da Instituição</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome da Instituição
              </label>
              <input
                type="text"
                value={localSchoolName}
                onChange={(e) => setLocalSchoolName(e.target.value)}
                className="w-full max-w-md px-4 py-2 bg-white dark:bg-[#12141a] border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent dark:text-white"
                style={{ '--tw-ring-color': colors[500] } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logotipo
              </label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-[#12141a] overflow-hidden">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
                  ) : (
                    <Building2 className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <label className="cursor-pointer px-4 py-2 bg-white dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2 w-fit">
                    <Upload className="w-4 h-4" />
                    Fazer Upload
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Recomendado: PNG ou SVG transparente, máx 2MB.
                  </p>
                  {logoUrl && (
                    <button 
                      onClick={() => setLogoUrl(null)}
                      className="text-xs text-rose-500 hover:text-rose-600 mt-2 font-medium"
                    >
                      Remover logotipo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Cores */}
        <Card delay={0.2} className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Paleta de Cores</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(themePresets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => setThemeColors(preset)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-3",
                  colors[500] === preset[500] 
                    ? "border-transparent ring-2 ring-offset-2 dark:ring-offset-[#12141a]" 
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                )}
                style={{ '--tw-ring-color': preset[500] } as React.CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{key}</span>
                  {colors[500] === preset[500] && <Check className="w-4 h-4" style={{ color: preset[500] }} />}
                </div>
                <div className="flex h-6 w-full rounded-md overflow-hidden">
                  <div className="flex-1" style={{ backgroundColor: preset[300] }} />
                  <div className="flex-1" style={{ backgroundColor: preset[500] }} />
                  <div className="flex-1" style={{ backgroundColor: preset[700] }} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Tema */}
        <Card delay={0.3} className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Monitor className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aparência</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => themeMode !== 'light' && toggleTheme()}
              className={cn(
                "flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all",
                themeMode === 'light'
                  ? "border-transparent ring-2 ring-offset-2 dark:ring-offset-[#12141a]"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              )}
              style={themeMode === 'light' ? { '--tw-ring-color': colors[500] } as React.CSSProperties : {}}
            >
              <div className="p-3 bg-gray-100 rounded-full">
                <Sun className="w-6 h-6 text-gray-900" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">Claro</span>
            </button>

            <button
              onClick={() => themeMode !== 'dark' && toggleTheme()}
              className={cn(
                "flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all",
                themeMode === 'dark'
                  ? "border-transparent ring-2 ring-offset-2 dark:ring-offset-[#12141a]"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              )}
              style={themeMode === 'dark' ? { '--tw-ring-color': colors[500] } as React.CSSProperties : {}}
            >
              <div className="p-3 bg-[#12141a] rounded-full">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">Escuro</span>
            </button>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 hover:opacity-90"
            style={{ backgroundColor: colors[500] }}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Salvo com sucesso' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}
