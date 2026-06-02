'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

export function BookingModal({
    isOpen,
    onOpenChange,
    serviceTitle
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    serviceTitle: string
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl w-[95vw] max-h-[90vh] flex flex-col p-0 overflow-hidden bg-background border-[#FBFF00]/20">
                <DialogHeader className="p-6 border-b border-border shrink-0">
                    <DialogTitle className="text-2xl font-black text-foreground">
                        Priority Contact
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Direct access to our technical leads for your software and security requirements.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        <p className="text-sm text-muted-foreground">
                            Please provide the following details to ensure a prompt response from our technical team.
                        </p>
                        <div className="space-y-4">
                            <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-border" />
                            <input type="email" placeholder="work@domain.com" className="w-full p-3 rounded-lg border border-border" />
                            <textarea placeholder="Outline your project scope and requirements..." className="w-full p-3 rounded-lg border border-border h-32" />
                            <Button className="w-full bg-primary text-white font-black uppercase tracking-widest">
                                Transmit Inquiry
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
