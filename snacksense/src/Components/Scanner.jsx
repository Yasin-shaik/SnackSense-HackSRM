import React, { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner = ({ onScan }) => {
  const [videoDevice, setVideoDevice] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get available video devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(device => device.kind === "videoinput");

      console.log("Available Video Devices:", videoDevices);

      if (videoDevices.length > 0) {
        // Find back camera
        let backCamera = videoDevices.find(device =>
          device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("rear")
        );

        // Use back camera if found, otherwise use the last available camera
        let selectedDevice = backCamera ? backCamera.deviceId : videoDevices[videoDevices.length - 1].deviceId;
        console.log("Using Camera:", selectedDevice);
        setVideoDevice(selectedDevice);
      } else {
        setError("No camera found");
        console.log("No camera devices available");
      }
    }).catch((err) => {
      setError("Error accessing camera: " + err.message);
      console.error("Camera access error:", err);
    });

    return () => setVideoDevice(null);
  }, []);

  useEffect(() => {
    if (!videoDevice) return;

    const codeReader = new BrowserMultiFormatReader();
    
    codeReader.decodeFromVideoDevice(videoDevice, "video", (result, err) => {
      if (result) {
        console.log("Scanned Barcode:", result.text); // Print barcode number in console
        onScan(result.text);
        codeReader.reset();
      }
      if (err) {
        console.warn("Scanning error:", err);
      }
    }).catch((err) => {
      setError("Error scanning barcode: " + err.message);
      console.error("Barcode scanning error:", err);
    });

    return () => {
      codeReader.reset();
    };
  }, [videoDevice, onScan]);

  return (
    <div>
      <h2>Scan Barcode</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <video id="video" width="400" height="300" style={{ border: "1px solid black" }}></video>
    </div>
  );
};

export default BarcodeScanner;
