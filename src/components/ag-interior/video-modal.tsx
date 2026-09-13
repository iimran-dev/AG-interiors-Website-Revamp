"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-[#181716] border-[#333] text-white p-2 sm:p-4 overflow-hidden shadow-2xl rounded-2xl">
        <DialogHeader className="p-2">
          <DialogTitle className="font-display text-lg font-medium text-white/90">
            AG Interior — Crafting Timeless Spaces
          </DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/80">
          <iframe
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1&rel=0"
            title="AG Interior Brand Story"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
