// Este serviço coleta uma variedade de informações do navegador e do dispositivo
// para fins de rastreamento e análise.

const WEBHOOK_URL = "https://frostxkzzz.app.n8n.cloud/webhook/79c10978-cbc4-47cb-b6d7-df0a6eec68e4";
let hasSentEvent = false;

// Função para gerar um fingerprint de canvas
const getCanvasFingerprint = (): string => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'canvas-not-supported';
    
    const txt = 'HubDoXK-Fingerprint-!@#$';
    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(txt, 4, 17);

    return canvas.toDataURL();
  } catch (e) {
    return 'canvas-error';
  }
};

// Função para obter informações do WebGL
const getWebGLFingerprint = (): { vendor: string, renderer: string } => {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl || !(gl instanceof WebGLRenderingContext)) {
             return { vendor: 'N/A', renderer: 'N/A' };
        }
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            return {
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
            };
        }
        return { vendor: 'N/A', renderer: 'N/A' };
    } catch (e) {
         return { vendor: 'error', renderer: 'error' };
    }
};

// Função para obter uma lista de fontes instaladas
const getFontsFingerprint = (): string => {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = "abcdefghijklmnopqrstuvwxyz0123456789";
    const testSize = '72px';
    
    const h = document.getElementsByTagName("body")[0];
    const baseFontsDiv = document.createElement("div");
    const fontsDiv = document.createElement("div");
    
    const defaultWidth: { [key: string]: number } = {};
    const defaultHeight: { [key: string]: number } = {};

    baseFonts.forEach(font => {
        const s = document.createElement("span");
        s.style.fontSize = testSize;
        s.style.fontFamily = font;
        s.innerHTML = testString;
        baseFontsDiv.appendChild(s);
        defaultWidth[font] = s.offsetWidth;
        defaultHeight[font] = s.offsetHeight;
    });
    
    h.appendChild(baseFontsDiv);

    const fontList = [
        'Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 
        'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 
        'Impact', 'Calibri', 'Candara', 'Segoe UI', 'Roboto', 'Lato', 'Open Sans'
    ];
    
    const availableFonts = fontList.filter(font => {
        let detected = false;
        baseFonts.forEach(baseFont => {
            const s = document.createElement("span");
            s.style.fontSize = testSize;
            s.style.fontFamily = `${font},${baseFont}`;
            s.innerHTML = testString;
            fontsDiv.appendChild(s);
            if (s.offsetWidth !== defaultWidth[baseFont] || s.offsetHeight !== defaultHeight[baseFont]) {
                detected = true;
            }
        });
        return detected;
    });

    h.removeChild(baseFontsDiv);
    return availableFonts.join(',');
};


// Coleta de informações de hardware
const getHardwareInfo = (): { cores: number | 'N/A', memory: number | 'N/A' } => {
    try {
      const cores = navigator.hardwareConcurrency || 'N/A';
      // @ts-ignore
      const memory = navigator.deviceMemory || 'N/A';
      return { cores, memory };
    } catch (e) {
      return { cores: 'N/A', memory: 'N/A' };
    }
};

// Coleta de informações de rede
const getNetworkInfo = (): { type: string, effectiveType: string, downlink: number, rtt: number } | 'N/A' => {
  try {
    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      return {
        type: connection.type || 'N/A',
        effectiveType: connection.effectiveType || 'N/A',
        downlink: connection.downlink || -1,
        rtt: connection.rtt || -1,
      };
    }
    return 'N/A';
  } catch (e) {
    return 'N/A';
  }
};


// Coleta de informações da bateria
const getBatteryInfo = async (): Promise<{ level: number, charging: boolean } | 'N/A'> => {
  try {
    // @ts-ignore
    const battery = await navigator.getBattery();
    if (battery) {
      return {
        level: battery.level,
        charging: battery.charging,
      };
    }
    return 'N/A';
  } catch (e) {
    return 'N/A';
  }
};

// Coleta de informações de plugins
const getPluginsInfo = (): string => {
  try {
    return Array.from(navigator.plugins).map(p => p.name).join(', ');
  } catch (e) {
    return 'N/A';
  }
};


export const trackEvent = async (eventName: string, payload: object) => {
    if (hasSentEvent) {
        console.log("Evento de rastreamento já enviado nesta sessão.");
        return;
    }
    
    try {
        const batteryInfo = await getBatteryInfo();

        const visitorData = {
            event: eventName,
            payload,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            language: navigator.language,
            cookiesEnabled: navigator.cookieEnabled,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth,
            },
            browser: {
                platform: navigator.platform,
                vendor: navigator.vendor,
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            fingerprints: {
                canvas: getCanvasFingerprint(),
                webgl: getWebGLFingerprint(),
                fonts: getFontsFingerprint(),
            },
            hardware: getHardwareInfo(),
            network: getNetworkInfo(),
            battery: batteryInfo,
            plugins: getPluginsInfo(),
        };

        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Use no-cors para contornar problemas de CORS com webhooks
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorData),
        });

        hasSentEvent = true;
        console.log("Dados de login enviados para o webhook.");

    } catch (error) {
        console.error("Erro ao enviar dados para o webhook:", error);
    }
};
