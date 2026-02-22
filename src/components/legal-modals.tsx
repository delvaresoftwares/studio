'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export type PolicyType = 'privacy' | 'terms' | 'security';

interface PolicyData {
    title: string;
    content: React.ReactNode;
}

const policies: Record<PolicyType, PolicyData> = {
    privacy: {
        title: 'Privacy Policy',
        content: (
            <div className="space-y-4 text-sm leading-relaxed">
                <section>
                    <h4 className="font-bold text-lg mb-2">1. Data Collection</h4>
                    <p>We collect information that you provide directly to us through forms, inquiries, and when you use our services. This may include your name, email address, phone number, and project details.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">2. How We Use Your Information</h4>
                    <p>Your information is used to provide, maintain, and improve our services, communicate with you about projects, and ensure the security of our platforms.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">3. Data Protection</h4>
                    <p>We implement balanced security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is 100% secure.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">4. Third-Party Sharing</h4>
                    <p>We do not sell your personal data. We may share information with trusted partners who assist us in operating our website or conducting our business, provided they agree to keep this information confidential.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">5. Updates</h4>
                    <p>We may update this policy from time to time. We encourage you to review this page periodically for any changes.</p>
                </section>
            </div>
        )
    },
    terms: {
        title: 'Terms and Conditions',
        content: (
            <div className="space-y-4 text-sm leading-relaxed">
                <section>
                    <h4 className="font-bold text-lg mb-2">1. Acceptance of Terms</h4>
                    <p>By accessing and using Delvare's services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">2. Service Provision</h4>
                    <p>Delvare (XAAS by Delvare MNC) provides software development, IT consultation, and digital solutions. We reserve the right to modify or discontinue any service with or without notice.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">3. Intellectual Property</h4>
                    <p>All content, branding, and proprietary code provided by Delvare remains the intellectual property of Delvare MNC unless otherwise specified in written contracts.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">4. User Obligations</h4>
                    <p>Users must not use our services for any illegal or unauthorized purpose. You agree to comply with all local laws regarding online conduct and acceptable content.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">5. Limitation of Liability</h4>
                    <p>Delvare shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
                </section>
            </div>
        )
    },
    security: {
        title: 'Security Policy',
        content: (
            <div className="space-y-4 text-sm leading-relaxed">
                <section>
                    <h4 className="font-bold text-lg mb-2">1. Security at Core</h4>
                    <p>Security is integrated into every stage of our development lifecycle. We utilize industry-standard encryption and security protocols to safeguard digital assets.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">2. Vulnerability Management</h4>
                    <p>We regularly perform security audits and vulnerability scans on our systems to identify and mitigate potential risks proactively.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">3. Access Controls</h4>
                    <p>Strict access controls and authentication mechanisms are in place to ensure that only authorized personnel can access sensitive internal systems.</p>
                </section>
                <section>
                    <h4 className="font-bold text-lg mb-2">4. Incident Response</h4>
                    <p>In the event of a security breach, we have a dedicated incident response plan to contain the situation, assess the damage, and notify affected parties promptly.</p>
                </section>
            </div>
        )
    }
};

export function LegalModals({
    isOpen,
    onOpenChange,
    type
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    type: PolicyType | null
}) {
    if (!type) return null;
    const policy = policies[type];

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] flex flex-col p-0 overflow-hidden bg-background border-[#FBFF00]/20">
                <DialogHeader className="p-6 border-b border-[#FBFF00]/10 shrink-0">
                    <DialogTitle className="text-2xl font-headline font-bold text-foreground">
                        {policy.title}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Last updated: February 2026
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 p-6">
                    <div className="pb-8">
                        {policy.content}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
