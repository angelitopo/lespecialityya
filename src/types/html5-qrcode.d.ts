declare module 'html5-qrcode' {
  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: {
        fps: number;
        qrbox?: number | { width: number; height: number };
        aspectRatio?: number;
        showTorchButtonIfSupported?: boolean;
        showZoomSliderIfSupported?: boolean;
        defaultZoomValueIfSupported?: number;
        formatsToSupport?: string[];
        rememberLastUsedCamera?: boolean;
        supportedScanTypes?: string[];
      }
    );
    render(onScanSuccess: (decodedText: string, decodedResult: any) => void, onScanFailure?: (error: string) => void): void;
    clear(): Promise<void>;
    pause(): void;
    resume(): void;
  }

  export class Html5Qrcode {
    constructor(elementId: string);
    start(
      cameraId: string,
      config: {
        fps: number;
        qrbox?: number | { width: number; height: number };
        aspectRatio?: number;
        disableFlip?: boolean;
      },
      onScanSuccess: (decodedText: string, decodedResult: any) => void,
      onScanFailure?: (error: string) => void
    ): Promise<void>;
    stop(): Promise<void>;
    clear(): Promise<void>;
    getCameras(): Promise<Array<{ id: string; label: string }>>;
  }
} 