"use client";

import { useState, useRef, Fragment, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Dialog, Transition, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { Upload, X, Crop, Check } from "lucide-react";
import toast from "react-hot-toast";

const TO_RADIANS = Math.PI / 180;

async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio || 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  ctx.translate(-cropX, -cropY)
  ctx.translate(centerX, centerY)
  ctx.rotate(rotateRads)
  ctx.scale(scale, scale)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
}

export default function ImageCropperModal({ 
  isOpen, 
  onClose, 
  onCropComplete,
  defaultAspect = undefined,
  circularCrop = false,
  initialImage = null
}) {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(defaultAspect);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAspect(defaultAspect);
      if (initialImage) {
        setImgSrc(initialImage);
        setCrop(undefined);
        setCompletedCrop(null);
      }
    }
  }, [isOpen, initialImage, defaultAspect]);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    const effectiveAspect = circularCrop ? 1 : aspect;
    const { width, height } = e.currentTarget;
    
    if (effectiveAspect) {
      const imageAspect = width / height;
      
      let cropWidth, cropHeight;
      if (imageAspect > effectiveAspect) {
        // Image is wider than the crop aspect (e.g. landscape image, 1:1 crop)
        cropHeight = height * 0.9;
        cropWidth = cropHeight * effectiveAspect;
      } else {
        // Image is taller than the crop aspect (e.g. portrait image, 1:1 crop)
        cropWidth = width * 0.9;
        cropHeight = cropWidth / effectiveAspect;
      }
      
      setCrop(centerCrop({
        unit: 'px',
        width: cropWidth,
        height: cropHeight,
      }, width, height));
    } else {
      // Free aspect: just draw a box covering 90% of the image
      setCrop(centerCrop({
        unit: 'px',
        width: width * 0.9,
        height: height * 0.9,
      }, width, height));
    }
  }

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      await canvasPreview(imgRef.current, canvas, completedCrop);
      
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      if (!blob) throw new Error("Canvas is empty");
      
      await onCropComplete(blob);
      handleClose();
    } catch (e) {
      console.error(e);
      toast.error("Failed to crop image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(null);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[200]" onClose={handleClose}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline/20 text-left align-middle shadow-2xl transition-all">
                <DialogTitle as="h3" className="px-6 py-4 bg-primary text-lg font-display font-black tracking-tight text-on-primary flex items-center justify-between uppercase">
                  <div className="flex items-center gap-2">
                    <Crop className="w-5 h-5 text-on-primary/70" />
                    {imgSrc ? 'Crop Photo' : 'Upload Photo'}
                  </div>
                  <button onClick={handleClose} className="text-on-primary/70 hover:text-on-primary transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </DialogTitle>

                <div>
                  {!imgSrc ? (
                    <div className="p-6">
                      <div className="border-2 border-dashed border-outline/30 rounded-xl p-12 text-center hover:border-primary/50 transition-colors bg-surface-container/30">
                        <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" id="image-upload" />
                        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                          <Upload className="w-10 h-10 text-secondary mb-3" />
                          <span className="font-medium text-on-surface">Click to select an image</span>
                          <span className="text-xs text-secondary mt-1">JPEG, PNG, WebP up to 5MB</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="relative w-full bg-black rounded-xl overflow-hidden mb-6 flex justify-center items-center min-h-[200px] max-h-[400px]">
                        <ReactCrop
                          crop={crop}
                          onChange={(_, percentCrop) => setCrop(percentCrop)}
                          onComplete={(c) => setCompletedCrop(c)}
                          aspect={circularCrop ? 1 : aspect}
                          circularCrop={circularCrop}
                          className="max-h-[400px]"
                        >
                          <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            onLoad={onImageLoad}
                            className="max-h-[400px] w-auto object-contain"
                          />
                        </ReactCrop>
                      </div>
                      
                      {!circularCrop && (
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {[ 
                          { label: 'Free', val: undefined }, 
                          { label: '1:1', val: 1 }, 
                          { label: '16:9', val: 16/9 }, 
                          { label: '21:9', val: 21/9 }, 
                          { label: '4:3', val: 4/3 }, 
                          { label: '3:4', val: 3/4 }, 
                          { label: '5:4', val: 5/4 }, 
                          { label: '2:3', val: 2/3 } 
                        ].map(ratio => (
                          <button 
                            key={ratio.label} 
                            type="button" 
                            onClick={() => {
                               setAspect(ratio.val);
                               if (imgRef.current && ratio.val) {
                                 const { width, height } = imgRef.current;
                                 setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 90 }, ratio.val, width, height), width, height));
                               }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-widest font-bold border transition-all ${ 
                              aspect === ratio.val 
                                ? 'bg-primary text-on-primary border-primary shadow-md' 
                                : 'bg-surface-container text-on-surface-variant hover:text-primary border-outline/10' 
                            }`}
                          >
                            {ratio.label}
                          </button>
                        ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button type="button" onClick={handleClose} className="flex-1 py-3 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high rounded-xl transition-colors">
                          Cancel
                        </button>
                        <button type="button" onClick={handleSave} disabled={!completedCrop || isProcessing} className="flex-1 py-3 text-[11px] font-bold uppercase tracking-widest text-on-primary bg-primary hover:bg-primary/90 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50">
                          {isProcessing ? <span className="animate-pulse">Processing...</span> : <><Check className="w-4 h-4 mr-2" /> Apply Crop</>}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
